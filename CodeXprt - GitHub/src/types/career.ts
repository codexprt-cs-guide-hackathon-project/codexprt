export interface CareerPath {
  id: string;
  title: string;
  description: string;
  levels: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  dailyQuestions: {
    beginner: Question[];
    intermediate: Question[];
    advanced: Question[];
  };
  resources: Resource[];
}

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  points: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'book';
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  provider?: string;
}
