
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import PersonalizedLearning from '@/components/PersonalizedLearning';
import AIAssistant from '@/components/AIAssistant';
import { BookOpen, Users, MessageSquare, TrendingUp, Award, Target, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Skills Learning', value: '12', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Practice Hours', value: '48', icon: Clock, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'XP Earned', value: '2,450', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { label: 'Achievements', value: '8', icon: Award, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' }
  ];

  const quickActions = [
    { 
      title: 'Browse Skills', 
      description: 'Explore available skills', 
      icon: BookOpen, 
      color: 'from-blue-500 to-cyan-500',
      onClick: () => navigate('/skills')
    },
    { 
      title: 'Find Partners', 
      description: 'Connect with learners', 
      icon: Users, 
      color: 'from-green-500 to-emerald-500',
      onClick: () => navigate('/exchange')
    },
    { 
      title: 'Join Discussions', 
      description: 'Participate in forums', 
      icon: MessageSquare, 
      color: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/forum')
    },
    { 
      title: 'Track Progress', 
      description: 'View your analytics', 
      icon: TrendingUp, 
      color: 'from-orange-500 to-red-500',
      onClick: () => navigate('/profile')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-colors duration-300">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl">👋</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to continue your learning journey? Let's make today productive!
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 border-gray-200 dark:border-gray-700 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className={`w-7 h-7 ${stat.color} dark:text-gray-300`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Assistant Section with better spacing */}
        <div className="mb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI Learning Assistant</h2>
            <p className="text-gray-600 dark:text-gray-300">Get personalized help with your learning journey</p>
          </div>
          <AIAssistant />
        </div>

        {/* Quick Actions with improved design */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quick Actions</h2>
            <p className="text-gray-600 dark:text-gray-300">Jump right into what you need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 dark:bg-gray-800 border-gray-200 dark:border-gray-700 group relative overflow-hidden"
                onClick={action.onClick}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{background: `linear-gradient(135deg, ${action.color.split(' ')[1]}, ${action.color.split(' ')[3]})`}}></div>
                <div className="relative text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Personalized Learning Section */}
        <PersonalizedLearning />
      </div>
    </div>
  );
};

export default Dashboard;
