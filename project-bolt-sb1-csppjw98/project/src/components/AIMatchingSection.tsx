import React, { useState, useEffect } from 'react';
import { Users, Star, MessageCircle, Eye, Brain, Zap, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { matchingAPI } from '../services/api';
import { Match } from '../context/AppContext';
import UserProfileCard from './UserProfileCard';
import ChatBox from './ChatBox';

const AIMatchingSection = () => {
  const { state } = useApp();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Match | null>(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

  useEffect(() => {
    loadMatches();
    generateAIRecommendations();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const response = await matchingAPI.getMatches();
      setMatches(response.data.slice(0, 10)); // Top 10 matches
    } catch (error) {
      console.error('Failed to load matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIRecommendations = () => {
    if (!state.user) return;
    
    // AI-powered recommendations based on skill gaps
    const recommendations = [];
    
    if (state.user.skillsWant.length > 0) {
      const primarySkill = state.user.skillsWant[0].name;
      recommendations.push(`Focus on ${primarySkill} fundamentals to build a strong foundation`);
      recommendations.push(`Look for senior ${primarySkill} developers to accelerate your learning`);
    }
    
    if (state.user.skillsHave.length > 0) {
      const teachingSkill = state.user.skillsHave[0].name;
      recommendations.push(`Share your ${teachingSkill} expertise to reinforce your knowledge`);
    }
    
    setAiRecommendations(recommendations);
  };

  const handleLearnMore = (match: Match) => {
    setSelectedUser(match);
    setShowProfileCard(true);
  };

  const handleStartChat = (match: Match) => {
    setSelectedUser(match);
    setShowChatBox(true);
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
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
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${state.darkMode ? 'border-gray-700' : 'border-gray-100'} p-6`}>
      {/* AI Recommendations Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="text-purple-500" size={24} />
          <h2 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
            AI-Powered Matches
          </h2>
        </div>
        
        {aiRecommendations.length > 0 && (
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-4 text-white mb-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <Zap className="mr-2" size={16} />
              AI Recommendations
            </h3>
            <ul className="text-sm space-y-1">
              {aiRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className={`border ${state.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'} rounded-lg p-4 hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={match.user.avatar}
                  alt={match.user.name}
                  className="w-12 h-12 rounded-full border-2 border-purple-200"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {match.user.name}
                    </h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCompatibilityColor(match.compatibility)}`}>
                      <Star className="inline w-3 h-3 mr-1" />
                      {match.compatibility}% match
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <TrendingUp size={14} className="mr-1 text-blue-500" />
                      Level {match.user.level}
                    </span>
                    <span className="flex items-center">
                      <Zap size={14} className="mr-1 text-yellow-500" />
                      {match.user.xp} XP
                    </span>
                    <span className="text-orange-600">
                      🔥 {match.user.streak} days
                    </span>
                  </div>

                  {/* Shared Skills */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {match.sharedSkills.slice(0, 3).map((skill) => {
                      const userSkill = match.user.skillsHave.find(s => s.name === skill);
                      return (
                        <span
                          key={skill}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            state.darkMode 
                              ? 'bg-green-800 text-green-300' 
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {skill} {userSkill && getProficiencyBadge(userSkill.proficiency)}
                        </span>
                      );
                    })}
                    {match.sharedSkills.length > 3 && (
                      <span className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        +{match.sharedSkills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* AI Exchange Summary */}
                  <div className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>
                    💡 {match.reason}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleLearnMore(match)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    state.darkMode
                      ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Eye size={14} />
                  <span>Learn More</span>
                </button>
                <button
                  onClick={() => handleStartChat(match)}
                  className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>Add & Chat</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-8">
          <Users className={`mx-auto mb-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={48} />
          <h3 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            No matches found
          </h3>
          <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Update your skills to find compatible learning partners
          </p>
        </div>
      )}

      {/* Profile Card Modal */}
      {showProfileCard && selectedUser && (
        <UserProfileCard
          user={selectedUser.user}
          compatibility={selectedUser.compatibility}
          sharedSkills={selectedUser.sharedSkills}
          onClose={() => setShowProfileCard(false)}
          onStartChat={() => {
            setShowProfileCard(false);
            handleStartChat(selectedUser);
          }}
        />
      )}

      {/* Chat Box Modal */}
      {showChatBox && selectedUser && (
        <ChatBox
          user={selectedUser.user}
          onClose={() => setShowChatBox(false)}
        />
      )}
    </div>
  );
};

export default AIMatchingSection;