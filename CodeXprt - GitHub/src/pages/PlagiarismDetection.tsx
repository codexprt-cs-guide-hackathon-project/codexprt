import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { AlertCircle, Code2, FileSearch, Loader2, FileText } from 'lucide-react';

const formatText = (text: string) => {
  return text
    .split('\n')
    .map(line => {
      return line.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-blue-600 dark:text-blue-400">$1</span>');
    })
    .join('\n');
};

const analyzePlagiarism = async (code: string) => {
  const API_KEY = "PLACE_YOUR_API";
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this code for potential plagiarism and AI generation. Format your response using markdown with ** for emphasis. Include:

            1. Plagiarism Score: Provide a clear number between 0-100
            2. AI Generation Probability: Provide a clear number between 0-100
            3. Detailed Analysis: Use ** to highlight important findings
            4. Sources: List any potential sources or matches

            Format scores as: "Plagiarism Score: 75" and "AI Generation Probability: 80"
            
            CODE TO ANALYZE:
            ${code}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Enhanced score extraction
    const plagiarismMatch = text.match(/plagiarism score:?\s*(\d+)/i);
    const aiMatch = text.match(/ai.*?probability:?\s*(\d+)/i);
    
    const plagiarismScore = plagiarismMatch ? parseInt(plagiarismMatch[1]) : 0;
    const aiProbability = aiMatch ? parseInt(aiMatch[1]) : 0;

    return {
      plagiarismScore,
      aiGeneratedProbability: aiProbability,
      analysisText: text
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

function PlagiarismDetection() {
  const [code, setCode] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please provide code to analyze");
      return;
    }
    
    setError(null);
    setIsAnalyzing(true);
    try {
      const analysis = await analyzePlagiarism(code);
      setResult(analysis);
    } catch (error) {
      setError("Analysis failed. Please try again.");
      console.error("Analysis failed:", error);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            <span style={{ color: '#3A83F6' }}>Code</span>
            <span style={{ color: '#A855F8' }}>Xprt</span>
            <span style={{ marginLeft: '10px' }}>Plagiarism Detection</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Code Input</h2>
              <div className="rounded-md overflow-hidden"> {/* Container for Monaco Editor */}
                <Editor
                  height="400px"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 16 },
                  }}
                />
              </div>
              {error && (
                <div className="mt-4 text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-700/20 border border-red-500/30 rounded-md p-3">
                  {error}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={isAnalyzing || !code.trim()}
                className={`mt-4 w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-white
                  ${isAnalyzing || !code.trim()
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'}`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileSearch className="w-5 h-5 text-white" />
                    Analyze Code
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {result ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Analysis Report</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4">
                      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Plagiarism Score</h3>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {result.plagiarismScore}%
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4">
                      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">AI Generated Probability</h3>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {result.aiGeneratedProbability}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analysis Details</h3>
                    <div className="bg-gray-100 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div 
                        className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: formatText(result.analysisText) }}
                      />
                    </div>
                  </div>

                  {result.plagiarismScore > 50 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-3 bg-red-100 dark:bg-red-700/20 border border-red-500/30 rounded-lg p-4"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-500 dark:text-red-400">High Plagiarism Alert</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          The code shows significant similarity with existing sources. Consider reviewing and modifying the implementation.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center text-center">
                <FileText className="w-16 h-16 text-gray-600 dark:text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Analysis Report</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your code in the editor and click "Analyze Code" to generate a detailed plagiarism report.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default PlagiarismDetection;
