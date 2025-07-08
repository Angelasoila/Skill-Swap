
import React from 'react';
import { Button } from '@/components/ui/button';

interface LearningGoal {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface LearningGoalsGridProps {
  learningGoals: LearningGoal[];
  selectedGoal: string;
  onGoalSelect: (goalId: string) => void;
}

const LearningGoalsGrid: React.FC<LearningGoalsGridProps> = ({
  learningGoals,
  selectedGoal,
  onGoalSelect
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your Learning Goals</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {learningGoals.map((goal) => (
          <Button
            key={goal.id}
            variant={selectedGoal === goal.id ? "default" : "outline"}
            size="sm"
            onClick={() => onGoalSelect(goal.id)}
            className={`h-auto p-4 transition-all duration-300 ${
              selectedGoal === goal.id 
                ? `bg-gradient-to-r ${goal.color} hover:opacity-90 text-white border-0` 
                : 'dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl">{goal.icon}</span>
              <span className="text-sm font-medium">{goal.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LearningGoalsGrid;
