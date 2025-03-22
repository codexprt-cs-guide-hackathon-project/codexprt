import React from 'react';
import { useUser } from '../context/UserContext';
import { getCareerPathById } from '../data/careerPaths';

export default function Graph() {
  const { userProgress } = useUser();
  const careerPath = getCareerPathById(userProgress.careerPath);

  // Calculate skill percentages based on completed chapters
  const calculateSkillPercentages = () => {
    const skills: Record<string, number> = {};
    if (!careerPath || !careerPath.levels) {
      console.log('Career path or levels are undefined');
      return skills;
    }

    let totalChapters = 0;
    for (const level in careerPath.levels) {
      if (careerPath.levels.hasOwnProperty(level)) {
        totalChapters += careerPath.levels[level].length;
      }
    }

    if (totalChapters === 0) {
      console.log('Total chapters is zero');
      return skills;
    }

    Object.entries(careerPath.levels).forEach(([level, chapters]) => {
      chapters.forEach(chapter => {
        const normalizedChapter = chapter.toLowerCase().replace(/[\s()]+/g, '-');
        if (userProgress.questionsCompleted.includes(normalizedChapter)) {
          const skill = chapter.toLowerCase().split(' ')[0];
          skills[skill] = (skills[skill] || 0) + (1 / totalChapters) * 100;
        }
      });
    });

    console.log('Calculated skills:', skills);
    return skills;
  };

  const skillPercentages = calculateSkillPercentages();

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Learning Analytics
      </h1>

      {/* Skill Distribution */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Skill Distribution
        </h2>
        {Object.keys(skillPercentages).length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No skills data available yet. Complete some chapters to see your skill distribution.</p>
        ) : (
          <div className="grid gap-4">
            {Object.entries(skillPercentages).map(([skill, percentage]) => (
              <div key={skill}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {skill}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {Math.round(percentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Learning Pattern */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Learning Pattern
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Weekly Activity
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded ${
                    Math.random() > 0.5
                      ? 'bg-blue-500 dark:bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  title={`Day ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Study Time Distribution */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Study Time Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Morning
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    40%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: '40%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Afternoon
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    35%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{ width: '35%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Evening
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    25%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: '25%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Achievements */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Learning Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Completed Chapters
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {userProgress.questionsCompleted.length}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Current Streak
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {userProgress.currentStreak} days
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Total Points
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {userProgress.totalPoints}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
