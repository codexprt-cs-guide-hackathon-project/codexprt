import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, ArrowRight, Book, X, PartyPopper } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getCareerPathById } from '../data/careerPaths';
import { chapterContent } from '../data/chapterContent';

export default function Roadmap() {
  const { userProgress } = useUser();
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const careerPath = getCareerPathById(userProgress.careerPath);
  
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    const saved = localStorage.getItem(`completedChapters_${userProgress.careerPath}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      `completedChapters_${userProgress.careerPath}`,
      JSON.stringify(completedChapters)
    );
  }, [completedChapters, userProgress.careerPath]);

  const totalChapters = Object.values(careerPath?.levels || {}).flat().length;
  const progress = Math.round((completedChapters.length / totalChapters) * 100);

  const normalizeChapterName = (chapter: string) => chapter.toLowerCase().replace(/[\s()]+/g, '-');

  const isChapterAccessible = () => true;

  const handleChapterClick = (chapter: string) => {
    const normalizedChapter = normalizeChapterName(chapter);
    setSelectedChapter(normalizedChapter);
  };

  const handleCompleteChapter = (chapter: string) => {
    if (!completedChapters.includes(chapter)) {
      setCompletedChapters(prev => [...prev, chapter]);
    }
    setSelectedChapter(null);
  };

  const getChapterContent = (chapter: string, careerPathId: string) => {
    const normalizedChapter = normalizeChapterName(chapter);
    const defaultContent = {
      title: chapter,
      description: `Learn about ${chapter}`,
      content: `# ${chapter}

## Overview
Understanding ${chapter} is crucial for your development journey.

## Key Concepts
- Basic principles of ${chapter}
- Common patterns and practices
- Best practices and guidelines
- Real-world applications

## Learning Objectives
- Understand the fundamentals of ${chapter}
- Apply the concepts in practical scenarios
- Master advanced techniques
- Build real-world projects`,
      resources: [
        {
          title: `${chapter} Fundamentals`,
          url: 'https://www.freecodecamp.org',
          type: 'tutorial'
        },
        {
          title: `Advanced ${chapter}`,
          url: 'https://www.codecademy.com',
          type: 'course'
        }
      ],
      exercises: [
        {
          title: `${chapter} Practice Exercise 1`,
          description: 'Apply the concepts learned in a practical exercise'
        },
        {
          title: `${chapter} Challenge`,
          description: 'Test your knowledge with a challenging problem'
        }
      ]
    };

    return chapterContent[careerPathId]?.[normalizedChapter] || defaultContent;
  };

  const formatContent = (content: string) => {
    if (!content) return null;
  
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mb-6 dark:text-white">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 dark:text-white">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3 dark:text-white">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 mb-2 dark:text-gray-300">{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
  
      // Replace **bold text** with <strong>bold text</strong>
      const boldedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Replace [link text](url) with <a href="url">link text</a>
      const linkedLine = boldedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">$1</a>');
  
      return (
        <p
          key={index}
          className="mb-4 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: linkedLine }}
        />
      );
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Learning Roadmap
        </h1>
      </div>

      {/* Specialization Info */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{careerPath?.title}</h2>
            <p className="opacity-90">{careerPath?.description}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">Progress</p>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold">{progress}%</p>
              {progress === 100 && <PartyPopper className="w-6 h-6 text-yellow-300 animate-bounce" />}
            </div>
            {progress === 100 && (
              <p className="text-sm font-medium text-yellow-300 mt-1">
                Congratulations! You've completed all chapters!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Chapter Modal */}
      {selectedChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2836] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {getChapterContent(selectedChapter, userProgress.careerPath).title}
              </h2>
              <button
                onClick={() => setSelectedChapter(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              {formatContent(getChapterContent(selectedChapter, userProgress.careerPath).content)}
            </div>

            {/* Resources */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getChapterContent(selectedChapter, userProgress.careerPath).resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Book className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {resource.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.type}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Exercises */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Exercises
              </h3>
              <div className="space-y-4">
                {getChapterContent(selectedChapter, userProgress.careerPath).exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {exercise.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {exercise.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => handleCompleteChapter(selectedChapter)}
                disabled={completedChapters.includes(selectedChapter)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  completedChapters.includes(selectedChapter)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {completedChapters.includes(selectedChapter) ? 'Chapter Completed' : 'Complete Chapter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Learning Path */}
      <div className="space-y-6">
        {Object.entries(careerPath?.levels || {}).map(([level, chapters]) => (
          <div
            key={level}
            className="bg-white dark:bg-[#1F2836] rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
              {level} Level
            </h3>
            <div className="space-y-6">
              {chapters.map((chapter) => {
                const normalizedChapter = normalizeChapterName(chapter);
                const isCompleted = completedChapters.includes(normalizedChapter);

                return (
                  <div
                    key={chapter}
                    className="flex items-start space-x-4 cursor-pointer"
                    onClick={() => handleChapterClick(chapter)}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {chapter}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Click to view chapter details
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
