import React from 'react';
import { Sparkles, Target, Calendar, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getRandomQuote } from '../data/quotes';
import { getDailyQuestions } from '../data/questions';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { userProgress } = useUser();
  const dailyQuote = getRandomQuote();
  const dailyQuestions = getDailyQuestions(userProgress.careerPath);
  const navigate = useNavigate();

  const handleStartChallenge = () => {
    navigate('/dashboard/practice');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <blockquote className="text-xl italic">
          "{dailyQuote.text}"
        </blockquote>
        <p className="mt-2 text-white/80">— {dailyQuote.author}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current Streak"
          value={`${userProgress.currentStreak} days`}
          icon={<Sparkles className="w-6 h-6 text-purple-500" />}
          trend="+2 from last week"
          color="purple"
        />
        <StatCard
          title="Problems Solved"
          value={userProgress.questionsCompleted.length.toString()}
          icon={<Target className="w-6 h-6 text-emerald-500" />}
          trend="+15 this month"
          color="emerald"
        />
        <StatCard
          title="Study Hours"
          value="28h"
          icon={<Calendar className="w-6 h-6 text-blue-500" />}
          trend="On track"
          color="blue"
        />
        <StatCard
          title="Total Points"
          value={userProgress.totalPoints.toString()}
          icon={<Award className="w-6 h-6 text-amber-500" />}
          trend="Level 5"
          color="amber"
        />
      </div>

      {/* Daily Challenges */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Today's Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dailyQuestions.map((question) => (
            <DailyQuestionCard
              key={question.id}
              title={question.title}
              difficulty={question.difficulty}
              points={question.points}
              completed={userProgress.questionsCompleted.includes(question.id)}
              onStartChallenge={handleStartChallenge}
            />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <ActivityItem
            title="Completed Daily Challenge"
            description="Binary Search Implementation"
            time="2 hours ago"
            type="challenge"
          />
          <ActivityItem
            title="Reached Milestone"
            description="Completed Basic Data Structures"
            time="1 day ago"
            type="milestone"
          />
          <ActivityItem
            title="Started New Course"
            description="Advanced Algorithm Design"
            time="2 days ago"
            type="course"
          />
        </div>
      </section>

      {/* Weekly Goals */}
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-6">Weekly Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GoalCard
            title="Practice Problems"
            current={15}
            target={20}
            unit="problems"
          />
          <GoalCard
            title="Study Time"
            current={12}
            target={15}
            unit="hours"
          />
        </div>
      </section>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colorClasses = {
    purple: 'bg-purple-50 dark:bg-purple-900/20',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    amber: 'bg-amber-50 dark:bg-amber-900/20',
  };

  return (
    <div className={`${colorClasses[color]} rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {trend}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {title}
      </h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  type: 'challenge' | 'milestone' | 'course';
}

function ActivityItem({ title, description, time, type }: ActivityItemProps) {
  const typeColors = {
    challenge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    milestone: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    course: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      <div className="text-right">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[type]}`}>
          {type}
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

interface GoalCardProps {
  title: string;
  current: number;
  target: number;
  unit: string;
}

function GoalCard({ title, current, target, unit }: GoalCardProps) {
  const progress = (current / target) * 100;

  return (
    <div className="bg-white/10 rounded-xl p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm opacity-90">Progress</span>
        <span className="text-sm font-medium">{current}/{target} {unit}</span>
      </div>
      <div className="w-full h-2 bg-white/20 rounded-full">
        <div
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface DailyQuestionCardProps {
  title: string;
  difficulty: string;
  points: number;
  completed: boolean;
  onStartChallenge: () => void;
}

function DailyQuestionCard({ title, difficulty, points, completed, onStartChallenge }: DailyQuestionCardProps) {
  const difficultyColors = {
    easy: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    medium: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    hard: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
        <span className="text-blue-500 font-medium">{points} pts</span>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <div className="flex justify-between items-center">
        <span className={`text-sm ${completed ? 'text-green-500' : 'text-gray-500'}`}>
          {completed ? 'Completed' : 'Not started'}
        </span>
        <button
          onClick={onStartChallenge}
          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          disabled={completed}
        >
          {completed ? 'Solved' : 'Start Challenge'}
        </button>
      </div>
    </div>
  );
}
