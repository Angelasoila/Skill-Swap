
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { BookOpen, CheckCircle, ArrowRight, ArrowLeft, Trophy, Clock } from 'lucide-react';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { toast } from '@/components/ui/use-toast';

interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  duration: number;
  completed: boolean;
}

const Learning: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateProgress } = useLearningProgress();
  
  const skillName = searchParams.get('skill') || 'Programming';
  const pathId = searchParams.get('pathId') || 'default-path';
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Introduction to ' + skillName,
      content: `Welcome to your ${skillName} learning journey! In this lesson, we'll cover the fundamentals and core concepts that will form the foundation of your expertise. This comprehensive introduction will prepare you for the advanced topics ahead.`,
      type: 'text',
      duration: 15,
      completed: false
    },
    {
      id: '2',
      title: 'Core Concepts',
      content: `Now let's dive deeper into the core concepts of ${skillName}. Understanding these principles is crucial for your success. We'll explore key terminology, best practices, and common patterns used by professionals in this field.`,
      type: 'text',
      duration: 20,
      completed: false
    },
    {
      id: '3',
      title: 'Practical Examples',
      content: `Time to see ${skillName} in action! We'll work through real-world examples that demonstrate how to apply what you've learned. These examples are carefully chosen to reinforce your understanding and build confidence.`,
      type: 'exercise',
      duration: 25,
      completed: false
    },
    {
      id: '4',
      title: 'Advanced Techniques',
      content: `Ready for the next level? In this lesson, we'll explore advanced techniques and professional tips that will set you apart. These insights come from industry experts and years of practical experience.`,
      type: 'text',
      duration: 30,
      completed: false
    },
    {
      id: '5',
      title: 'Final Assessment',
      content: `Let's test your knowledge! This comprehensive quiz will help you identify areas where you excel and topics that might need more attention. Don't worry - this is about learning, not just testing.`,
      type: 'quiz',
      duration: 20,
      completed: false
    }
  ]);

  const currentLesson = lessons[currentLessonIndex];
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const handleCompleteLesson = () => {
    const updatedLessons = lessons.map((lesson, index) => 
      index === currentLessonIndex ? { ...lesson, completed: true } : lesson
    );
    setLessons(updatedLessons);
    
    // Update progress in the learning system
    const newProgress = ((completedLessons + 1) / totalLessons) * 100;
    updateProgress(pathId, newProgress, 50); // 50 XP per lesson
    
    toast({
      title: "Lesson Completed! 🎉",
      description: `You earned 50 XP! Progress: ${Math.round(newProgress)}%`,
    });

    // Auto-advance to next lesson after a brief delay
    if (currentLessonIndex < totalLessons - 1) {
      setTimeout(() => {
        setCurrentLessonIndex(currentLessonIndex + 1);
      }, 1500);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'text': return '📖';
      case 'quiz': return '❓';
      case 'exercise': return '💻';
      default: return '📚';
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'text': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'quiz': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'exercise': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Learning: {skillName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Lesson {currentLessonIndex + 1} of {totalLessons}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/skills')}
            className="dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Back to Skills
          </Button>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-8 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Your Progress</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>{completedLessons * 50} XP earned</span>
            </div>
          </div>
          <Progress value={progressPercentage} className="mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {completedLessons} of {totalLessons} lessons completed ({Math.round(progressPercentage)}%)
          </p>
        </Card>

        {/* Current Lesson */}
        <Card className="p-8 mb-8 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{getLessonIcon(currentLesson.type)}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentLesson.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLessonTypeColor(currentLesson.type)}`}>
                    {currentLesson.type.charAt(0).toUpperCase() + currentLesson.type.slice(1)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentLesson.duration} min</span>
                  </div>
                </div>
              </div>
            </div>
            {currentLesson.completed && (
              <CheckCircle className="w-8 h-8 text-green-500" />
            )}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentLesson.content}
            </p>
          </div>

          {/* Lesson Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex === 0}
              className="dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-3">
              {!currentLesson.completed && (
                <Button
                  onClick={handleCompleteLesson}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Lesson
                </Button>
              )}
              
              <Button
                onClick={handleNextLesson}
                disabled={currentLessonIndex === totalLessons - 1}
                variant={currentLesson.completed ? "default" : "outline"}
                className={currentLesson.completed ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : "dark:border-gray-600 dark:hover:bg-gray-700"}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Lesson Navigation */}
        <Card className="p-6 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Course Outline</h3>
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  index === currentLessonIndex
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => setCurrentLessonIndex(index)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-lg">{getLessonIcon(lesson.type)}</div>
                  <div>
                    <h4 className="font-medium dark:text-white">{lesson.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{lesson.duration} min</span>
                      <span>•</span>
                      <span className="capitalize">{lesson.type}</span>
                    </div>
                  </div>
                </div>
                {lesson.completed && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Learning;
