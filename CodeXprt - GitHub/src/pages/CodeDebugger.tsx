import React, { useState } from 'react';
import { Bug, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'PLACE_YOUR_API';

type DebugResult = {
  problem: string;
  solution: string;
  codeSnippet: string;
};

function extractJsonFromText(text: string): any {
  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        throw new Error('Could not parse JSON from response');
      }
    }
    throw new Error('No JSON found in response');
  }
}

function validateDebugResult(result: any): DebugResult {
  if (!result.problem || !result.solution || !result.codeSnippet) {
    throw new Error('Invalid response format');
  }
  return {
    problem: result.problem,
    solution: result.solution,
    codeSnippet: result.codeSnippet
  };
}

function CodeDebugger() {
  const [code, setCode] = useState('');
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DebugResult | null>(null);
  const [error, setError] = useState('');

  const handleClear = () => {
    setCode('');
    setProblem('');
    setResult(null);
    setError('');
  };

  const handleDebug = async () => {
    if (!code.trim() || !problem.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!API_KEY) {
      setError('API key not configured');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `You are an expert programmer. Analyze this code and problem, then respond ONLY with a JSON object in this exact format:
{
  "problem": "detailed analysis of the issue",
  "solution": "step-by-step solution",
  "codeSnippet": "relevant problematic code section"
}

Code:
${code}

Problem Description:
${problem}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const parsedResult = extractJsonFromText(text);
      setResult(validateDebugResult(parsedResult));
    } catch (err) {
      console.error('Debug error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        <span style={{ color: '#3A83F6' }}>Code</span>
        <span style={{ color: '#A855F8' }}>Xprt</span>
        <span style={{ marginLeft: '10px' }}>Code Debugger</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Paste your code and describe the problem to get AI-powered debugging insights.
      </p>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 border rounded-md text-gray-800 bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm"
              placeholder="Paste your code here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Describe the Problem
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full h-32 p-4 border rounded-md text-gray-800 bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm"
              placeholder="Describe what's not working..."
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDebug}
              disabled={loading}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Bug className="mr-2 h-5 w-5" />
                  Debug Code
                </div>
              )}
            </button>
            <button
              onClick={handleClear}
              className="py-2 px-4 border rounded-md text-gray-800 bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Clear
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100 flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-gray-300">Problem Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{result.problem}</p>
              </div>
              <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-gray-300">Solution</h3>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{result.solution}</p>
              </div>
              <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-gray-300">Problematic Code Snippet</h3>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{result.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeDebugger;
