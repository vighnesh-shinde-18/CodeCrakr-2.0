
import {config} from '../config/config.js';
import axios from 'axios';
import { toast } from 'sonner';
export class AuthService {

    baseUrl = config.backendUrl + '/api/v1/auth';

    constructor() {
        // You might set up an axios instance with headers here if needed
        this.api = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true, // Important for sending cookies/session tokens
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


    async createAccount({ email, password, username }) {
        try {
            const response = await this.api.post('/register', {
                email,
                password,
                username
            });

            console.log("Success Response:", response.data);
            return response.data;

        } catch (error) {
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
   
    async login({ email, password }) {
        try {
            const response = await this.api.post('/login', {
                email,
                password
            });
            
            console.log("Success Response:", response);
            return response.data.data.user;

        } catch (error) {
            if (error.response && error.response.data) {
                console.error("API Error Response Data:", error.response.data);

                const serverMessage = error.response.data.message || "Login failed due to server issue.";
                throw new Error(serverMessage);

            } else if (error.message) {
                console.error("Network or Unknown Error:", error.message);
                throw new Error(error.message);
            } else {
                throw new Error("An unexpected error occurred during registration.");
            }
        }
    }

    async sendOtp({ email }) {
        try {
            const response = await this.api.post('/send-otp', {
                email
            });

            console.log("Success Response:", response.message);
            return response.message;

        } catch (error) {
            if (error.response && error.response.data) {
                console.error("API Error Response Data:", error.response.data);

                const serverMessage = error.response.data.message || "OTP send failed due to server issue.";
                throw new Error(serverMessage);

            } else if (error.message) {
                console.error("Network or Unknown Error:", error.message);
                throw new Error(error.message);
            } else {
                throw new Error("An unexpected error occurred during registration.");
            }
        }
    }

    async resetPassword({ email, newPassword, otp }) {
        try {

            const response = await this.api.post("/reset-password",
                { email, otp, newPassword }
            );

            console.log("Success Response:", response.message);
            return response.message;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("API Error Response Data:", error.response.data);

                const serverMessage = error.response.data.message || "Paaword reset failed due to server issue.";
                throw new Error(serverMessage);

            } else if (error.message) {
                console.error("Network or Unknown Error:", error.message);
                throw new Error(error.message);
            } else {
                throw new Error("An unexpected error occurred during registration.");
            }
        }
    }


    /**
     * Invalidates the user's session via POST request to the logout endpoint.
     */
    async logout() {
        try { 
            await this.api.post('/logout');
        
           
            return true;  
        } catch (error) {
            console.log("Custom backend service :: logout :: error", error);
            toast.warning("Logged out problem");
        }
    }
 
}

const authService = new AuthService();
export default authService;