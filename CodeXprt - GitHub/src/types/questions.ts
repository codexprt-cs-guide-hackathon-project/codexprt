export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
  solution?: string;
  hints: string[];
  testCases?: TestCase[];
  careerPath: string;
}

export interface TestCase {
  input: string;
  output: string;
  explanation: string;
}

export interface UserProgress {
  userId: string;
  totalPoints: number;
  questionsCompleted: string[]; // Array of question IDs
  currentStreak: number;
  lastCompletedDate: string;
  careerPath: string;
}

export interface DailyQuote {
  id: string;
  text: string;
  author: string;
  category: string;
}
