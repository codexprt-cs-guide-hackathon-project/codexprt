import React from 'react';
import { BarChart, Calendar, Award, ArrowUp, TrendingUp } from 'lucide-react';

export default function Progress() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Progress
        </h1>
        <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>All time</option>
        </select>
      </div>

      {/* Achievement Banner */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Level 5 Achieved!</h2>
            <p className="opacity-90">You've unlocked new challenges and rewards</p>
          </div>
          <Award className="w-16 h-16" />
        </div>
        <div className="mt-6">
          <div className="w-full h-3 bg-white/20 rounded-full">
            <div className="w-3/4 h-full bg-white rounded-full" />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>750/1000 XP</span>
            <span>Next Level: 6</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Problem Solving"
          value="85%"
          trend="+5%"
          icon={<BarChart className="w-6 h-6 text-emerald-500" />}
          description="Success rate this week"
        />
        <StatCard
          title="Study Streak"
          value="12"
          trend="+3"
          icon={<Calendar className="w-6 h-6 text-blue-500" />}
          description="Consecutive days"
        />
        <StatCard
          title="Ranking"
          value="#120"
          trend="+15"
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
          description="Among all users"
        />
      </div>

      {/* Recent Achievements */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Achievements
        </h2>
        <div className="space-y-4">
          <AchievementCard
            title="Algorithm Master"
            description="Solved 50 algorithm challenges"
            date="2 days ago"
            points={100}
          />
          <AchievementCard
            title="Perfect Week"
            description="Completed all daily challenges for 7 days"
            date="1 week ago"
            points={150}
          />
          <AchievementCard
            title="Quick Learner"
            description="Completed 5 courses in a month"
            date="2 weeks ago"
            points={200}
          />
        </div>
      </section>

      {/* Skills Progress */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Skills Progress
        </h2>
        <div className="space-y-6">
          <SkillProgress
            name="Algorithms"
            progress={85}
            level="Advanced"
            color="emerald"
          />
          <SkillProgress
            name="Data Structures"
            progress={70}
            level="Intermediate"
            color="blue"
          />
          <SkillProgress
            name="System Design"
            progress={45}
            level="Beginner"
            color="purple"
          />
        </div>
      </section>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  description: string;
}

function StatCard({ title, value, trend, icon, description }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="flex items-center text-sm font-medium text-green-500">
          <ArrowUp className="w-4 h-4 mr-1" />
          {trend}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {value}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  points: number;
}

function AchievementCard({
  title,
  description,
  date,
  points,
}: AchievementCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <Award className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm font-medium text-purple-500">+{points} XP</span>
        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      </div>
    </div>
  );
}

interface SkillProgressProps {
  name: string;
  progress: number;
  level: string;
  color: string;
}

function SkillProgress({ name, progress, level, color }: SkillProgressProps) {
  const colors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{level}</p>
        </div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {progress}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
