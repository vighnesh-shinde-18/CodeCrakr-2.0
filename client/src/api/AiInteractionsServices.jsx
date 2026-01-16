import { config } from "../config/config.js";
import axios from "axios";

export class AiInteractionService {

    baseUrl = config.backendUrl + '/api/v1/ai-interactions';

    constructor() {
        this.api = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true,
            headers: {
                'Content-Type': "application/json"
            },
        });
    }

    async getInteractionById(id) {
        try {
            const response = await this.api.get(`/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteInteractionById(id) {
        try {
            const response = await this.api.delete(`/${id}`);
            console.log("Interaction deleted:", response);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteAllInteractions() {
        try {
            const response = await this.api.delete('/all');
            console.log("All interactions deleted:", response);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (axios.isCancel(error)) {
            throw error;
        }
        if (error.response && error.response.data) {
            console.error("API Error:", error.response.data);
            const serverMessage = error.response.data.message || "Request failed.";
            throw new Error(serverMessage);
        } else if (error.message) {
            console.error("Network Error:", error.message);
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}

const aiInteractionService = new AiInteractionService();
export default aiInteractionService;
