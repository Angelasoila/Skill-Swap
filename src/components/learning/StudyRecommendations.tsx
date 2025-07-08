
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, BookOpen } from 'lucide-react';
import { StudyRecommendation } from '@/types/learning';

interface StudyRecommendationsProps {
  studyRecommendations: StudyRecommendation[];
}

const StudyRecommendations: React.FC<StudyRecommendationsProps> = ({ studyRecommendations }) => {
  if (studyRecommendations.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
        <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
        Personalized Study Recommendations
      </h4>
      <div className="space-y-3">
        {studyRecommendations.map((rec) => (
          <Card key={rec.id} className="p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-700/50">
            <div className="flex items-start justify-between mb-2">
              <h5 className="font-medium text-gray-900 dark:text-white">{rec.title}</h5>
              <div className="flex space-x-2">
                <Badge 
                  className={
                    rec.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                  }
                >
                  {rec.priority}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{rec.description}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {rec.estimatedTime}
              </span>
              <span className="flex items-center">
                <BookOpen className="w-3 h-3 mr-1" />
                {rec.skillArea}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyRecommendations;
