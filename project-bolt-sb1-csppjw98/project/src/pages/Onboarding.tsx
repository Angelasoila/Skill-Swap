import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle, Plus, X, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { techSkills, proficiencyLevels } from '../data/mockData';
import { SkillWithProficiency } from '../context/AppContext';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [skillsHave, setSkillsHave] = useState<SkillWithProficiency[]>([]);
  const [skillsWant, setSkillsWant] = useState<SkillWithProficiency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const filteredSkills = techSkills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !skillsHave.some(s => s.name === skill) &&
    !skillsWant.some(s => s.name === skill)
  );

  const handleAddSkill = (skillName: string, proficiency: string, type: 'have' | 'want') => {
    const newSkill: SkillWithProficiency = {
      name: skillName,
      proficiency: proficiency as 'junior' | 'intermediate' | 'senior'
    };

    if (type === 'have') {
      setSkillsHave(prev => [...prev, newSkill]);
    } else {
      setSkillsWant(prev => [...prev, newSkill]);
    }
  };

  const handleRemoveSkill = (skillName: string, type: 'have' | 'want') => {
    if (type === 'have') {
      setSkillsHave(prev => prev.filter(s => s.name !== skillName));
    } else {
      setSkillsWant(prev => prev.filter(s => s.name !== skillName));
    }
  };

  const handleAddCustomSkill = (proficiency: string, type: 'have' | 'want') => {
    if (customSkill.trim()) {
      handleAddSkill(customSkill.trim(), proficiency, type);
      setCustomSkill('');
      setShowCustomInput(false);
    }
  };

  const handleComplete = () => {
    dispatch({
      type: 'UPDATE_USER',
      payload: { skillsHave, skillsWant }
    });
    navigate('/dashboard');
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'junior': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'intermediate': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'senior': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const SkillSelector = ({ 
    title, 
    description, 
    skills, 
    type, 
    onAdd, 
    onRemove 
  }: {
    title: string;
    description: string;
    skills: SkillWithProficiency[];
    type: 'have' | 'want';
    onAdd: (skill: string, proficiency: string) => void;
    onRemove: (skill: string) => void;
  }) => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{title}</h2>
      <p className="text-gray-600 mb-6 text-center">{description}</p>
      
      {/* Selected Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Selected Skills:</h3>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-green-200">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-800">{skill.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(skill.proficiency)}`}>
                    {skill.proficiency}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(skill.name)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
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
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <input
            type="text"
            placeholder="Enter custom skill..."
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="flex flex-wrap gap-2">
            {proficiencyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleAddCustomSkill(level.value, type)}
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
          className="w-full mb-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>Add custom skill</span>
        </button>
      )}

      {/* Available Skills */}
      <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
        {filteredSkills.slice(0, 10).map((skill) => (
          <div key={skill} className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-800">{skill}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {proficiencyLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => onAdd(skill, level.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${getProficiencyColor(level.value)} hover:opacity-80`}
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 max-h-screen overflow-y-auto">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-12 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`w-12 h-1 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to SkillSwap! 🎉</h1>
            <p className="text-lg text-gray-600 mb-8">
              Let's set up your tech profile so we can find the perfect learning partners for you.
            </p>
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl">
                💻
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-800 mb-2">🎯 How SkillSwap Works</h3>
              <div className="text-sm text-blue-700 space-y-2">
                <p>• Share your tech expertise and learn new skills from others</p>
                <p>• Get matched with developers based on complementary skills</p>
                <p>• Specify your proficiency level for better matching</p>
                <p>• Build your network while advancing your career</p>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>Get Started</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <SkillSelector
              title="What tech skills can you teach?"
              description="Select your areas of expertise and proficiency level"
              skills={skillsHave}
              type="have"
              onAdd={(skill, proficiency) => handleAddSkill(skill, proficiency, 'have')}
              onRemove={(skill) => handleRemoveSkill(skill, 'have')}
            />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={skillsHave.length === 0}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <SkillSelector
              title="What tech skills do you want to learn?"
              description="Choose skills you'd like to master and your target proficiency"
              skills={skillsWant}
              type="want"
              onAdd={(skill, proficiency) => handleAddSkill(skill, proficiency, 'want')}
              onRemove={(skill) => handleRemoveSkill(skill, 'want')}
            />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={skillsWant.length === 0}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;