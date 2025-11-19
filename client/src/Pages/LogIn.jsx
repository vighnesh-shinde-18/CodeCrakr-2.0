import LoginForm from "../components/ui/login-form.jsx" 
import authService from "../api/AuthServices.jsx";
import { toast } from 'sonner'
import { useState } from 'react'
import { useNavigate } from "react-router";

function LogIn() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const loginUser = async function ({ email, password, username }) {

        const toastId = toast.loading("Logining  User...");
        setIsLoading(true);

        try {

            const infoObj = { email, password }
            const user =  await authService.login(infoObj)
         
            localStorage.setItem("email",user.email)
            localStorage.setItem("username",user.username)

            console.log(user.email," ",user.username)
            
            toast.success("Login Successful! Redirect To Dashboard...", { id: toastId });
            navigate("/dashboard")
        } catch (error) {

            const userErrorMessage = error.message || "An unknown error occurred.";

            console.error("Frontend Error:", error);

            toast.error(userErrorMessage, { id: toastId });

        } finally {
           setIsLoading(false);

        }
    }
    return (
        <section className="w-full flex flex-row justify-center pt-32">
            <LoginForm onSubmit={loginUser} loading={isLoading} />
        </section>
    )
}

export default LogIn;