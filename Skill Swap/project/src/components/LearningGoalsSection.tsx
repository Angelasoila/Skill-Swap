import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Play, Zap, Target, Brain, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { progressAPI } from '../services/api';
import { mockSkills } from '../data/mockData';

const LearningGoalsSection = () => {
  const { state, dispatch } = useApp();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [completingLesson, setCompletingLesson] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  useEffect(() => {
    loadProgress();
    generateAISuggestions();
  }, [state.user]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const response = await progressAPI.getProgress();
      setProgress(response.data);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAISuggestions = () => {
    if (!state.user) return;
    
    const suggestions = [];
    
    // AI-powered learning suggestions
    state.user.skillsWant.forEach((skill, index) => {
      const skillProgress = progress[skill.name.toLowerCase()] || 0;
      const totalLessons = mockSkills.find(s => s.name === skill.name)?.totalLessons || 10;
      const progressPercent = (skillProgress / totalLessons) * 100;
      
      if (index === 0) { // Primary learning goal
        if (progressPercent < 25) {
          suggestions.push(`Start with ${skill.name} fundamentals - consistency is key!`);
        } else if (progressPercent < 75) {
          suggestions.push(`You're making great progress in ${skill.name}. Focus on practical projects next.`);
        } else {
          suggestions.push(`Almost there with ${skill.name}! Consider teaching others to solidify your knowledge.`);
        }
      }
    });
    
    // General AI recommendations
    if (state.user.streak > 0) {
      suggestions.push(`🔥 Keep your ${state.user.streak}-day streak alive! Aim for at least one lesson today.`);
    } else {
      suggestions.push('Start a new learning streak today - even 15 minutes makes a difference!');
    }
    
    setAiSuggestions(suggestions);
  };

  const handleCompleteLesson = async (skillId: string, skillName: string) => {
    try {
      setCompletingLesson(skillId);
      
      // Simulate lesson completion with XP reward
      const xpReward = 50 + Math.floor(Math.random() * 50); // 50-100 XP
      
      const response = await progressAPI.completeLesson({
        skillId: skillId,
        xp: xpReward
      });
      
      // Update local progress
      setProgress(prev => ({
        ...prev,
        [skillId]: (prev[skillId] || 0) + 1
      }));
      
      // Update user XP and level
      dispatch({
        type: 'COMPLETE_LESSON',
        payload: { skillId, lessonId: `lesson-${Date.now()}`, xp: xpReward }
      });
      
      // Show success feedback
      console.log(`Lesson completed! +${xpReward} XP`);
      
    } catch (error) {
      console.error('Failed to complete lesson:', error);
    } finally {
      setCompletingLesson(null);
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'junior': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'intermediate': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'senior': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getProficiencyBadge = (proficiency: string) => {
    switch (proficiency) {
      case 'junior': return '🌱';
      case 'intermediate': return '⚡';
      case 'senior': return '🏆';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${state.darkMode ? 'border-gray-700' : 'border-gray-100'} p-6`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${state.darkMode ? 'border-gray-700' : 'border-gray-100'} p-6`}>
      {/* Header with AI Suggestions */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="text-blue-500" size={24} />
          <h2 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
            My Learning Goals
          </h2>
        </div>
        
        {aiSuggestions.length > 0 && (
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-4 text-white mb-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <Brain className="mr-2" size={16} />
              AI Learning Coach
            </h3>
            <ul className="text-sm space-y-1">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Learning Goals */}
      <div className="space-y-4">
        {state.user?.skillsWant.map((skill) => {
          const mockSkill = mockSkills.find(s => s.name === skill.name);
          const skillProgress = progress[mockSkill?.id || skill.name.toLowerCase()] || 0;
          const totalLessons = mockSkill?.totalLessons || 10;
          const progressPercent = (skillProgress / totalLessons) * 100;
          const isCompleted = progressPercent >= 100;
          
          return (
            <div
              key={skill.name}
              className={`border ${state.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'} rounded-lg p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{mockSkill?.icon || '📚'}</span>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {skill.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(skill.proficiency)}`}>
                        {getProficiencyBadge(skill.proficiency)} Target: {skill.proficiency}
                      </span>
                    </div>
                    <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {mockSkill?.description || 'Master this technology'}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {skillProgress}/{totalLessons}
                  </div>
                  <div className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    lessons
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Progress
                  </span>
                  <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className={`w-full ${state.darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-3`}>
                  <div 
                    className={`${mockSkill?.color || 'bg-blue-500'} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  {isCompleted ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle size={16} className="mr-1" />
                      Completed!
                    </span>
                  ) : (
                    <span className={`flex items-center ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <BookOpen size={16} className="mr-1" />
                      {totalLessons - skillProgress} lessons remaining
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {!isCompleted && (
                    <button
                      onClick={() => handleCompleteLesson(mockSkill?.id || skill.name.toLowerCase(), skill.name)}
                      disabled={completingLesson === (mockSkill?.id || skill.name.toLowerCase())}
                      className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {completingLesson === (mockSkill?.id || skill.name.toLowerCase()) ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Completing...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          <span>Mark Lesson Complete</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  <button
                    onClick={() => window.location.href = `/skill/${mockSkill?.id || skill.name.toLowerCase()}`}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      state.darkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Play size={16} />
                    <span>{skillProgress > 0 ? 'Continue' : 'Start'} Learning</span>
                  </button>
                </div>
              </div>

              {/* Next Lesson Suggestion */}
              {!isCompleted && (
                <div className={`mt-3 p-3 rounded-lg ${state.darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
                  <div className="flex items-center space-x-2">
                    <Brain size={16} className="text-blue-500" />
                    <span className={`text-sm font-medium ${state.darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                      AI Suggestion:
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${state.darkMode ? 'text-gray-300' : 'text-blue-600'}`}>
                    {progressPercent < 25 
                      ? `Start with ${skill.name} basics and build a strong foundation`
                      : progressPercent < 75 
                      ? `Practice ${skill.name} with hands-on projects to reinforce concepts`
                      : `You're almost done! Focus on advanced ${skill.name} topics and real-world applications`
                    }
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {state.user?.skillsWant.length === 0 && (
        <div className="text-center py-8">
          <Target className={`mx-auto mb-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={48} />
          <h3 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            No learning goals set
          </h3>
          <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Add skills you want to learn in your profile to get started
          </p>
          <button
            onClick={() => window.location.href = '/profile'}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Set Learning Goals
          </button>
        </div>
      )}
    </div>
  );
};

export default LearningGoalsSection;