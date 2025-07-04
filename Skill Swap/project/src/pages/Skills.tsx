import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockSkills } from '../data/mockData';
import Navigation from '../components/Navigation';

const Skills = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  if (!state.isAuthenticated || !state.user) {
    navigate('/');
    return null;
  }

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Skills</h1>
            <p className="text-gray-600">Continue your learning journey and share your expertise</p>
          </div>

          {/* Skills I'm Learning */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <BookOpen className="mr-3 text-blue-500" size={24} />
              Learning ({state.user.skillsWant.length})
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mockSkills
                .filter(skill => state.user!.skillsWant.some(s => s.name === skill.name))
                .map((skill) => {
                  const progress = state.userProgress[skill.id] || 0;
                  const progressPercent = (progress / skill.totalLessons) * 100;
                  const isStarted = progress > 0;
                  const userSkill = state.user!.skillsWant.find(s => s.name === skill.name);
                  
                  return (
                    <div key={skill.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{skill.icon}</span>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
                                {userSkill && (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(userSkill.proficiency)}`}>
                                    {getProficiencyBadge(userSkill.proficiency)} Target: {userSkill.proficiency}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600">{skill.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">{progress}</div>
                            <div className="text-sm text-gray-500">/ {skill.totalLessons}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{Math.round(progressPercent)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`${skill.color} h-3 rounded-full transition-all duration-500`}
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <BookOpen size={16} className="mr-1" />
                              {skill.modules.length} modules
                            </span>
                            {progressPercent === 100 && (
                              <span className="flex items-center text-green-600">
                                <CheckCircle size={16} className="mr-1" />
                                Completed
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => navigate(`/skill/${skill.id}`)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                              isStarted
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                            }`}
                          >
                            <Play size={16} />
                            <span>{isStarted ? 'Continue' : 'Start'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Skills I Can Teach */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="mr-3 text-green-500" size={24} />
              Teaching ({state.user.skillsHave.length})
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mockSkills
                .filter(skill => state.user!.skillsHave.some(s => s.name === skill.name))
                .map((skill) => {
                  const userSkill = state.user!.skillsHave.find(s => s.name === skill.name);
                  
                  return (
                    <div key={skill.id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-3xl">{skill.icon}</span>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
                            {userSkill && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(userSkill.proficiency)}`}>
                                {getProficiencyBadge(userSkill.proficiency)} {userSkill.proficiency}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{skill.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center text-green-600">
                            <CheckCircle size={16} className="mr-1" />
                            Ready to teach
                          </span>
                        </div>
                        <button
                          onClick={() => navigate('/matches')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                          Find Students
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Explore More Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Explore More Skills</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mockSkills
                .filter(skill => 
                  !state.user!.skillsWant.some(s => s.name === skill.name) && 
                  !state.user!.skillsHave.some(s => s.name === skill.name)
                )
                .map((skill) => (
                  <div key={skill.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 opacity-75">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl grayscale">{skill.icon}</span>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
                          <p className="text-gray-600">{skill.description}</p>
                        </div>
                      </div>
                      <Lock className="text-gray-400" size={24} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {skill.totalLessons} lessons available
                      </div>
                      <button
                        onClick={() => navigate('/profile')}
                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Add to Goals
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;