import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, BookOpen, Users, MessageCircle, Award, TrendingUp, Check, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { techSkills } from '../data/mockData';
import { SkillWithProficiency } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [skillsToLearn, setSkillsToLearn] = useState<string[]>([]);
  const [skillsToTeach, setSkillsToTeach] = useState<SkillWithProficiency[]>([]);
  const [selectedSkillForProficiency, setSelectedSkillForProficiency] = useState<string | null>(null);
  
  const { state, login, register } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      try {
        await login({ email: formData.email, password: formData.password });
        navigate('/dashboard');
      } catch (error) {
        // Error is handled in context
      }
    }
  };

  const handleSkillToLearnToggle = (skill: string) => {
    setSkillsToLearn(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSkillToTeachToggle = (skill: string) => {
    if (skillsToTeach.some(s => s.name === skill)) {
      setSkillsToTeach(prev => prev.filter(s => s.name !== skill));
    } else {
      setSelectedSkillForProficiency(skill);
    }
  };

  const handleProficiencySelect = (proficiency: 'junior' | 'intermediate' | 'senior') => {
    if (selectedSkillForProficiency) {
      setSkillsToTeach(prev => [...prev, { 
        name: selectedSkillForProficiency, 
        proficiency 
      }]);
      setSelectedSkillForProficiency(null);
    }
  };

  const handleSignup = async () => {
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        skillsHave: skillsToTeach,
        skillsWant: skillsToLearn.map(skill => ({ name: skill, proficiency: 'intermediate' as const }))
      };
      await register(userData);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled in context
    }
  };

  if (state.isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const themeClasses = state.darkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white';

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
            <div className="flex justify-center items-center space-x-3 flex-1 mb-4 sm:mb-0">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${state.darkMode ? 'bg-purple-600' : 'bg-white'} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Zap className={state.darkMode ? 'text-white' : 'text-purple-600'} size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">SkillSwap</h1>
            </div>
            <ThemeToggle />
          </div>
          <p className={`text-lg sm:text-xl ${state.darkMode ? 'text-gray-300' : 'text-blue-100'} max-w-2xl mx-auto px-4`}>
            Learn new skills and teach what you know. Connect with learners worldwide in a gamified learning experience.
          </p>
        </header>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Features Section */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'} rounded-xl p-4 sm:p-6`}>
                <BookOpen className="mb-3 text-yellow-300" size={28} />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Interactive Lessons</h3>
                <p className={`text-xs sm:text-sm ${state.darkMode ? 'text-gray-400' : 'text-blue-100'}`}>
                  Gamified modules with quizzes and real projects
                </p>
              </div>
              <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'} rounded-xl p-4 sm:p-6`}>
                <Users className="mb-3 text-green-300" size={28} />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Smart Matching</h3>
                <p className={`text-xs sm:text-sm ${state.darkMode ? 'text-gray-400' : 'text-blue-100'}`}>
                  AI-powered connections with compatible learners
                </p>
              </div>
              <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'} rounded-xl p-4 sm:p-6`}>
                <MessageCircle className="mb-3 text-pink-300" size={28} />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Live Collaboration</h3>
                <p className={`text-xs sm:text-sm ${state.darkMode ? 'text-gray-400' : 'text-blue-100'}`}>
                  Real-time chat and knowledge sharing
                </p>
              </div>
              <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'} rounded-xl p-4 sm:p-6`}>
                <Award className="mb-3 text-orange-300" size={28} />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Earn Rewards</h3>
                <p className={`text-xs sm:text-sm ${state.darkMode ? 'text-gray-400' : 'text-blue-100'}`}>
                  XP, badges, and streaks to track progress
                </p>
              </div>
            </div>

            <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'} rounded-xl p-4 sm:p-6`}>
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="text-green-300" size={24} />
                <h3 className="text-lg font-semibold">Popular Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['React', 'Python', 'UI/UX Design', 'Docker', 'Machine Learning'].map((skill) => (
                  <span
                    key={skill}
                    className={`${state.darkMode ? 'bg-gray-700' : 'bg-white/20'} px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Login/Register Form */}
          <div className={`${state.darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-2xl shadow-2xl p-6 sm:p-8 order-1 lg:order-2`}>
            {state.error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {state.error}
              </div>
            )}

            {isLogin ? (
              <>
                <div className="text-center mb-6">
                  <h2 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    Welcome Back!
                  </h2>
                  <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Continue your learning journey
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                        state.darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 bg-white text-gray-900'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                        state.darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 bg-white text-gray-900'
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state.loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {state.loading ? (
                      <Loader2 className="animate-spin mr-2" size={20} />
                    ) : null}
                    {state.loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>
              </>
            ) : (
              <>
                {step === 1 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className={`text-xl sm:text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                        Basic Information
                      </h2>
                    </div>

                    <form className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                            state.darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'border-gray-300 bg-white text-gray-900'
                          }`}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                            state.darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'border-gray-300 bg-white text-gray-900'
                          }`}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Password
                          </label>
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                              state.darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                : 'border-gray-300 bg-white text-gray-900'
                            }`}
                            placeholder="Create a password"
                            required
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                              state.darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                : 'border-gray-300 bg-white text-gray-900'
                            }`}
                            placeholder="Confirm your password"
                            required
                          />
                        </div>
                      </div>
                    </form>

                    <div className="mt-6">
                      <h3 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
                        What would you like to learn?
                      </h3>
                      <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                        Select skills you want to master
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {techSkills.slice(0, 15).map((skill) => (
                          <button
                            key={skill}
                            onClick={() => handleSkillToLearnToggle(skill)}
                            className={`p-2 text-xs sm:text-sm rounded-lg border-2 transition-all ${
                              skillsToLearn.includes(skill)
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : state.darkMode
                                ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-blue-400'
                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300'
                            }`}
                          >
                            {skillsToLearn.includes(skill) && <Check size={12} className="inline mr-1" />}
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!formData.name || !formData.email || !formData.password || skillsToLearn.length === 0}
                      className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next: What can you teach?
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className={`text-xl sm:text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                        What can you teach?
                      </h2>
                      <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Select skills you can help others with
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto mb-6">
                      {techSkills.slice(0, 15).map((skill) => {
                        const isSelected = skillsToTeach.some(s => s.name === skill);
                        return (
                          <button
                            key={skill}
                            onClick={() => handleSkillToTeachToggle(skill)}
                            className={`p-2 text-xs sm:text-sm rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : state.darkMode
                                ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-green-400'
                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-green-300'
                            }`}
                          >
                            {isSelected && <Check size={12} className="inline mr-1" />}
                            {skill}
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Teaching Skills */}
                    {skillsToTeach.length > 0 && (
                      <div className="mb-6">
                        <h3 className={`font-medium ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
                          Your Teaching Skills:
                        </h3>
                        <div className="space-y-2">
                          {skillsToTeach.map((skill) => (
                            <div key={skill.name} className={`flex items-center justify-between p-3 rounded-lg border ${
                              state.darkMode ? 'border-gray-600 bg-gray-700' : 'border-green-200 bg-green-50'
                            }`}>
                              <span className={`font-medium text-sm ${state.darkMode ? 'text-white' : 'text-green-800'}`}>
                                {skill.name}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                skill.proficiency === 'senior' 
                                  ? 'bg-purple-100 text-purple-700'
                                  : skill.proficiency === 'intermediate'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {skill.proficiency === 'senior' ? '🏆' : skill.proficiency === 'intermediate' ? '⚡' : '🌱'} {skill.proficiency}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={() => setStep(1)}
                        className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                          state.darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSignup}
                        disabled={skillsToTeach.length === 0 || state.loading}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {state.loading ? (
                          <Loader2 className="animate-spin mr-2" size={20} />
                        ) : null}
                        {state.loading ? 'Creating Account...' : 'Create My Account'}
                      </button>
                    </div>

                    <div className={`mt-4 p-3 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="terms" className="rounded" />
                        <label htmlFor="terms" className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          I agree to the <span className="text-blue-600">Terms of Service</span> and <span className="text-blue-600">Privacy Policy</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Proficiency Selection Modal */}
            {selectedSkillForProficiency && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full`}>
                  <h3 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                    Select your proficiency in {selectedSkillForProficiency}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { level: 'junior', label: 'Junior', desc: '0-2 years experience', icon: '🌱' },
                      { level: 'intermediate', label: 'Intermediate', desc: '2-5 years experience', icon: '⚡' },
                      { level: 'senior', label: 'Senior', desc: '5+ years experience', icon: '🏆' }
                    ].map(({ level, label, desc, icon }) => (
                      <button
                        key={level}
                        onClick={() => handleProficiencySelect(level as any)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          state.darkMode 
                            ? 'border-gray-600 bg-gray-700 hover:border-purple-400 text-white' 
                            : 'border-gray-200 hover:border-purple-300 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{icon}</span>
                          <div>
                            <div className={`font-medium ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {label}
                            </div>
                            <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedSkillForProficiency(null)}
                    className={`w-full mt-4 py-2 rounded-lg transition-colors ${
                      state.darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setStep(1);
                    setSkillsToLearn([]);
                    setSkillsToTeach([]);
                  }}
                  className="ml-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;