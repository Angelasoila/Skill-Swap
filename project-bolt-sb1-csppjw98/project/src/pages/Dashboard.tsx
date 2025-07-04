import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, TrendingUp, Target, Award, Calendar, Book } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockSkills } from '../data/mockData';
import Navigation from '../components/Navigation';
import AIMatchingSection from '../components/AIMatchingSection';
import LearningGoalsSection from '../components/LearningGoalsSection';

const Dashboard = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/');
    }
  }, [state.isAuthenticated, navigate]);

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  const completedLessons = Object.values(state.userProgress).reduce((sum, progress) => sum + progress, 0);
  const totalAvailableLessons = mockSkills
    .filter(skill => state.user!.skillsWant.some(s => s.name === skill.name))
    .reduce((sum, skill) => sum + skill.totalLessons, 0);

  const progressPercentage = totalAvailableLessons > 0 ? (completedLessons / totalAvailableLessons) * 100 : 0;

  const todaysGoal = 3; // Lessons
  const completedToday = 1; // Mock data

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'junior': return 'text-yellow-600';
      case 'intermediate': return 'text-blue-600';
      case 'senior': return 'text-purple-600';
      default: return 'text-gray-600';
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

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            Welcome back, {state.user.name}! 👋
          </h1>
          <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-yellow-500" size={24} />
              <span className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {state.user.xp}
              </span>
            </div>
            <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total XP</p>
          </div>

          <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-green-500" size={24} />
              <span className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {state.user.level}
              </span>
            </div>
            <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Level</p>
          </div>

          <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-between mb-2">
              <Target className="text-blue-500" size={24} />
              <span className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {completedLessons}
              </span>
            </div>
            <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lessons Done</p>
          </div>

          <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-between mb-2">
              <Award className="text-purple-500" size={24} />
              <span className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {state.user.badges.length}
              </span>
            </div>
            <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Badges Earned</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Goal */}
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-orange-500" size={24} />
                  <h2 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Today's Goal
                  </h2>
                </div>
                <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  🔥 {state.user.streak} day streak
                </div>
              </div>
              
              <div className="mb-4">
                <div className={`flex justify-between text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  <span>Complete {todaysGoal} lessons</span>
                  <span>{completedToday}/{todaysGoal}</span>
                </div>
                <div className={`w-full ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(completedToday / todaysGoal) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You're {todaysGoal - completedToday} lesson{todaysGoal - completedToday !== 1 ? 's' : ''} away from maintaining your streak!
              </p>
            </div>

            {/* AI Learning Goals Section */}
            <LearningGoalsSection />

            {/* Continue Learning */}
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h2 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center`}>
                <Book className="mr-3 text-blue-500" size={24} />
                Continue Learning
              </h2>
              
              <div className="space-y-4">
                {mockSkills
                  .filter(skill => state.user!.skillsWant.some(s => s.name === skill.name))
                  .slice(0, 3)
                  .map((skill) => {
                    const progress = state.userProgress[skill.id] || 0;
                    const progressPercent = (progress / skill.totalLessons) * 100;
                    const userSkill = state.user!.skillsWant.find(s => s.name === skill.name);
                    
                    return (
                      <div 
                        key={skill.id} 
                        className={`border ${state.darkMode ? 'border-gray-600 hover:border-purple-400' : 'border-gray-200 hover:border-purple-300'} rounded-lg p-4 transition-colors cursor-pointer`}
                        onClick={() => navigate(`/skill/${skill.id}`)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{skill.icon}</span>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                                  {skill.name}
                                </h3>
                                {userSkill && (
                                  <span className={`text-sm ${getProficiencyColor(userSkill.proficiency)}`}>
                                    {getProficiencyBadge(userSkill.proficiency)} {userSkill.proficiency}
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {skill.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {progress}/{skill.totalLessons}
                            </p>
                            <p className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              lessons
                            </p>
                          </div>
                        </div>
                        <div className={`w-full ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                          <div 
                            className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* AI Matching Section */}
            <AIMatchingSection />

            {/* Overall Progress */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold mb-2">{Math.round(progressPercentage)}%</div>
                <p className="text-purple-100">Overall Completion</p>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-purple-100 text-center">
                {completedLessons} of {totalAvailableLessons} lessons completed
              </p>
            </div>

            {/* Skills Overview */}
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h2 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Skills Overview
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className={`font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 flex items-center`}>
                    <span className="text-green-500 mr-2">🎯</span>
                    Teaching ({state.user.skillsHave.length})
                  </h3>
                  <div className="space-y-1">
                    {state.user.skillsHave.slice(0, 3).map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between text-sm">
                        <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {skill.name}
                        </span>
                        <span className={`${getProficiencyColor(skill.proficiency)} font-medium`}>
                          {getProficiencyBadge(skill.proficiency)} {skill.proficiency}
                        </span>
                      </div>
                    ))}
                    {state.user.skillsHave.length > 3 && (
                      <p className={`text-xs ${state.darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        +{state.user.skillsHave.length - 3} more
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className={`font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 flex items-center`}>
                    <span className="text-blue-500 mr-2">📚</span>
                    Learning ({state.user.skillsWant.length})
                  </h3>
                  <div className="space-y-1">
                    {state.user.skillsWant.slice(0, 3).map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between text-sm">
                        <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {skill.name}
                        </span>
                        <span className={`${getProficiencyColor(skill.proficiency)} font-medium`}>
                          Target: {getProficiencyBadge(skill.proficiency)} {skill.proficiency}
                        </span>
                      </div>
                    ))}
                    {state.user.skillsWant.length > 3 && (
                      <p className={`text-xs ${state.darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        +{state.user.skillsWant.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Badges */}
            <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h2 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Recent Badges
              </h2>
              <div className="space-y-3">
                {state.user.badges.slice(-3).map((badge) => (
                  <div key={badge.id} className={`flex items-center space-x-3 p-3 ${state.darkMode ? 'bg-yellow-900' : 'bg-yellow-50'} rounded-lg`}>
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h3 className={`font-medium ${state.darkMode ? 'text-yellow-300' : 'text-gray-800'}`}>
                        {badge.name}
                      </h3>
                      <p className={`text-sm ${state.darkMode ? 'text-yellow-200' : 'text-gray-600'}`}>
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Coach Message */}
            <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl p-6 text-white">
              <h2 className="text-lg font-semibold mb-3">🤖 Your AI Coach</h2>
              <p className="text-sm text-teal-100 mb-4">
                "Great progress this week, {state.user.name}! You're on track to reach {state.user.skillsWant[0]?.proficiency} level in {state.user.skillsWant[0]?.name}. 
                Ready to tackle that next lesson?"
              </p>
              <button className="bg-white text-teal-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-50 transition-colors">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;