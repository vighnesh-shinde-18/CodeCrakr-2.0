import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Problem from "../models/Problem.Model.js";
import mongoose from "mongoose";

const uploadProblem = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { title, description, topics, testCases } = req.body;

    if (!title || !description || !Array.isArray(topics) || !Array.isArray(testCases)) {
        throw new ApiError(400, "All Fields Are Required");
    }

    const existingProblem = await Problem.findOne({ title });
    if (existingProblem) {
        throw new ApiError(409, "Problem Title Already Exist")
    }

    const newProblem = new Problem({
        title,
        description,
        topics,
        testCases,
        uploader: userId,
reports:[]
    });

    await newProblem.save();

    res.status(201).json({ success: true, message: "Problem uploaded successfully", data: newProblem._id });
});

const fetchUserProblem = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;  
        const { topic } = req.body;
 
        const matchStage = {
            uploader: new mongoose.Types.ObjectId(userId), // Ensure userId is an ObjectId
        };
        
      
        if (topic) {
            // Using $in for array matching is safer if 'topics' is an array
            matchStage.topics = { $in: [topic] }; 
        }

        const enrichedProblems = await Problem.aggregate([
            // Stage 1: Filter problems by uploader and topic (if provided)
            { $match: matchStage },

            // Stage 2: Join with the Solution collection
            {
                $lookup: {
                    from: "solutions", // The target collection name (must be the plural collection name)
                    localField: "_id", // Field from the Problem collection
                    foreignField: "problem", // Field from the Solution collection
                    as: "solutionsList" // The resulting array field in the output documents
                }
            },

            // Stage 3: Calculate the solution count using $size on the new array
            {
                $addFields: {
                    solutionCount: { $size: "$solutionsList" }
                }
            },

            // Stage 4: Project and shape the final output
            {
                $project: {
                    _id: 0, // Exclude original _id
                    id: "$_id", // Rename _id to id for frontend
                    title: 1,
                    topics: 1,
                    description: 1,
                    createdAt: 1,
                    solutionCount: 1,
                    // Exclude the bulky solutionsList array
                }
            }
        ]);

        return res.status(200).json({success:true,data: enrichedProblems, message:"successfully fecth required problems"});
    } catch (error) {
        console.error("Error fetching uploaded problems:", error);
        return res.status(500).json({ error: "Server Error" });
    }
});


export {fetchUserProblem, uploadProblem}