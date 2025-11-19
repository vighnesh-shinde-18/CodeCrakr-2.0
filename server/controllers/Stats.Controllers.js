import User from '../models/User.Model.js';
import Problem from '../models/Problem.Model.js';
import Solution from '../models/Solution.Model.js';
import mongoose from 'mongoose';

const getDashboardStats = async (req, res) => {
    // Ensure the ID is wrapped as an ObjectId for safe comparison against aggregated results
    const currentUserId = req.user._id; 
    

    try {
        // --- Stage 1: Fetch Simple Global Counts ---
        const [userCount, problemCount, solutionCount] = await Promise.all([
            User.countDocuments(),
            Problem.countDocuments(),
            Solution.countDocuments()
        ]);

        // --- Stage 2: Aggregate All User Metrics for Ranking ---
        const allUserStats = await User.aggregate([
            // 1. Lookup Problems (count questions uploaded)
            {
                $lookup: {
                    from: "problems",
                    localField: "_id",
                    foreignField: "uploader",
                    as:"problemsPosted"
                }
            },
            // 2. Lookup Solutions (count answers given and accepted)
            {
                $lookup: {
                    from: "solutions",
                    localField: "_id",
                    foreignField: "uploader",
                    as: "solutionsGiven"
                }
            },
            // 3. Project and Calculate Metrics
            {
                $project: {
                    _id: 1, // Keep _id for comparison
                    username: 1,
                    // Metric 1: Questions Uploaded
                    totalQuestionsPosted: { $size: "$problemsPosted" },
                    // Metric 2: Total Answers Given
                    totalAnswersGiven: { $size: "$solutionsGiven" },
                    // Metric 3: Total Accepted Answers (Score)
                    totalAcceptedAnswers: {
                        $size: {
                            $filter: {
                                input: "$solutionsGiven",
                                as: "solution",
                                cond: { $eq: ["$$solution.accepted", true] }
                            }
                        }
                    }
                }
            }
        ]);

        
        // --- Stage 3: Process Leaderboard Data in JavaScript ---

        // Helper function to extract Top 3 and format
        const formatTop3 = (statsArray, metricKey) => {
            const sorted = [...statsArray].sort((a, b) => b[metricKey] - a[metricKey]);
            const top3 = sorted.slice(0, 3).map(user => ({
                id: user._id,
                username: user.username,
                score: user[metricKey],
            }));

            // Structure the output as requested (first, second, third)
            return {
                first: top3[0] || null,
                second: top3[1] || null,
                third: top3[2] || null
            };
        };

        // Get Top 3 for each metric
        const topQuestions = formatTop3(allUserStats, 'totalQuestionsPosted');
        const topAnswers = formatTop3(allUserStats, 'totalAnswersGiven');
        const topAccepted = formatTop3(allUserStats, 'totalAcceptedAnswers');
        
        // --- FIX: Find the current user's data using comparison methods ---
        // Convert the currentUserIdObject back to a string representation (or use .equals() if supported by the array element)
        const currentUserData = allUserStats.find(
            // Use .toString() comparison for reliability after aggregation
            user => user._id.toString() === currentUserId.toString()
        );

        // Prepare the current user's detailed stats
        const currentUserStats = currentUserData ? {
            id: currentUserData._id,
            username: currentUserData.username,
            totalProblemsPosted: currentUserData.totalQuestionsPosted,
            totalSolutionsGiven: currentUserData.totalAnswersGiven,
            totalAcceptedSolutions: currentUserData.totalAcceptedAnswers
        } : null;

        // --- Stage 4: Send the Combined Response ---
        res.status(200).json({
            totalStats: {
                userCount,
                problemCount,
                solutionCount,
            },
            leaderboards: {
                leaderboardMetrics: [
                    { metric: "Questions Uploaded", data: topQuestions },
                    { metric: "Answers Given", data: topAnswers },
                    { metric: "Accepted Answers", data: topAccepted }
                ],
                currentUserStats: currentUserStats
            }
        });

    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
};

export default getDashboardStats;