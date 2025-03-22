import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const CodeChecker = () => {
  const [code, setCode] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');
  const [improvementSuggestions, setImprovementSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeCode = async () => {
    setIsLoading(true);
    setError('');
    setTimeComplexity('');
    setSpaceComplexity('');
    setImprovementSuggestions('');

    const geminiApiKey = 'PLACE_YOUR_API';

    if (!geminiApiKey) {
      setError('Gemini API key is required. Please set it in the component.');
      setIsLoading(false);
      return;
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Analyze the following code and remember to never give an empty response Time or Space Complexity and Improvements:\n${code}\n\n` +
      `Provide the analysis in the following format:\n` +
      `Time Complexity: <time_complexity>\n` +
      `Space Complexity: <space_complexity>\n` +
      `Improvements: <improvement_suggestions>\n\n` +
      `Where:\n` +
      `- <time_complexity> is the time complexity of the code.\n` +
      `- <space_complexity> is the space complexity of the code.\n` +
      `- <improvement_suggestions> are suggestions on how the code can be improved.\n\n` +
      `Example:\n` +
      `Time Complexity: O(n^2)\n` +
      `Space Complexity: O(1)\n` +
      `Improvements: Use a more efficient sorting algorithm.\n\n` +
      `Now, provide the analysis for the given code.`;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      console.log('Raw response from Gemini API:', responseText); // Log the raw response

      // Parse the response to extract time complexity, space complexity, and improvements
      const timeComplexityMatch = responseText.match(/Time Complexity:\s*(.*)/i);
      const spaceComplexityMatch = responseText.match(/Space Complexity:\s*(.*)/i);
      const improvementsMatch = responseText.match(/Improvements:\s*(.*)/i);

      const timeComplexityValue = timeComplexityMatch ? timeComplexityMatch[1].trim() : 'Not found';
      const spaceComplexityValue = spaceComplexityMatch ? spaceComplexityMatch[1].trim() : 'Not found';
      const improvementsValue = improvementsMatch ? improvementsMatch[1].trim() : 'No suggestions found';

      setTimeComplexity(timeComplexityValue);
      setSpaceComplexity(spaceComplexityValue);
      setImprovementSuggestions(improvementsValue);

      if (!timeComplexityMatch || !spaceComplexityMatch || !improvementsMatch) {
        console.warn('Could not parse all sections from the response.');
      }

    } catch (e: any) {
      setError(`Error analyzing code: ${e.message}`);
      console.error('Error details:', e); // Log the error details
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
				<span style={{ color: '#3A83F6' }}>Code</span>
					  <span style={{ color: '#A855F8' }}>Xprt</span>
					  <span style={{ marginLeft: '10px' }}>Code Checker</span>
        </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Paste your code below to analyze its time and space complexity and see suggestions for writing better code :)
      </p>

      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-4 border rounded-md text-gray-800 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm"
          rows={13}
          placeholder="Enter your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          onClick={analyzeCode}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Code'}
        </button>

        {error && <div className="text-red-500">{error}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {timeComplexity && (
          <div className="animate-slide-in-bottom">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Time Complexity</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{timeComplexity}</p>
          </div>
        )}

        {spaceComplexity && (
          <div className="animate-slide-in-bottom">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Space Complexity</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{spaceComplexity}</p>
          </div>
        )}
      </div>

      {improvementSuggestions && (
        <div className="animate-slide-in-bottom">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Improvement Suggestions</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">{improvementSuggestions}</p>
        </div>
      )}
    </div>
  );
};

export default CodeChecker;
