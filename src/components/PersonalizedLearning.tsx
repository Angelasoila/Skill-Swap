
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import LearningFieldExplorer from './LearningFieldExplorer';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { WeeklyReview, PracticeQuestion, StudyRecommendation } from '@/types/learning';
import { mockAIResponses, userSkills, learningGoals } from '@/data/mockLearningData';

// Component imports
import AILearningAssistant from './learning/AILearningAssistant';
import WeeklyStatsOverview from './learning/WeeklyStatsOverview';
import PersonalizedQuestions from './learning/PersonalizedQuestions';
import StudyRecommendations from './learning/StudyRecommendations';
import WeeklyReviewDisplay from './learning/WeeklyReviewDisplay';
import UserSkillsSection from './learning/UserSkillsSection';
import LearningGoalsGrid from './learning/LearningGoalsGrid';
import ContinueLearningSection from './learning/ContinueLearningSection';

const PersonalizedLearning: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('web-development');
  const [showFieldExplorer, setShowFieldExplorer] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>([]);
  const [weeklyReview, setWeeklyReview] = useState<WeeklyReview | null>(null);
  const [studyRecommendations, setStudyRecommendations] = useState<StudyRecommendation[]>([]);
  
  const { saveForLater, startLearning, currentProgress, weeklyStats, updateWeeklySkills } = useLearningProgress();

  const getPersonalizedQuestions = async (): Promise<void> => {
    setIsLoadingAI(true);
    
    setTimeout(() => {
      const questions: PracticeQuestion[] = mockAIResponses.personalizedQuestions.map((questionText, index) => ({
        id: `pq-${Date.now()}-${index}`,
        question: questionText,
        difficulty: userSkills[index % userSkills.length]?.level || 'Intermediate',
        topic: userSkills[index % userSkills.length]?.skill || 'General',
        type: 'theoretical' as const
      }));

      setPracticeQuestions(questions);
      setIsLoadingAI(false);
      
      toast({
        title: "Personalized Questions Generated",
        description: `${questions.length} questions tailored to your skill level and weak areas`,
      });
    }, 1500);
  };

  const getStudyRecommendations = async (): Promise<void> => {
    setIsLoadingAI(true);
    
    setTimeout(() => {
      const recommendations: StudyRecommendation[] = mockAIResponses.studyRecommendations.map((rec, index) => ({
        id: `rec-${Date.now()}-${index}`,
        ...rec
      }));

      setStudyRecommendations(recommendations);
      setIsLoadingAI(false);
      
      toast({
        title: "Study Recommendations Ready",
        description: `${recommendations.length} personalized recommendations generated`,
      });
    }, 1500);
  };

  const generateWeeklyReview = async (): Promise<void> => {
    setIsLoadingAI(true);
    
    setTimeout(() => {
      const review: WeeklyReview = {
        ...mockAIResponses.weeklyReview,
        week: `Week of ${new Date().toLocaleDateString()}`
      };
      
      setWeeklyReview(review);
      updateWeeklySkills(review.weakSkills, review.strongSkills);
      setIsLoadingAI(false);
      
      toast({
        title: "Weekly Review Generated",
        description: "Your personalized weekly learning review is ready!",
      });
    }, 2000);
  };

  const handleStartLearning = (pathId: string): void => {
    const pathTitles: { [key: string]: string } = {
      'ds-fundamentals': 'Data Science Fundamentals',
      'machine-learning': 'Machine Learning Essentials',
      'deep-learning': 'Deep Learning & Neural Networks',
      'frontend-basics': 'Frontend Development Fundamentals',
      'react-mastery': 'React Development Mastery',
      'fullstack-journey': 'Full-Stack Development Journey',
      'ai-foundations': 'AI & Machine Learning Foundations',
      'nlp-specialization': 'Natural Language Processing',
      'react-native': 'React Native Development',
      'flutter-dev': 'Flutter Mobile Development'
    };
    
    startLearning(pathId, pathTitles[pathId] || 'Learning Path');
  };

  const handleSaveForLater = (pathId: string): void => {
    const pathTitles: { [key: string]: string } = {
      'ds-fundamentals': 'Data Science Fundamentals',
      'machine-learning': 'Machine Learning Essentials',
      'deep-learning': 'Deep Learning & Neural Networks',
      'frontend-basics': 'Frontend Development Fundamentals',
      'react-mastery': 'React Development Mastery',
      'fullstack-journey': 'Full-Stack Development Journey',
      'ai-foundations': 'AI & Machine Learning Foundations',
      'nlp-specialization': 'Natural Language Processing',
      'react-native': 'React Native Development',
      'flutter-dev': 'Flutter Mobile Development'
    };
    
    saveForLater(pathId, pathTitles[pathId] || 'Learning Path', selectedGoal);
  };

  const handleGoalSelect = (goalId: string): void => {
    setSelectedGoal(goalId);
    setShowFieldExplorer(true);
  };

  if (showFieldExplorer) {
    return (
      <div className="space-y-6">
        <Card className="p-6 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFieldExplorer(false)}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {learningGoals.find(g => g.id === selectedGoal)?.label} Learning Paths
                </h2>
              </div>
            </div>
          </div>

          <LearningFieldExplorer
            field={selectedGoal}
            onStartLearning={handleStartLearning}
            onSaveForLater={handleSaveForLater}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-6">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered Learning Path</h2>
        </div>

        <WeeklyStatsOverview 
          weeklyStats={weeklyStats}
          onGenerateWeeklyReview={generateWeeklyReview}
          isLoadingAI={isLoadingAI}
        />

        <AILearningAssistant
          isLoadingAI={isLoadingAI}
          setIsLoadingAI={setIsLoadingAI}
          onPersonalizedQuestions={getPersonalizedQuestions}
          onStudyRecommendations={getStudyRecommendations}
          onWeeklyReview={generateWeeklyReview}
          aiResponse={aiResponse}
          setAiResponse={setAiResponse}
        />

        <PersonalizedQuestions practiceQuestions={practiceQuestions} />

        <StudyRecommendations studyRecommendations={studyRecommendations} />

        <WeeklyReviewDisplay weeklyReview={weeklyReview} />

        <UserSkillsSection userSkills={userSkills} />

        <LearningGoalsGrid
          learningGoals={learningGoals}
          selectedGoal={selectedGoal}
          onGoalSelect={handleGoalSelect}
        />

        <ContinueLearningSection
          currentProgress={currentProgress}
          onStartLearning={handleStartLearning}
        />

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">AI Learning Insights</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {weeklyStats ? 
              `This week you completed ${weeklyStats.totalLessons} lessons in ${Math.round(weeklyStats.totalTimeSpent / 60)} hours. Focus on improving your weak areas for maximum progress next week.` :
              "Based on your progress and interests, we recommend focusing on intermediate React concepts. You're 73% ready for advanced topics."
            }
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PersonalizedLearning;
