
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface LearningProgress {
  pathId: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  xp: number;
}

interface ContinueLearningSectionProps {
  currentProgress: LearningProgress[];
  onStartLearning: (pathId: string) => void;
}

const ContinueLearningSection: React.FC<ContinueLearningSectionProps> = ({
  currentProgress,
  onStartLearning
}) => {
  if (currentProgress.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Continue Learning</h3>
      <div className="grid gap-4">
        {currentProgress.slice(0, 3).map((progress) => (
          <Card key={progress.pathId} className="p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Learning Path #{progress.pathId.slice(-4)}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>{progress.completedLessons}/{progress.totalLessons} lessons</span>
                  <span>{progress.xp} XP earned</span>
                </div>
                <Progress value={progress.progress} className="h-2" />
              </div>
              <Button
                size="sm"
                onClick={() => onStartLearning(progress.pathId)}
                className="ml-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Continue
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearningSection;
