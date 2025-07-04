import React from 'react';
import { MessageCircle, Zap, Calendar, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockMatches } from '../data/mockData';
import Navigation from '../components/Navigation';

const Matches = () => {
  const { state } = useApp();

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'junior': return 'bg-yellow-100 text-yellow-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'senior': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Smart Matches</h1>
            <p className="text-gray-600">AI-powered connections based on your learning goals and expertise levels</p>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white mb-8">
            <h2 className="text-xl font-semibold mb-3">🤖 AI Matching Algorithm</h2>
            <p className="text-purple-100 mb-4">
              Our AI analyzes your skill levels, learning goals, and teaching expertise to find perfect study partners. 
              Matches are optimized for mutual learning benefit and complementary skill exchange.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Skill Compatibility</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Proficiency Levels</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Learning Pace</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Time Zone</span>
            </div>
          </div>

          <div className="space-y-6">
            {mockMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={match.user.avatar}
                      alt={match.user.name}
                      className="w-16 h-16 rounded-full border-4 border-purple-100"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{match.user.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="text-yellow-500 fill-current" size={16} />
                            <span className="text-sm font-medium text-gray-700">{match.compatibility}%</span>
                          </div>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Perfect Match
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{match.user.bio}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Zap size={16} className="text-yellow-500" />
                          <span>{match.user.xp} XP (Level {match.user.level})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar size={16} className="text-blue-500" />
                          <span>{match.user.timezone}</span>
                        </div>
                        <div className="text-sm text-orange-600 font-medium">
                          🔥 {match.user.streak} day streak
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-3">Skills Exchange</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">They can teach you:</p>
                        <div className="flex flex-wrap gap-2">
                          {match.user.skillsHave
                            .filter(skill => state.user!.skillsWant.some(s => s.name === skill.name))
                            .map((skill) => (
                              <span key={skill.name} className={`px-3 py-1 rounded-full text-sm font-medium ${getProficiencyColor(skill.proficiency)}`}>
                                {skill.name} {getProficiencyBadge(skill.proficiency)} {skill.proficiency}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">You can teach them:</p>
                        <div className="flex flex-wrap gap-2">
                          {state.user.skillsHave
                            .filter(skill => match.user.skillsWant.some(s => s.name === skill.name))
                            .map((skill) => (
                              <span key={skill.name} className={`px-3 py-1 rounded-full text-sm font-medium ${getProficiencyColor(skill.proficiency)}`}>
                                {skill.name} {getProficiencyBadge(skill.proficiency)} {skill.proficiency}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-purple-800 mb-2">🎯 Why This Match Works</h4>
                    <p className="text-purple-700 text-sm">{match.reason}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-600">
                        Match Confidence: <span className="font-semibold text-purple-600">{match.compatibility}%</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                        View Profile
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <MessageCircle size={16} />
                        <span>Start Chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Find More Matches */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Looking for more matches?</h3>
              <p className="text-gray-600 mb-6">
                Our AI is constantly learning and finding new compatible study partners based on your updated skills and goals.
              </p>
              <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-all">
                Refresh Matches
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Matches;