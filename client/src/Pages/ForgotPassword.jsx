import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import authService from "../api/AuthServices.jsx";
import asyncHandler from "../../../server/utils/asyncHandler.js";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = asyncHandler(async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      authService.sendOtp({ email })

      toast.success("Password reset link sent to your email!");
      setEmail("");
      navigate("/reset-password");
    } catch (err) {

      console.error("Forgot password error:", err);
      toast.error(
        err?.response?.data?.error || "Email not registered or failed to send."
      );
    } finally {
      setLoading(false);
    }
  }
  )

  return (
    <section className="w-full h-2/4 flex flex-row justify-center pt-44">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-md space-y-6 border p-6 rounded-md shadow-md bg-white dark:bg-zinc-900 dark:border-zinc-800 transition"
      >
        <div className="text-center">
          <h2 className="text-xl font-bold">Reset your password</h2>
          <p className="text-sm text-muted-foreground">
            Enter your registered email. We’ll send a reset link.
          </p>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <Button type="submit" className="cursor-pointer w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        <p
          className="text-sm text-blue-600 underline cursor-pointer text-center"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </form>
    </section>
  );
}