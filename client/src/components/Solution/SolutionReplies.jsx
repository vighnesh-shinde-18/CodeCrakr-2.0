import { CheckCircle2, ThumbsUp, Flag, MessageSquare } from "lucide-react";
import { useState, useCallback, memo, useEffect } from "react";
import { toast } from "sonner";
import solutionService from "../../api/SolutionServices.jsx";

export default function SolutionReplies({
  allSolutions,
  onViewSolution,
  selectedSolution,
  setSelectedSolution,
  fetchSolutions
}) {
  if (!allSolutions.length)
    return <p className="text-muted-foreground">No solutions yet.</p>;
 
  return (
    <div className="space-y-4">
      {allSolutions.map((solution) => (
        <MemoizedSolutionCard
          key={solution.id}
          solution={solution}
          isSelected={selectedSolution?.id === solution?.id}
          onSelect={() => {
            setSelectedSolution(solution);
            onViewSolution(solution);
          }}
          fetchSolutions={fetchSolutions}
        />
      ))}
    </div>
  );
}

const SolutionCard = ({ solution, isSelected, onSelect, fetchSolutions }) => {
  // Initialize state directly from props to prevent hydration mismatch
  const [interactionData, setInteractionData] = useState({
    likesCount: solution.likesCount || 0,
    liked: solution.liked || false,
    reportCount: solution.reportCount || 0,
    reported: solution.reported || false,
  });
  
  const replyCount = solution.replyCount || 0;

  // 1. SYNC: Update local state whenever the parent passes a new 'solution' prop
  // This runs automatically after fetchSolutions() completes in the parent
  useEffect(() => {
    setInteractionData({
      likesCount: solution.likesCount || 0,
      liked: solution.liked || false,
      reportCount: solution.reportCount || 0,
      reported: solution.reported || false,
    });
  }, [solution]);

  // LIKE handler
  const handleToggleLike = useCallback(
    async (e) => {
      e.stopPropagation();

      // Optimistic UI: Calculate what the new state SHOULD be for the Toast
      const willBeLiked = !interactionData.liked;

      try {
        // 1. Call API
        await solutionService.toggleLike(solution.id);
        // 2. Show Toast immediately (better UX)
        if (willBeLiked) {
          toast.success("Solution Liked");
        } else {
          toast.info("Like removed");
        }
        
        // 3. Refresh Data
        // This triggers the parent to re-render, sending new props, 
        // which triggers the useEffect above.
        await fetchSolutions(); 
        
        console.log("info ",interactionData)
      } catch (error) {
        console.error("Like failed:", error);
        toast.error("Failed to like solution");
      }
    },
    [solution.id, interactionData.liked, fetchSolutions] // Added dependencies
  );

  // REPORT handler
  const handleToggleReport = useCallback(
    async (e) => {
      e.stopPropagation();

      try {
        const data = await solutionService.toggleReport(solution.id);
        
        // Use the response from backend for the toast if possible, 
        // or check the boolean returned by your API
        if (data.reported) { // Assuming your API returns { reported: true/false }
          toast.success("Solution reported.");
        } else {
          toast.info("Report removed.");
        }
 
        await fetchSolutions();

      } catch (error) {
        console.error("Report failed:", error);
        toast.error("Failed to report solution");
      }
    },
    [solution.id, fetchSolutions]
  );

  return (
    <div
      onClick={onSelect}
      className={`p-4 border rounded-md cursor-pointer transition ${
        isSelected
          ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
          : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <div className="flex justify-between items-start">
        <p className="font-semibold">
          {solution.username || solution.uploader || "Unknown User"}
        </p>

        {solution.accepted && (
          <div className="flex items-center text-green-600 text-sm gap-1">
            <CheckCircle2 className="size-4" />
            Accepted
          </div>
        )}
      </div>

      <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">
        {solution.explanation}
      </p>

      <div className="flex items-center mt-3 gap-4 text-sm text-gray-500 dark:text-gray-300">
        <button
          onClick={handleToggleLike}
          className={`flex items-center gap-1 transition-colors ${
            interactionData.liked ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }`}
          title="Like this solution"
        >
          <ThumbsUp className={`w-4 h-4 ${interactionData.liked ? "fill-blue-600" : ""}`} />
          <span>{interactionData.likesCount}</span>
        </button>

        {/* REPORT BUTTON */}
        <button
          onClick={handleToggleReport}
          className={`flex items-center gap-1 transition-colors ${
            interactionData.reported? "text-red-600 font-semibold" : "hover:text-red-500"
          }`}
          title="Report this solution"
        >
          <Flag className={`w-4 h-4 ${interactionData.reported ? "fill-red-600" : ""}`} />
          <span>{interactionData.reportCount}</span>
        </button>

        {/* REPLY COUNT (read-only) */}
        <div className="flex items-center gap-1 cursor-default">
          <MessageSquare className="w-4 h-4" />
          <span>{replyCount}</span>
        </div>
      </div>
    </div>
  );
};

export const MemoizedSolutionCard = memo(SolutionCard);
