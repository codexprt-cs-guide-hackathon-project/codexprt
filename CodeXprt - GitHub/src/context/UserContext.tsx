import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types/questions';

interface UserContextType {
  userProgress: UserProgress;
  updateProgress: (questionId: string, points: number) => void;
  changeCareerPath: (newPath: string) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  userId: '1',
  totalPoints: 0,
  questionsCompleted: [],
  currentStreak: 0,
  lastCompletedDate: localStorage.getItem('lastCompletedDate') || '',
  careerPath: localStorage.getItem('selectedCareerPath') || ''
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateProgress = (questionId: string, points: number) => {
    setUserProgress(prev => {
      if (prev.questionsCompleted.includes(questionId)) {
        return prev;
      }

      const today = new Date().toISOString().split('T')[0];
      const isConsecutiveDay = prev.lastCompletedDate === today;
      let newStreak = prev.currentStreak;

      if (prev.lastCompletedDate !== today) {
        newStreak = isConsecutiveDay ? prev.currentStreak + 1 : 1;
        localStorage.setItem('lastCompletedDate', today);
      }

      return {
        ...prev,
        totalPoints: prev.totalPoints + points,
        questionsCompleted: [...prev.questionsCompleted, questionId],
        currentStreak: newStreak,
        lastCompletedDate: today
      };
    });
  };

  const changeCareerPath = (newPath: string) => {
    localStorage.setItem('selectedCareerPath', newPath);
    setUserProgress(prev => ({
      ...prev,
      careerPath: newPath,
      questionsCompleted: [],
      currentStreak: 0,
      totalPoints: 0
    }));
  };

  const resetProgress = () => {
    setUserProgress(defaultProgress);
  };

  return (
    <UserContext.Provider value={{ userProgress, updateProgress, changeCareerPath, resetProgress }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
