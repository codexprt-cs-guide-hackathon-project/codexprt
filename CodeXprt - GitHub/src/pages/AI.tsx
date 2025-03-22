import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AI() {
  const [messages, setMessages] = useState<
    { sender: 'user' | 'bot'; text: string }[]
  >([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');

    setTimeout(async () => {
      const botResponse = await getBotResponse(input);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 500);
  };

  const getBotResponse = async (message: string): Promise<string> => {
  try {
    const apiKey = "PLACE_YOUR_API";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
        {
          role: 'model',
          parts: [{ text: "Please respond using only plain characters, and break down a big response into bullet points. Use simple, clear language." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);

    if (result && result.response) {
      const response = result.response;
      return response.text();
    } else {
      console.error("No response found:", result);
      return "Sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("Error in getBotResponse:", error);
    return "An error occurred while processing your request.";
  }
};

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
				<span style={{ color: '#3A83F6' }}>Code</span>
					  <span style={{ color: '#A855F8' }}>Xprt</span>
					  <span style={{ marginLeft: '10px' }}>AI Assistant</span>
        </h1>

      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to CodeXprt AI! I'm here to guide you on your tech journey.
          Ask me about career paths, required skills, helpful resources, and salary expectations.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Example questions: "What skills do I need to become a web developer?", "What are some good resources for learning Python?", "What is the expected salary for a data scientist in the USA?"
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="space-y-4">
          <div className="overflow-y-auto h-[61vh]" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-2`}
              >
                <div
                  className={`max-w-2xl p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white animate-slide-in-right'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 animate-slide-in-left'
                  } ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ref={inputRef}
            />
            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
