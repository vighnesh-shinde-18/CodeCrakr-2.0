import {config} from "../config/config.js";
import axios from 'axios'
import { toast } from "sonner";

export class ProblemService {

    baseUrl = config.backendUrl + '/api/v1/problem';

    constructor() {

        this.api = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async uploadProblem({ title, description, topics, testCases }) {
        try {
            const payload = {
                title: title.trim(),
                description: description.trim(),
                topics: topics
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                testCases: testCases,
            };
            const response = await this.api.post("/upload",
                payload
            )

            console.log("Success Response: ", response.data)
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("API Error Response Data:", error.response.data);

                const serverMessage = error.response.data.message || "Upload failed due to server issue.";
                throw new Error(serverMessage);

            } else if (error.message) {
                console.error("Network or Unknown Error:", error.message);
                throw new Error(error.message);
            } else {
                throw new Error("An unexpected error occurred during Upload.");
            }
        }
    }

    async fetchUserUploadProblem({ topic }) {
        topic = (topic === "all" ? null : topic)

        try {
            const response = await this.api.post("/user-uploads",
                {  topic}
            )

            console.log("Success Response: ", response.data)
            return response.data.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("API Error Response Data:", error.response.data);

                const serverMessage = error.response.data.message || "Upload failed due to server issue.";
                throw new Error(serverMessage);

            } else if (error.message) {
                console.error("Network or Unknown Error:", error.message);
                throw new Error(error.message);
            } else {
                throw new Error("An unexpected error occurred during Upload.");
            }
        }

    }
}

const problemService = new ProblemService()
export default problemService;