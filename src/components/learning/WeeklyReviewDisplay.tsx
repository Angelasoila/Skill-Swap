
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award, AlertCircle, Star, Target } from 'lucide-react';
import { WeeklyReview } from '@/types/learning';

interface WeeklyReviewDisplayProps {
  weeklyReview: WeeklyReview | null;
}

const WeeklyReviewDisplay: React.FC<WeeklyReviewDisplayProps> = ({ weeklyReview }) => {
  if (!weeklyReview) return null;

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
      <div className="flex items-center space-x-2 mb-3">
        <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
        <h4 className="font-semibold text-gray-900 dark:text-white">Weekly Learning Review</h4>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
              Areas to Improve:
            </h5>
            <div className="flex flex-wrap gap-1">
              {weeklyReview.weakSkills.map((skill, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <Star className="w-4 h-4 text-green-500 mr-1" />
              Strong Areas:
            </h5>
            <div className="flex flex-wrap gap-1">
              {weeklyReview.strongSkills.map((skill, index) => (
                <Badge key={index} className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Next Week's Focus:</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {weeklyReview.focusAreas.map((area, index) => (
              <div key={index} className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                <Target className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReviewDisplay;
