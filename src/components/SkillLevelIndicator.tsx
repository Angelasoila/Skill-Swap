
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, TrendingUp } from 'lucide-react';

interface SkillLevelIndicatorProps {
  skill: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  progress: number;
  xp: number;
  showDetails?: boolean;
}

const SkillLevelIndicator = ({ skill, level, progress, xp, showDetails = true }: SkillLevelIndicatorProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'Expert': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getLevelStars = (level: string) => {
    switch (level) {
      case 'Beginner': return 1;
      case 'Intermediate': return 2;
      case 'Advanced': return 3;
      case 'Expert': return 4;
      default: return 1;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">{skill}</h4>
        <Badge className={getLevelColor(level)}>{level}</Badge>
      </div>
      
      <div className="flex items-center space-x-1 mb-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < getLevelStars(level)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>

      {showDetails && (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Total XP</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-blue-600 dark:text-blue-400">{xp} XP</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillLevelIndicator;
