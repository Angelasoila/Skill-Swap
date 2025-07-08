
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import { BookOpen, Star, Clock, TrendingUp } from 'lucide-react';

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    progress: number;
    totalLessons: number;
    xp: number;
    level: number;
    timeSpent: number;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    category?: string;
  };
  onContinue: () => void;
}

const SkillCard = ({ skill, onContinue }: SkillCardProps) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const handleContinueLearning = () => {
    // Call the original onContinue for any additional logic
    onContinue();
    
    // Navigate to learning page with skill parameters
    navigate(`/learning?skill=${encodeURIComponent(skill.name)}&pathId=${skill.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 dark:bg-gray-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl flex items-center justify-center text-2xl">
            {skill.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{skill.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Level {skill.level}</span>
              <span>•</span>
              <span>{skill.xp} XP</span>
            </div>
          </div>
        </div>
        {skill.difficulty && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(skill.difficulty)}`}>
            {skill.difficulty}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <ProgressBar 
          progress={skill.progress} 
          total={skill.totalLessons}
          color="from-blue-400 to-purple-600"
        />

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{skill.progress}/{skill.totalLessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{skill.timeSpent}h spent</span>
          </div>
        </div>

        {skill.category && (
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
              {skill.category}
            </span>
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>On track</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleContinueLearning}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Continue Learning
        </Button>
      </div>
    </Card>
  );
};

export default SkillCard;
