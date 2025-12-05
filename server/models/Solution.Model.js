import mongoose from "mongoose";



const solutionSchema = new mongoose.Schema({
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true, index: true },
    code: { type: String, required: true },
    language: { type: String, required: true, default: "javascript" },
    accepted: { type: Boolean, default: false },
    explanation: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })

const Solution = mongoose.model("Solution", solutionSchema)

export default Solution