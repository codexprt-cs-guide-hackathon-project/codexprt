import React, { useState } from 'react';
import {
  Bell,
  Moon,
  User,
  Globe,
  Palette,
  Mail,
  BookOpen,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { careerPaths } from '../data/careerPaths';

export default function Settings() {
  const { userProgress, changeCareerPath } = useUser();
  const [formData, setFormData] = useState({
    displayName: 'Anish Sambhwani',
    email: 'anishsambhwani@gmail.com',
    bio: 'Full-stack developer passionate about learning',
    difficultyLevel: 'Intermediate',
    dailyChallengeCount: '3 per day',
    primaryFocus: userProgress.careerPath,
  });

  const [toggles, setToggles] = useState({
    notifications: true,
    emailDigest: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'primaryFocus') {
      changeCareerPath(value);
    }
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => {
      return { ...prev, [key]: !prev[key] };
    });
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a backend
    alert('Changes saved successfully!');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </div>

      {/* Profile Settings */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <User className="w-6 h-6 mr-2" />
          Profile Settings
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              AS
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Change Avatar
            </button>
          </div>
          <SettingsInput
            label="Display Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            type="text"
          />
          <SettingsInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
          />
          <SettingsInput
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            type="text"
          />
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Palette className="w-6 h-6 mr-2" />
          Preferences
        </h2>
        <div className="space-y-6">
          <SettingsToggle
            icon={<Bell className="w-5 h-5" />}
            label="Notifications"
            description="Receive updates about your progress"
            isEnabled={toggles.notifications}
            onToggle={() => handleToggle('notifications')}
          />
          <SettingsToggle
            icon={<Mail className="w-5 h-5" />}
            label="Email Digest"
            description="Weekly summary of your activities"
            isEnabled={toggles.emailDigest}
            onToggle={() => handleToggle('emailDigest')}
          />
        </div>
      </section>

      {/* Learning Preferences */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          Learning Preferences
        </h2>
        <div className="space-y-6">
          <SettingsSelect
            label="Difficulty Level"
            name="difficultyLevel"
            options={['Beginner', 'Intermediate', 'Advanced']}
            value={formData.difficultyLevel}
            onChange={handleSelectChange}
          />
          <SettingsSelect
            label="Daily Challenge Count"
            name="dailyChallengeCount"
            options={['1 per day', '2 per day', '3 per day']}
            value={formData.dailyChallengeCount}
            onChange={handleSelectChange}
          />
        </div>
      </section>

      {/* Career Path */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          Career Path
        </h2>
        <div className="space-y-6">
          <SettingsSelect
            label="Current Career Path"
            name="primaryFocus"
            options={careerPaths.map(path => path.id)}
            value={formData.primaryFocus}
            onChange={handleSelectChange}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Changing your career path will reset your progress. Make sure you want to make this change.
          </p>
        </div>
      </section>
    </div>
  );
}

interface SettingsInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

function SettingsInput({ label, name, value, onChange, type }: SettingsInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

interface SettingsToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

function SettingsToggle({ icon, label, description, isEnabled, onToggle }: SettingsToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="text-gray-600 dark:text-gray-300">{icon}</div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{label}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isEnabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
            isEnabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

interface SettingsSelectProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SettingsSelect({ label, name, options, value, onChange }: SettingsSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
