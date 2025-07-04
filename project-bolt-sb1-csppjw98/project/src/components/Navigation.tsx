import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, MessageCircle, MessageSquare, User, Zap, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const location = useLocation();
  const { state, logout } = useApp();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/skills', icon: BookOpen, label: 'Skills' },
    { path: '/matches', icon: Users, label: 'Matches' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/forum', icon: MessageSquare, label: 'Forum' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const getProficiencyBadge = (proficiency: string) => {
    switch (proficiency) {
      case 'junior': return '🌱';
      case 'intermediate': return '⚡';
      case 'senior': return '🏆';
      default: return '';
    }
  };

  const navBgClass = state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textClass = state.darkMode ? 'text-gray-300' : 'text-gray-600';
  const activeClass = state.darkMode 
    ? 'bg-purple-600 text-white shadow-lg' 
    : 'bg-purple-600 text-white shadow-lg';
  const hoverClass = state.darkMode 
    ? 'hover:bg-gray-700 hover:text-purple-400' 
    : 'hover:bg-purple-50 hover:text-purple-600';

  return (
    <nav className={`${navBgClass} shadow-lg border-t border-gray-200 md:border-t-0 md:border-r`}>
      {/* Mobile Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${navBgClass} border-t z-50`}>
        <div className="flex justify-around items-center py-2 px-2">
          {navItems.slice(0, 5).map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-0 ${
                location.pathname === path
                  ? activeClass
                  : `${textClass} ${hoverClass}`
              }`}
            >
              <Icon size={18} />
              <span className="text-xs mt-1 truncate">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:flex-col md:w-64 md:min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="text-white" size={20} />
              </div>
              <h1 className={`text-xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                SkillSwap
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={logout}
                className={`p-2 rounded-lg transition-colors ${
                  state.darkMode
                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                }`}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {state.user && (
            <div className={`mb-8 p-4 rounded-lg ${
              state.darkMode 
                ? 'bg-gradient-to-r from-gray-700 to-gray-600' 
                : 'bg-gradient-to-r from-purple-50 to-blue-50'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={state.user.avatar}
                  alt={state.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="min-w-0 flex-1">
                  <p className={`font-medium truncate ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {state.user.name}
                  </p>
                  <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Level {state.user.level}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center space-x-1">
                  <Zap size={16} className="text-yellow-500" />
                  <span className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {state.user.xp} XP
                  </span>
                </div>
                <div className="text-orange-600 font-medium">
                  🔥 {state.user.streak} days
                </div>
              </div>
              
              {/* Skills Summary */}
              <div className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="mb-1">
                  <span className="font-medium">Teaching:</span> {state.user.skillsHave.length} skills
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {state.user.skillsHave.slice(0, 2).map((skill) => (
                    <span key={skill.name} className={`px-2 py-0.5 rounded text-xs truncate max-w-full ${
                      state.darkMode 
                        ? 'bg-green-800 text-green-300' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {skill.name} {getProficiencyBadge(skill.proficiency)}
                    </span>
                  ))}
                  {state.user.skillsHave.length > 2 && (
                    <span className={state.darkMode ? 'text-gray-500' : 'text-gray-500'}>
                      +{state.user.skillsHave.length - 2}
                    </span>
                  )}
                </div>
                <div className="mb-1">
                  <span className="font-medium">Learning:</span> {state.user.skillsWant.length} skills
                </div>
                <div className="flex flex-wrap gap-1">
                  {state.user.skillsWant.slice(0, 2).map((skill) => (
                    <span key={skill.name} className={`px-2 py-0.5 rounded text-xs truncate max-w-full ${
                      state.darkMode 
                        ? 'bg-blue-800 text-blue-300' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {skill.name} {getProficiencyBadge(skill.proficiency)}
                    </span>
                  ))}
                  {state.user.skillsWant.length > 2 && (
                    <span className={state.darkMode ? 'text-gray-500' : 'text-gray-500'}>
                      +{state.user.skillsWant.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  location.pathname === path
                    ? activeClass
                    : `${textClass} ${hoverClass}`
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;