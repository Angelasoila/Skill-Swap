
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Settings, Bell, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const isLoggedIn = false; // This will be connected to auth later

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/skills" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                location.pathname === '/skills' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              My Skills
            </Link>
            <Link 
              to="/exchange" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                location.pathname === '/exchange' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Exchange
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" className="p-2">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Settings className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
