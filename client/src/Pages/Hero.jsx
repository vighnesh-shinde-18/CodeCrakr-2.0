import {
  RocketIcon,
  Sparkles,
  Github,
  PencilLine,
  MessageSquare,
  CheckCircle2,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function Hero() {
  const gitHubUrl = "https://github.com/vighnesh-shinde-18/CodeCrackr";
  const navigate = useNavigate();

  function handleStart() {
    navigate("/login");
  }

  return (
    // CHANGED: Removed fixed mx-40. Used px-4 for mobile spacing and flex-center for alignment.
    <section className="min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300">
      
      {/* CHANGED: Ensure card takes full width available but stops at max-w-6xl */}
      <Card className="w-full max-w-6xl border rounded-3xl shadow-2xl bg-white dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-300">
        
        {/* CHANGED: Adjusted padding to be smaller on mobile (p-6) and larger on desktop (md:p-14) */}
        <CardContent className="p-6 sm:p-10 md:p-14 space-y-10">
          
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-white flex flex-col md:flex-row justify-center items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-700 animate-bounce" />
              <span>CodeCrackr — DSA Q&A Platform with AI</span>
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              A Stack Overflow-inspired platform for DSA questions. Ask, answer,
              and get AI help to debug, explain, or improve your solutions.
            </p>
            
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={handleStart}
                className="gap-2 cursor-pointer w-full sm:w-auto text-lg py-6"
              >
                <RocketIcon className="w-5 h-5" />
                Get Started
              </Button>
            </div>
          </div>

          {/* Features Flow Section */}
          {/* CHANGED: Uses flex-col for mobile (stack vertical) and md:flex-row for desktop (horizontal) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium">
            
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 px-4 py-2 rounded-full border dark:border-zinc-700">
              <PencilLine className="w-5 h-5 text-purple-700" />
              Post Questions
            </div>

            {/* CHANGED: Arrow rotates 90deg on mobile to point down, 0deg on desktop to point right */}
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />

            <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 px-4 py-2 rounded-full border dark:border-zinc-700">
              <MessageSquare className="w-5 h-5 text-green-600" />
              Submit Solutions
            </div>

            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />

            <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 px-4 py-2 rounded-full border dark:border-zinc-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Accept Answers
            </div>

            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />

            <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 px-4 py-2 rounded-full border dark:border-zinc-700">
              <Brain className="w-5 h-5 text-blue-600" />
              AI Debug & Optimize
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center text-xs sm:text-sm text-gray-400 dark:text-gray-500 pt-6 border-t dark:border-zinc-800">
            <a
              href={gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary dark:hover:text-white transition-colors flex justify-center items-center gap-2 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              View Full Source Code on GitHub
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default Hero;
