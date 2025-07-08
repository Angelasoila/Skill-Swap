
import { WeeklyReview, StudyRecommendation, SkillLevel } from '@/types/learning';

export const mockAIResponses = {
  personalizedQuestions: [
    "What are the key differences between async/await and Promises in JavaScript?",
    "How would you implement error handling in a React component?", 
    "Explain the concept of closures in JavaScript with an example.",
    "What are Python data structures and when would you use each one?",
    "How do you optimize React component performance?"
  ],
  studyRecommendations: [
    {
      title: "Master JavaScript Async Programming",
      description: "Focus on understanding Promise chains, async/await patterns, and error handling to improve your JavaScript skills.",
      priority: "High" as const,
      estimatedTime: "2-3 hours",
      skillArea: "JavaScript"
    },
    {
      title: "Learn React State Management",
      description: "Study Context API, useState, useReducer, and state management libraries like Zustand or Redux.",
      priority: "High" as const,
      estimatedTime: "3-4 hours",
      skillArea: "React"
    },
    {
      title: "Python OOP Fundamentals",
      description: "Practice creating classes, inheritance, and understanding object-oriented programming principles.",
      priority: "Medium" as const,
      estimatedTime: "2-3 hours",
      skillArea: "Python"
    },
    {
      title: "Data Visualization with Python",
      description: "Learn matplotlib, seaborn, and plotly for creating effective data visualizations.",
      priority: "Medium" as const,
      estimatedTime: "4-5 hours",
      skillArea: "Data Analysis"
    },
    {
      title: "React Performance Optimization",
      description: "Study React.memo, useMemo, useCallback, and code splitting techniques.",
      priority: "Low" as const,
      estimatedTime: "2-3 hours",
      skillArea: "React"
    }
  ],
  weeklyReview: {
    week: "Week of Dec 2-8, 2024",
    totalStudyTime: 180,
    lessonsCompleted: 12,
    weakSkills: ["Python", "Data Analysis"],
    strongSkills: ["React", "JavaScript"],
    recommendations: [
      "Focus on Python fundamentals this week",
      "Practice data manipulation with pandas",
      "Complete at least 3 coding challenges",
      "Review async/await patterns in JavaScript"
    ],
    focusAreas: ["Data structures", "Statistical analysis", "Error handling"]
  }
};

export const userSkills: SkillLevel[] = [
  { skill: 'JavaScript', level: 'Intermediate', progress: 75, xp: 1250, areasToImprove: ['Async/Await patterns', 'Error handling'] },
  { skill: 'React', level: 'Advanced', progress: 85, xp: 2100, areasToImprove: ['State management', 'Performance optimization'] },
  { skill: 'Python', level: 'Beginner', progress: 35, xp: 450, areasToImprove: ['Data structures', 'Object-oriented programming'] },
  { skill: 'Data Analysis', level: 'Intermediate', progress: 60, xp: 890, areasToImprove: ['Statistical analysis', 'Data visualization'] }
];

export const learningGoals = [
  { id: 'web-development', label: 'Web Development', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { id: 'data-science', label: 'Data Science', icon: '📊', color: 'from-green-500 to-emerald-500' },
  { id: 'mobile-dev', label: 'Mobile Development', icon: '📱', color: 'from-purple-500 to-pink-500' },
  { id: 'ai-ml', label: 'AI/ML', icon: '🤖', color: 'from-orange-500 to-red-500' }
];
