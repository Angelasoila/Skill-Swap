import React from 'react';
import { X, MessageCircle, Star, Zap, TrendingUp, Calendar, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { User } from '../context/AppContext';

interface UserProfileCardProps {
  user: User;
  compatibility: number;
  sharedSkills: string[];
  onClose: () => void;
  onStartChat: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  compatibility,
  sharedSkills,
  onClose,
  onStartChat
}) => {
  const { state } = useApp();

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

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-purple-200"
              />
              <div>
                <h2 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {user.name}
                </h2>
                <div className="flex items-center space-x-3 mt-1">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCompatibilityColor(compatibility)}`}>
                    <Star className="inline w-4 h-4 mr-1" />
                    {compatibility}% match
                  </div>
                  <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user.timezone}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                state.darkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={`text-center p-3 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <TrendingUp className="mx-auto mb-2 text-blue-500" size={24} />
              <div className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {user.level}
              </div>
              <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Level
              </div>
            </div>
            <div className={`text-center p-3 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Zap className="mx-auto mb-2 text-yellow-500" size={24} />
              <div className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {user.xp}
              </div>
              <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                XP
              </div>
            </div>
            <div className={`text-center p-3 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Calendar className="mx-auto mb-2 text-orange-500" size={24} />
              <div className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {user.streak}
              </div>
              <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Day Streak
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="mb-6">
              <h3 className={`font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                About
              </h3>
              <p className={state.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {user.bio}
              </p>
            </div>
          )}

          {/* Skills Exchange */}
          <div className="mb-6">
            <h3 className={`font-semibold mb-3 ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
              Skills Exchange
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* They can teach you */}
              <div>
                <h4 className={`text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  They can teach you:
                </h4>
                <div className="space-y-2">
                  {user.skillsHave
                    .filter(skill => state.user?.skillsWant.some(s => s.name === skill.name))
                    .map((skill) => (
                      <div key={skill.name} className={`flex items-center justify-between p-2 rounded-lg ${state.darkMode ? 'bg-green-800' : 'bg-green-50'}`}>
                        <span className={`font-medium ${state.darkMode ? 'text-green-300' : 'text-green-800'}`}>
                          {skill.name}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(skill.proficiency)}`}>
                          {getProficiencyBadge(skill.proficiency)} {skill.proficiency}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* You can teach them */}
              <div>
                <h4 className={`text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  You can teach them:
                </h4>
                <div className="space-y-2">
                  {state.user?.skillsHave
                    .filter(skill => user.skillsWant.some(s => s.name === skill.name))
                    .map((skill) => (
                      <div key={skill.name} className={`flex items-center justify-between p-2 rounded-lg ${state.darkMode ? 'bg-blue-800' : 'bg-blue-50'}`}>
                        <span className={`font-medium ${state.darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                          {skill.name}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(skill.proficiency)}`}>
                          {getProficiencyBadge(skill.proficiency)} {skill.proficiency}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          {user.badges && user.badges.length > 0 && (
            <div className="mb-6">
              <h3 className={`font-semibold mb-3 ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                Recent Achievements
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.badges.slice(0, 6).map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${state.darkMode ? 'bg-yellow-800' : 'bg-yellow-50'}`}
                    title={badge.description}
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <span className={`text-sm font-medium ${state.darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Match Analysis */}
          <div className={`p-4 rounded-lg mb-6 ${state.darkMode ? 'bg-purple-900' : 'bg-purple-50'}`}>
            <h3 className={`font-semibold mb-2 ${state.darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
              🤖 AI Match Analysis
            </h3>
            <p className={`text-sm ${state.darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
              This is an excellent match! You both have complementary skills that create a perfect learning exchange. 
              {user.name} can help accelerate your progress in {sharedSkills.slice(0, 2).join(' and ')}, 
              while you can share your expertise in areas they're looking to improve.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onStartChat}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <MessageCircle size={20} />
              <span>Start Conversation</span>
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                state.darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;