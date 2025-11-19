import {config} from "../config/config.js";
import axios from 'axios'
export class StatsService{
    baseUrl = config.backendUrl + '/api/v1/stats';

    constructor(){
        this.api = axios.create({
            baseURL:this.baseUrl,
            withCredentials:true,
            headers:{
                'Content-Type':"application/json"
            }
        });
    }

    async getStats(){
        try{
            const response = await this.api.get('/')
            
            return response.data;
        }catch(error){
           if (error.response && error.response.data) {
                console.error("API Error Response Data:", error.response.data);

                const serverMessage = error.response.data.message || "Registration failed due to server issue.";
                throw new Error(serverMessage);

            } else if (error.message) {
                console.error("Network or Unknown Error:", error.message);
                throw new Error(error.message);
            } else {
                throw new Error("An unexpected error occurred during registration.");
            }  
        }
    }
}

const statsService = new StatsService()

export default statsService;