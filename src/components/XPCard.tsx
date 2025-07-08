
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Zap, Target } from 'lucide-react';

interface XPCardProps {
  totalXP: number;
  dailyStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

const XPCard = ({ totalXP, dailyStreak, weeklyGoal, weeklyProgress }: XPCardProps) => {
  const weeklyPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Your Progress</h3>
          <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalXP.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total XP</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-lg">🔥</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{dailyStreak}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Day Streak</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyProgress}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Weekly XP</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Weekly Goal Progress</span>
            <span>{Math.round(weeklyPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${weeklyPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default XPCard;
