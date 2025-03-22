import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Database, Brain, Globe, Shield, Smartphone, Cloud, Gamepad, Server, Layout, TestTube, Layers, Cpu } from 'lucide-react';
import { useUser } from '../context/UserContext';

const careerPaths = [
  { id: 'software-dev', title: 'Software Developer', icon: Code, description: 'Build robust and scalable applications' },
  { id: 'dsa', title: 'DSA Expert', icon: Database, description: 'Master algorithms and data structures' },
  { id: 'ai-ml', title: 'AI/ML Engineer', icon: Brain, description: 'Create intelligent systems and models' },
  { id: 'web-dev', title: 'Web Developer', icon: Globe, description: 'Create modern web applications' },
  { id: 'cybersecurity', title: 'Cybersecurity Expert', icon: Shield, description: 'Protect systems and data' },
  { id: 'mobile-dev', title: 'Mobile App Developer', icon: Smartphone, description: 'Build iOS and Android applications' },
  { id: 'cloud', title: 'Cloud Engineer', icon: Cloud, description: 'Design and manage cloud infrastructure' },
  { id: 'game-dev', title: 'Game Developer', icon: Gamepad, description: 'Create engaging gaming experiences' },
  { id: 'backend', title: 'Backend Developer', icon: Server, description: 'Build server-side applications' },
  { id: 'frontend', title: 'Frontend Developer', icon: Layout, description: 'Create beautiful user interfaces' },
  { id: 'qa', title: 'QA Engineer', icon: TestTube, description: 'Ensure software quality' },
  { id: 'fullstack', title: 'Full Stack Developer', icon: Layers, description: 'Master both frontend and backend' },
  { id: 'system-architect', title: 'System Architect', icon: Cpu, description: 'Design complex system architectures' }
];

export default function Welcome() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const { changeCareerPath } = useUser();

  const handlePathSelection = (pathId: string) => {
    setSelectedPath(pathId);
    changeCareerPath(pathId);
    localStorage.setItem('selectedCareerPath', pathId);
    navigate('/dashboard'); // Redirect to /dashboard after selection
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 animate-fade-in">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white animate-slide-in flex justify-center">
            Welcome to 
            <span style={{ color: '#3A83F6', marginLeft: '10px' }}>Code</span>
            <span style={{ color: '#A855F8'}}>Xprt</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in delay-300">
            Choose your career path and begin your journey to becoming a tech professional. 
            We'll provide personalized guidance and daily practice to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {careerPaths.map((path) => (
            <button
              key={path.id}
              onClick={() => handlePathSelection(path.id)}
              className={`group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                selectedPath === path.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <path.icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {path.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-blue-500 dark:text-blue-400">
                  Click to begin →
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Personalized path
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Already know your path? <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
