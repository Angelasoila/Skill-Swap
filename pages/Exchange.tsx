import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { MessageSquare, Users, Search, Star, Clock, MapPin, Clock3, Sparkles, Brain, TrendingUp } from 'lucide-react';
import { mockLearningPartners, mockForumPosts } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Exchange = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const navigate = useNavigate();

  // AI-powered matching algorithm
  const calculateAIMatch = (partner: any) => {
    let score = partner.matchScore;
    
    // Boost score based on complementary skills
    const userWants = ['React', 'Node.js']; // Mock user skills
    const commonSkills = partner.teaches.filter((skill: string) => 
      userWants.some(want => want.toLowerCase().includes(skill.toLowerCase()))
    );
    score += commonSkills.length * 10;
    
    // Boost for similar experience levels
    if (partner.level && partner.level !== 'Beginner') score += 5;
    
    // Activity boost
    if (partner.online) score += 15;
    
    return Math.min(score, 100);
  };

  const filteredPartners = mockLearningPartners
    .map(partner => ({
      ...partner,
      aiMatchScore: calculateAIMatch(partner)
    }))
    .filter(partner => {
      const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.teaches.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        partner.wants.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSkill = skillFilter === 'all' || 
        partner.teaches.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
      
      const matchesLevel = levelFilter === 'all' || partner.level === levelFilter;
      
      return matchesSearch && matchesSkill && matchesLevel;
    })
    .sort((a, b) => b.aiMatchScore - a.aiMatchScore);

  const handleConnect = (partnerId: string, partnerName: string) => {
    // Navigate to chat with the partner
    navigate(`/chat?partner=${partnerId}&name=${partnerName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Knowledge Exchange</h1>
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">AI-powered matching • Connect, learn, and share with the SkillSwap community</p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search for skills, people, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 dark:bg-gray-800 dark:border-gray-700 transition-colors"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 dark:bg-gray-800">
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>AI Matches</span>
            </TabsTrigger>
            <TabsTrigger value="forum" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Community Forum</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered Matches</h2>
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>Sorted by compatibility</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredPartners.map((match, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:hover:bg-gray-750 border-l-4 border-l-purple-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center text-2xl">
                          {match.avatar}
                        </div>
                        {match.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg dark:text-white">{match.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm dark:text-gray-300">{match.rating}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{match.level || 'Intermediate'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{match.aiMatchScore}%</div>
                      </div>
                      <div className="text-xs text-gray-500">AI Match</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{match.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Clock3 className="w-4 h-4" />
                      <span>Responds {match.responseTime}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Can teach:</p>
                      <div className="flex flex-wrap gap-1">
                        {match.teaches.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full border border-green-200 dark:border-green-800">
                            {skill}
                          </span>
                        ))}
                        {match.teaches.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            +{match.teaches.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Learning:</p>
                      <div className="flex flex-wrap gap-1">
                        {match.wants.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full border border-blue-200 dark:border-blue-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${match.aiMatchScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      onClick={() => handleConnect(match.id || index.toString(), match.name)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Connect & Chat
                    </Button>
                    <Button variant="outline" size="sm" className="dark:border-gray-600 dark:hover:bg-gray-700">
                      View Profile
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forum" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Discussions</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Create Post
              </Button>
            </div>

            <div className="space-y-4">
              {mockForumPosts.slice(0, 4).map((post) => (
                <Card key={post.id} className="p-6 hover:shadow-md transition-shadow dark:bg-gray-800">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{post.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">by {post.author}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.timestamp}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">{post.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.replies} replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Exchange;
