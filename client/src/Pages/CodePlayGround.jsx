import { LANGUAGES } from "../config/config.js";
import { useState } from "react";
function CodePlayGround() {
    const [language, setLanguage] = useState(LANGUAGES[0].value);
    const [sourceCode, setSourceCode] = useState("// Write your code here...");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex flex-1 flex-col px-4 py-6 md:px-6 space-y-6">
            <h1 className="text-2xl font-bold">Code Playground</h1>

            {/* Language Selector */}
            <div>
                <label className="block font-medium mb-1">Language:</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border bg-white dark:bg-black p-2 rounded"
                >
                    {LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Monaco Code Editor */}
            <div className="border rounded overflow-hidden" style={{ height: "400px" }}>
                {/* <Editor
                    height="100%"
                    language={currentMonacoLang}
                    value={sourceCode}
                    onChange={(value) => setSourceCode(value || "")}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        wordWrap: "on",
                    }}
                /> */}
            </div>

            {/* Input Box */}
            <div>
                <label className="block font-medium mb-1">Custom Input (optional):</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border p-2 rounded w-full h-20 font-mono"
                    placeholder="Enter input if required..."
                    a
                />
            </div>

            {/* Run Button */}
            <div>
                <button
                    // onClick={runCode}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Running..." : "Run Code"}
                </button>
            </div>

            {output && <div>
                <label className="block font-medium mt-4">Output:</label>
                <pre className="border p-2 rounded bg-white dark:bg-black whitespace-pre-wrap">
                    {output}
                </pre>
            </div>}
        </div>
    )
}

export default CodePlayGround