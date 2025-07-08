
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart } from 'lucide-react';

interface WeeklyStats {
  totalLessons: number;
  totalTimeSpent: number;
  strongSkills: string[];
}

interface WeeklyStatsOverviewProps {
  weeklyStats: WeeklyStats | null;
  onGenerateWeeklyReview: () => void;
  isLoadingAI: boolean;
}

const WeeklyStatsOverview: React.FC<WeeklyStatsOverviewProps> = ({
  weeklyStats,
  onGenerateWeeklyReview,
  isLoadingAI
}) => {
  if (!weeklyStats) return null;

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">This Week's Progress</h3>
        </div>
        <Button
          onClick={onGenerateWeeklyReview}
          disabled={isLoadingAI}
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <BarChart className="w-4 h-4 mr-2" />
          Get AI Review
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{weeklyStats.totalLessons}</div>
          <div className="text-gray-600 dark:text-gray-300">Lessons Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{Math.round(weeklyStats.totalTimeSpent / 60)}h</div>
          <div className="text-gray-600 dark:text-gray-300">Study Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{weeklyStats.strongSkills.length}</div>
          <div className="text-gray-600 dark:text-gray-300">Strong Skills</div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStatsOverview;
