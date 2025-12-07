import React, { useState } from "react";
import { Eye, EyeOff, GalleryVerticalEnd, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ className, onSubmit, loading = false, ...props }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, username, password });
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-sm sm:max-w-md px-4 sm:px-0 mx-auto", className)} {...props}>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-2">
            <GalleryVerticalEnd className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold">
              Code<span className="text-blue-600">Crackr</span>
            </h1>
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-muted-foreground">
            Create your account
          </h2>
        </div>

        {/* Email Field */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="h-10 md:h-11"
          />
        </div>

        {/* Username Field */}
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="your_username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="h-10 md:h-11"
          />
        </div>

        {/* Password Field */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="pr-10 h-10 md:h-11"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Eye className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full gap-2 h-10 md:h-11 text-sm md:text-base cursor-pointer" 
          disabled={loading}
        >
          <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
          {loading ? "Registering..." : "Register"}
        </Button>

        {/* Footer Link */}
        <p className="text-sm text-center text-muted-foreground mt-4">
          Already have an account?{" "}
          <span
            className="text-primary font-medium underline underline-offset-4 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
