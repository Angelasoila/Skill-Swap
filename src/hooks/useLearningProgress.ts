
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface SavedPath {
  id: string;
  title: string;
  savedAt: string;
  field: string;
}

interface LearningProgress {
  pathId: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  xp: number;
  lastAccessed: string;
  weeklyProgress?: {
    week: string;
    lessonsCompleted: number;
    timeSpent: number;
    weakSkills: string[];
    strongSkills: string[];
  };
}

interface WeeklyStats {
  currentWeek: string;
  totalLessons: number;
  totalTimeSpent: number;
  weakSkills: string[];
  strongSkills: string[];
  improvementAreas: string[];
}

export const useLearningProgress = () => {
  const [savedPaths, setSavedPaths] = useState<SavedPath[]>([]);
  const [currentProgress, setCurrentProgress] = useState<LearningProgress[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);

  useEffect(() => {
    // Load saved data from localStorage
    const saved = localStorage.getItem('skillswap_saved_paths');
    const progress = localStorage.getItem('skillswap_learning_progress');
    const weekly = localStorage.getItem('skillswap_weekly_stats');
    
    if (saved) {
      setSavedPaths(JSON.parse(saved));
    }
    if (progress) {
      setCurrentProgress(JSON.parse(progress));
    }
    if (weekly) {
      setWeeklyStats(JSON.parse(weekly));
    } else {
      // Initialize weekly stats
      const currentWeek = new Date().toISOString().slice(0, 10);
      const initialStats: WeeklyStats = {
        currentWeek,
        totalLessons: 0,
        totalTimeSpent: 0,
        weakSkills: [],
        strongSkills: [],
        improvementAreas: []
      };
      setWeeklyStats(initialStats);
      localStorage.setItem('skillswap_weekly_stats', JSON.stringify(initialStats));
    }
  }, []);

  const saveForLater = (pathId: string, title: string, field: string): void => {
    const newSavedPath: SavedPath = {
      id: pathId,
      title,
      savedAt: new Date().toISOString(),
      field
    };

    const isAlreadySaved = savedPaths.some(path => path.id === pathId);
    if (isAlreadySaved) {
      toast({
        title: "Already Saved",
        description: "This learning path is already in your saved list.",
      });
      return;
    }

    const updatedSaved = [...savedPaths, newSavedPath];
    setSavedPaths(updatedSaved);
    localStorage.setItem('skillswap_saved_paths', JSON.stringify(updatedSaved));

    toast({
      title: "Saved for Later",
      description: `"${title}" has been added to your saved learning paths.`,
    });
  };

  const startLearning = (pathId: string, title: string): void => {
    const existingProgress = currentProgress.find(p => p.pathId === pathId);
    
    if (existingProgress) {
      // Continue existing learning
      const updatedProgress = currentProgress.map(p =>
        p.pathId === pathId
          ? { ...p, lastAccessed: new Date().toISOString() }
          : p
      );
      setCurrentProgress(updatedProgress);
      localStorage.setItem('skillswap_learning_progress', JSON.stringify(updatedProgress));
      
      toast({
        title: "Continuing Learning",
        description: `Resuming "${title}" from ${existingProgress.progress}% completion.`,
      });
    } else {
      // Start new learning path
      const newProgress: LearningProgress = {
        pathId,
        progress: 0,
        completedLessons: 0,
        totalLessons: 20, // Default, would come from API
        xp: 0,
        lastAccessed: new Date().toISOString(),
        weeklyProgress: {
          week: new Date().toISOString().slice(0, 10),
          lessonsCompleted: 0,
          timeSpent: 0,
          weakSkills: [],
          strongSkills: []
        }
      };
      
      const updatedProgress = [...currentProgress, newProgress];
      setCurrentProgress(updatedProgress);
      localStorage.setItem('skillswap_learning_progress', JSON.stringify(updatedProgress));
      
      toast({
        title: "Learning Started",
        description: `Welcome to "${title}"! Your learning journey begins now.`,
      });
    }
  };

  const updateProgress = (pathId: string, progress: number, xpGained: number = 0): void => {
    const updatedProgress = currentProgress.map(p =>
      p.pathId === pathId
        ? {
            ...p,
            progress,
            completedLessons: Math.floor((progress / 100) * p.totalLessons),
            xp: p.xp + xpGained,
            lastAccessed: new Date().toISOString(),
            weeklyProgress: p.weeklyProgress ? {
              ...p.weeklyProgress,
              lessonsCompleted: p.weeklyProgress.lessonsCompleted + 1,
              timeSpent: p.weeklyProgress.timeSpent + 30 // Assume 30 mins per lesson
            } : undefined
          }
        : p
    );
    setCurrentProgress(updatedProgress);
    localStorage.setItem('skillswap_learning_progress', JSON.stringify(updatedProgress));

    // Update weekly stats
    if (weeklyStats) {
      const updatedWeeklyStats: WeeklyStats = {
        ...weeklyStats,
        totalLessons: weeklyStats.totalLessons + 1,
        totalTimeSpent: weeklyStats.totalTimeSpent + 30
      };
      setWeeklyStats(updatedWeeklyStats);
      localStorage.setItem('skillswap_weekly_stats', JSON.stringify(updatedWeeklyStats));
    }
  };

  const updateWeeklySkills = (weakSkills: string[], strongSkills: string[]): void => {
    if (weeklyStats) {
      const updatedStats: WeeklyStats = {
        ...weeklyStats,
        weakSkills,
        strongSkills,
        improvementAreas: weakSkills.slice(0, 3) // Top 3 areas to focus on
      };
      setWeeklyStats(updatedStats);
      localStorage.setItem('skillswap_weekly_stats', JSON.stringify(updatedStats));
    }
  };

  const removeSavedPath = (pathId: string): void => {
    const updatedSaved = savedPaths.filter(path => path.id !== pathId);
    setSavedPaths(updatedSaved);
    localStorage.setItem('skillswap_saved_paths', JSON.stringify(updatedSaved));
  };

  const continueLearning = (pathId: string): void => {
    const progress = currentProgress.find(p => p.pathId === pathId);
    if (progress) {
      // Navigate to learning interface - in a real app this would use router
      console.log(`Continuing learning for path: ${pathId}`);
      toast({
        title: "Continuing Learning",
        description: `Resuming your progress at ${progress.progress}% completion.`,
      });
    }
  };

  return {
    savedPaths,
    currentProgress,
    weeklyStats,
    saveForLater,
    startLearning,
    updateProgress,
    updateWeeklySkills,
    removeSavedPath,
    continueLearning
  };
};
