import React, { useState } from 'react';
import { Edit3, Save, X, Plus, Award, Zap, Calendar, TrendingUp, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { techSkills, proficiencyLevels } from '../data/mockData';
import { SkillWithProficiency } from '../context/AppContext';
import Navigation from '../components/Navigation';

const Profile = () => {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  const handleSave = () => {
    if (editedUser) {
      dispatch({ type: 'UPDATE_USER', payload: editedUser });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(state.user);
    setIsEditing(false);
    setSearchTerm('');
    setCustomSkill('');
    setShowCustomInput(false);
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

  const addSkillToHave = (skillName: string, proficiency: string) => {
    if (editedUser && !editedUser.skillsHave.some(s => s.name === skillName)) {
      const newSkill: SkillWithProficiency = { name: skillName, proficiency: proficiency as any };
      setEditedUser({
        ...editedUser,
        skillsHave: [...editedUser.skillsHave, newSkill],
        skillsWant: editedUser.skillsWant.filter(s => s.name !== skillName)
      });
    }
  };

  const addSkillToWant = (skillName: string, proficiency: string) => {
    if (editedUser && !editedUser.skillsWant.some(s => s.name === skillName)) {
      const newSkill: SkillWithProficiency = { name: skillName, proficiency: proficiency as any };
      setEditedUser({
        ...editedUser,
        skillsWant: [...editedUser.skillsWant, newSkill],
        skillsHave: editedUser.skillsHave.filter(s => s.name !== skillName)
      });
    }
  };

  const removeSkillFromHave = (skillName: string) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        skillsHave: editedUser.skillsHave.filter(s => s.name !== skillName)
      });
    }
  };

  const removeSkillFromWant = (skillName: string) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        skillsWant: editedUser.skillsWant.filter(s => s.name !== skillName)
      });
    }
  };

  const handleAddCustomSkill = (proficiency: string, type: 'have' | 'want') => {
    if (customSkill.trim()) {
      if (type === 'have') {
        addSkillToHave(customSkill.trim(), proficiency);
      } else {
        addSkillToWant(customSkill.trim(), proficiency);
      }
      setCustomSkill('');
      setShowCustomInput(false);
    }
  };

  const filteredSkills = techSkills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !editedUser?.skillsHave.some(s => s.name === skill) &&
    !editedUser?.skillsWant.some(s => s.name === skill)
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <img
                  src={state.user.avatar}
                  alt={state.user.name}
                  className="w-24 h-24 rounded-full border-4 border-purple-100"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{state.user.name}</h1>
                  <p className="text-gray-600 mb-4">{state.user.email}</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="text-blue-500" size={20} />
                      <span className="text-gray-700">Level {state.user.level}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="text-yellow-500" size={20} />
                      <span className="text-gray-700">{state.user.xp} XP</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-orange-500" size={20} />
                      <span className="text-gray-700">🔥 {state.user.streak} days</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={editedUser?.name || ''}
                    onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={editedUser?.bio || ''}
                    onChange={(e) => setEditedUser(prev => prev ? { ...prev, bio: e.target.value } : null)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={editedUser?.timezone || ''}
                    onChange={(e) => setEditedUser(prev => prev ? { ...prev, timezone: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="PST">PST (Pacific)</option>
                    <option value="MST">MST (Mountain)</option>
                    <option value="CST">CST (Central)</option>
                    <option value="EST">EST (Eastern)</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 mb-4">{state.user.bio}</p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Timezone:</span> {state.user.timezone}
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Skills I Can Teach */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="mr-3 text-green-500" size={24} />
                Skills I Can Teach ({isEditing ? editedUser?.skillsHave.length : state.user.skillsHave.length})
              </h2>
              
              <div className="space-y-3 mb-4">
                {(isEditing ? editedUser?.skillsHave : state.user.skillsHave)?.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-green-800">{skill.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(skill.proficiency)}`}>
                        {getProficiencyBadge(skill.proficiency)} {skill.proficiency}
                      </span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeSkillFromHave(skill.name)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Add teaching skills:</h3>
                  
                  {/* Search */}
                  <div className="mb-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Search tech skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Custom Skill Input */}
                  {showCustomInput && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <input
                        type="text"
                        placeholder="Enter custom skill..."
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <div className="flex flex-wrap gap-2">
                        {proficiencyLevels.map((level) => (
                          <button
                            key={level.value}
                            onClick={() => handleAddCustomSkill(level.value, 'have')}
                            disabled={!customSkill.trim()}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getProficiencyColor(level.value)} hover:opacity-80`}
                          >
                            Add as {level.label}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          setShowCustomInput(false);
                          setCustomSkill('');
                        }}
                        className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {/* Add Custom Skill Button */}
                  {!showCustomInput && (
                    <button
                      onClick={() => setShowCustomInput(true)}
                      className="w-full mb-3 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add custom skill</span>
                    </button>
                  )}

                  {/* Available Skills */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredSkills.slice(0, 5).map((skill) => (
                      <div key={skill} className="p-2 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800">{skill}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {proficiencyLevels.map((level) => (
                            <button
                              key={level.value}
                              onClick={() => addSkillToHave(skill, level.value)}
                              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${getProficiencyColor(level.value)} hover:opacity-80`}
                              title={level.description}
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Skills I Want to Learn */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="mr-3 text-blue-500" size={24} />
                Skills I Want to Learn ({isEditing ? editedUser?.skillsWant.length : state.user.skillsWant.length})
              </h2>
              
              <div className="space-y-3 mb-4">
                {(isEditing ? editedUser?.skillsWant : state.user.skillsWant)?.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-blue-800">{skill.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(skill.proficiency)}`}>
                        Target: {getProficiencyBadge(skill.proficiency)} {skill.proficiency}
                      </span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeSkillFromWant(skill.name)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Add learning goals:</h3>
                  
                  {/* Available Skills for Learning */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredSkills.slice(0, 5).map((skill) => (
                      <div key={skill} className="p-2 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800">{skill}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {proficiencyLevels.map((level) => (
                            <button
                              key={level.value}
                              onClick={() => addSkillToWant(skill, level.value)}
                              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${getProficiencyColor(level.value)} hover:opacity-80`}
                              title={level.description}
                            >
                              Target: {level.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Award className="mr-3 text-yellow-500" size={24} />
              Achievements & Badges ({state.user.badges.length})
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.user.badges.map((badge) => (
                <div key={badge.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{badge.icon}</span>
                    <h3 className="font-semibold text-gray-800">{badge.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  <p className="text-xs text-gray-500">
                    Earned on {badge.unlockedAt.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;