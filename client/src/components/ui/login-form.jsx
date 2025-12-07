import React, { useState } from "react";
import { Eye, EyeOff, GalleryVerticalEnd, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onSubmit, loading = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    // Responsive Container: px-4 ensures it doesn't touch edges on mobile
    <div className="flex flex-col gap-6 w-full max-w-sm sm:max-w-md px-4 sm:px-0 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-6">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <GalleryVerticalEnd className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h1 className="text-xl md:text-3xl font-bold">
                Code<span className="text-blue-600">Crackr</span>
              </h1>
            </div>
            <h2 className="text-lg md:text-xl text-center font-semibold text-muted-foreground">
              Welcome Back, Login Please
            </h2>
          </div>

          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Taller inputs on desktop (h-11) for better UX
              className="h-10 md:h-11" 
            />
          </div>
          
          {/* Password Input */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
              <span
                className="text-xs md:text-sm text-blue-600 underline cursor-pointer hover:text-blue-800"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>

            {/* Relative wrapper for perfect icon centering */}
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 h-10 md:h-11"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Eye className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full gap-2 cursor-pointer h-10 md:h-11 text-sm md:text-base" 
            disabled={loading}
          >
            <LogIn className="w-4 h-4 md:w-5 md:h-5" />
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="text-muted-foreground text-center text-xs md:text-sm mt-2">
        <p>
          Don&apos;t have an account?{" "}
          <span
            className="text-primary font-medium underline underline-offset-4 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => navigate("/register")}
          >
            Register Now
          </span>
        </p>
      </div>
    </div>
  );
}
