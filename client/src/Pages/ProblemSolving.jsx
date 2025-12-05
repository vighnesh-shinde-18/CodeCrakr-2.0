import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// Services
import problemService from "../api/ProblemServices.jsx";
import solutionService from "../api/SolutionServices.jsx";

// Components
import ProblemDetails from "../components/Problem/ProblemDetails.jsx";
import SolutionReplies from "../components/Solution/SolutionReplies.jsx";
import SolutionInput from "../components/Solution/SolutionInput.jsx";

export default function ProblemSolving() {
  const { id } = useParams();
 
  const [problem, setProblem] = useState();
  const [allSolutions, setAllSolutions] = useState([]);

  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const [reported, setReported] = useState(false)


  const [selectedSolution, setSelectedSolution] = useState(null);
  const [showEditor, setShowEditor] = useState(true);

  const [filterStatus, setFilterStatus] = useState("all");


  async function loadProblem () {
    if (!id) return; 

    try {
      const problemData = await problemService.fecthProblemDetails(id);
      
      setProblem(problemData); 
      setReported(problemData.isReported)
    } catch (err) {
      console.error("Error loading problem:", err);
      setError(err.message || "Failed to load problem.");
    }  
  };

  useEffect(() => {
    loadProblem();
    setCurrentUserEmail(localStorage.getItem("email"))
  }, []);

  // 🔹 2. FETCH SOLUTIONS
  const fetchSolutions = useCallback(async () => {
    if (!id) return; 
    try {
      let params = {};
      if (filterStatus === "accepted") params.accepted = "true";
      else if (filterStatus === "not_accepted") params.accepted = "false";
      else if (filterStatus === "mine") params.submittedByMe = "true";

      const solutionsData = await solutionService.fetchAllSolutions(id, params);
      setAllSolutions(solutionsData);

    } catch (err) {
      console.error("Error fetching solutions:", err);
      toast.error("Failed to load solutions");
    }  
  }, [id, filterStatus]);

  useEffect(() => { 
    fetchSolutions();
  }, [fetchSolutions]);


  const handleViewSolution = (solution) => {
    setSelectedSolution(solution);
    console.log(solution)
    setShowEditor(false);
  };

  const handleResetEditor = () => {
    setSelectedSolution(null);
    setShowEditor(true);
  };


  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ProblemDetails loadProblem={loadProblem} problem={problem} />
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Other User Replies</h3>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border px-2 py-1 rounded text-sm dark:bg-zinc-800 dark:text-white"
            
              >
                <option value="all">All Solutions</option>
                <option value="accepted">Accepted Only</option>
                <option value="not_accepted">Not Accepted</option>
                <option value="mine">Submitted by Me</option>
              </select>
            </div>
            <SolutionReplies
              allSolutions={allSolutions}
              onViewSolution={handleViewSolution}
              selectedSolution={selectedSolution}
              setSelectedSolution={setSelectedSolution}
              fetchSolutions={fetchSolutions}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {showEditor
                ? "Submit Your Solution"
                : `${selectedSolution?.username || selectedSolution?.uploaderName || "User"}'s Solution`}
            </h2>
            {!showEditor && (
              <button
                onClick={handleResetEditor}
                className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                + Submit Your Own Solution
              </button>
            )}
          </div>

          <SolutionInput
            showEditor={showEditor}
            selectedSolution={selectedSolution}
            isUploader={
              problem?.email === currentUserEmail}
            fetchSolutions={fetchSolutions}
            problemId={id}
          />
        </div>
      </div>
    </div>
  );
}