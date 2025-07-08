
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';
import { PracticeQuestion } from '@/types/learning';

interface PersonalizedQuestionsProps {
  practiceQuestions: PracticeQuestion[];
}

const PersonalizedQuestions: React.FC<PersonalizedQuestionsProps> = ({ practiceQuestions }) => {
  if (practiceQuestions.length === 0) return null;

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
        <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
        Personalized Practice Questions
      </h4>
      <div className="space-y-3">
        {practiceQuestions.map((question) => (
          <Card key={question.id} className="p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-700/50">
            <div className="flex items-start justify-between mb-2">
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {question.topic}
              </Badge>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{question.question}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedQuestions;
