import { Question } from '../types/questions';

export const questions: Question[] = [
  // Software Developer Path
  {
    id: 'sd-1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    category: 'Arrays',
    points: 10,
    hints: ['Consider using a hash map', 'Think about complement numbers'],
    careerPath: 'software-dev',
    testCases: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1]'
      }
    ]
  },
  {
    id: 'sd-2',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    difficulty: 'medium',
    category: 'Stacks',
    points: 20,
    hints: ['Use a stack data structure', 'Think about matching pairs'],
    careerPath: 'software-dev'
  },
  
  // Web Developer Path
  {
    id: 'web-1',
    title: 'Responsive Layout Challenge',
    description: 'Create a responsive grid layout that adapts to different screen sizes using CSS Grid.',
    difficulty: 'easy',
    category: 'CSS',
    points: 15,
    hints: ['Use media queries', 'Consider mobile-first approach'],
    careerPath: 'web-dev'
  },
  {
    id: 'web-2',
    title: 'API Integration',
    description: 'Implement a weather dashboard using a public weather API with proper error handling.',
    difficulty: 'medium',
    category: 'APIs',
    points: 25,
    hints: ['Use fetch or axios', 'Implement loading states'],
    careerPath: 'web-dev'
  },

  // AI/ML Path
  {
    id: 'ai-1',
    title: 'Linear Regression Implementation',
    description: 'Implement linear regression from scratch using numpy.',
    difficulty: 'medium',
    category: 'Machine Learning',
    points: 30,
    hints: ['Start with the basic equation y = mx + b', 'Use gradient descent'],
    careerPath: 'ai-ml'
  },
  {
    id: 'ai-2',
    title: 'Neural Network Basics',
    description: 'Create a simple neural network for binary classification.',
    difficulty: 'hard',
    category: 'Deep Learning',
    points: 40,
    hints: ['Use sigmoid activation', 'Implement backpropagation'],
    careerPath: 'ai-ml'
  },

  // Cybersecurity Path
  {
    id: 'sec-1',
    title: 'SQL Injection Prevention',
    description: 'Identify and fix SQL injection vulnerabilities in a given code snippet.',
    difficulty: 'medium',
    category: 'Web Security',
    points: 25,
    hints: ['Use prepared statements', 'Implement input validation'],
    careerPath: 'cybersecurity'
  },
  {
    id: 'sec-2',
    title: 'Password Hashing',
    description: 'Implement secure password hashing with salt.',
    difficulty: 'hard',
    category: 'Authentication',
    points: 35,
    hints: ['Use bcrypt', 'Implement proper salt generation'],
    careerPath: 'cybersecurity'
  }
];

export const getDailyQuestions = (careerPath: string, difficulty?: string): Question[] => {
  let filtered = questions.filter(q => q.careerPath === careerPath);
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  // Randomly select 3 questions
  return filtered.sort(() => Math.random() - 0.5).slice(0, 3);
};
