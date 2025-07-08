
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  students: number;
  rating: number;
  topics: string[];
  field: string;
}

export interface SkillLevel {
  skill: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  progress: number;
  xp: number;
  confidence?: number;
  areasToImprove?: string[];
}

export interface AIResponse {
  response: string;
  success: boolean;
  error?: string;
}

export interface WeeklyReview {
  week: string;
  totalStudyTime: number;
  lessonsCompleted: number;
  weakSkills: string[];
  strongSkills: string[];
  recommendations: string[];
  focusAreas: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'text' | 'weekly_review' | 'skill_assessment' | 'practice_questions';
}

export interface PracticeQuestion {
  id: string;
  question: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  topic: string;
  type: 'multiple_choice' | 'coding' | 'theoretical';
  options?: string[];
  correctAnswer?: string;
}

export interface StudyRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  skillArea: string;
}
