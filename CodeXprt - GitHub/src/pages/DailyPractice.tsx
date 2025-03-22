import React, { useState, useEffect } from 'react';
import { Brain, Clock, Target, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getDailyQuestions } from '../data/questions';
import type { Question } from '../types/questions';

const difficultyColors = {
  easy: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  medium: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
  hard: 'text-red-500 bg-red-50 dark:bg-red-900/20',
};

export default function DailyPractice() {
  const { userProgress, updateProgress } = useUser();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const dailyQuestions = getDailyQuestions(userProgress.careerPath, selectedDifficulty);
    setQuestions(dailyQuestions);
  }, [selectedDifficulty, userProgress.careerPath]);

  const handleCompleteChallenge = (questionId: string, points: number) => {
    updateProgress(questionId, points);
    setSelectedQuestion(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Daily Practice
        </h1>
        <div className="flex space-x-4">
          <DifficultySelector
            selected={selectedDifficulty}
            onSelect={setSelectedDifficulty}
          />
        </div>
      </div>

      {/* Today's Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question) => (
          <ChallengeCard
            key={question.id}
            {...question}
            completed={userProgress.questionsCompleted.includes(question.id)}
            onComplete={() => handleCompleteChallenge(question.id, question.points)}
            onClick={() => setSelectedQuestion(question)}
          />
        ))}
      </div>

      {/* Question Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedQuestion.title}
              </h2>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  difficultyColors[selectedQuestion.difficulty]
                }`}>
                  {selectedQuestion.difficulty}
                </span>
                <span className="text-blue-500 font-medium">
                  {selectedQuestion.points} points
                </span>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p>{selectedQuestion.description}</p>
                {selectedQuestion.hints && (
                  <>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Hints</h3>
                    <ul>
                      {selectedQuestion.hints.map((hint, index) => (
                        <li key={index}>{hint}</li>
                      ))}
                    </ul>
                  </>
                )}
                {selectedQuestion.testCases && (
                  <>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Test Cases</h3>
                    {selectedQuestion.testCases.map((testCase, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                        <p><strong>Input:</strong> {testCase.input}</p>
                        <p><strong>Output:</strong> {testCase.output}</p>
                        <p><strong>Explanation:</strong> {testCase.explanation}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Close
                </button>
                {!userProgress.questionsCompleted.includes(selectedQuestion.id) && (
                  <button
                    onClick={() => handleCompleteChallenge(selectedQuestion.id, selectedQuestion.points)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Complete Challenge
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Today's Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgressCard
            title="Problems Solved"
            value={`${questions.filter(q => userProgress.questionsCompleted.includes(q.id)).length}/${questions.length}`}
            icon={<Target className="w-6 h-6 text-blue-500" />}
          />
          <ProgressCard
            title="Points Earned Today"
            value={questions
              .filter(q => userProgress.questionsCompleted.includes(q.id))
              .reduce((acc, q) => acc + q.points, 0)
              .toString()}
            icon={<Brain className="w-6 h-6 text-emerald-500" />}
          />
          <ProgressCard
            title="Current Streak"
            value={`${userProgress.currentStreak} days`}
            icon={<Clock className="w-6 h-6 text-purple-500" />}
          />
        </div>
      </div>
    </div>
  );
}

interface DifficultySelectorProps {
  selected: string;
  onSelect: (difficulty: string) => void;
}

function DifficultySelector({ selected, onSelect }: DifficultySelectorProps) {
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onSelect(difficulty)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            selected === difficulty
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </button>
      ))}
    </div>
  );
}

interface ChallengeCardProps extends Question {
  completed: boolean;
  onComplete: () => void;
  onClick: () => void;
}

function ChallengeCard({
  title,
  category,
  difficulty,
  completed,
  description,
  points,
  onComplete,
  onClick,
}: ChallengeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          difficultyColors[difficulty]
        }`}>
          {difficulty}
        </span>
        {completed && (
          <span className="text-green-500">
            <CheckCircle className="w-6 h-6" />
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{category}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {points} points
        </span>
        <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}

interface ProgressCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function ProgressCard({ title, value, icon }: ProgressCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}
