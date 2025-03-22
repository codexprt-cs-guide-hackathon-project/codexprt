import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { ArrowRight, Code2, Loader2, AlertTriangle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const LANGUAGES = [
  'python', 'javascript', 'typescript', 'java', 'c', 'cpp', 'csharp', 'go',
  'rust', 'swift', 'kotlin', 'ruby', 'php', 'scala', 'dart', 'r'
];

const API_KEY = 'PLACE_YOUR_API';

function extractCodeFromResponse(text: string): string {

  const codeBlockMatch = text.match(/```(?:\w+)?\n([\s\S]*?)```/);
  if (codeBlockMatch) {
    return cleanupCode(codeBlockMatch[1]);
  }

  const codeMatch = text.match(/(?:function|class|def|public|private|void)\s+\w+[\s\S]*?(?:}|\bend\b)/i);
  if (codeMatch) {
    return cleanupCode(codeMatch[0]);
  }

  return cleanupCode(text);
}

function cleanupCode(code: string): string {
  code = code.replace(/\/\/ Test[\s\S]*$|\/\/ Driver[\s\S]*$|# Test[\s\S]*$|if\s+__name__\s*==\s*['"]__main__['"]\s*:[\s\S]*$/im, '');
  
  code = code.trim();
  
  code = code.replace(/^(\s*\/\/[^\n]*\n|\s*#[^\n]*\n|\s*\/\*[\s\S]*?\*\/\s*\n)*/, '');
  
  return code;
}

function SimpleConvertor() {
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [sourceLang, setSourceLang] = useState('python');
  const [targetLang, setTargetLang] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      setError('Please provide source code');
      return;
    }

    if (sourceLang === targetLang) {
      setError('Source and target languages must be different');
      return;
    }

    if (!API_KEY) {
      setError('API key not configured');
      return;
    }

    setLoading(true);
    setError('');
    setConvertedCode('');

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Convert this ${sourceLang} code to ${targetLang}. Return ONLY the converted code without any explanations, test code, or driver code. The code should be production-ready and follow best practices.

Source code:
${sourceCode}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setConvertedCode(extractCodeFromResponse(text));
    } catch (err) {
      console.error('Conversion error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during conversion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        <span style={{ color: '#3A83F6' }}>Code</span>
        <span style={{ color: '#A855F8' }}>Xprt</span>
        <span style={{ marginLeft: '10px' }}>Code Converter</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Convert code between programming languages using AI
      </p>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Source Language
            </label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-800 bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Language
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-800 bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Source Code
            </label>
            <div className="h-[400px] border rounded-md text-gray-800 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm">
              <Editor
                height="100%"
                defaultLanguage={sourceLang}
                value={sourceCode}
                onChange={(value) => setSourceCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on'
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Converted Code
            </label>
            <div className="h-[400px] border rounded-md text-gray-800 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm">
              <Editor
                height="100%"
                defaultLanguage={targetLang}
                value={convertedCode}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  readOnly: true
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6">
          <button
            onClick={handleConvert}
            disabled={loading}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Converting...
              </div>
            ) : (
              <div className="flex items-center">
                <ArrowRight className="mr-2 h-5 w-5" />
                Convert
              </div>
            )}
          </button>
          {error && (
            <div className="mt-4 p-3 rounded-md bg-red-100 text-red-700 flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimpleConvertor;
