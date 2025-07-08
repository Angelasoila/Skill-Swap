
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, MessageSquare, Heart, Share, Filter, CheckCircle } from 'lucide-react';
import { mockForumPosts, filterForumPostsByCategory, searchForumPosts } from '@/data/mockData';

const Forum = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'javascript', 'react', 'python', 'design', 'devops', 'machine-learning'];

  const getFilteredPosts = () => {
    let posts = filterForumPostsByCategory(selectedCategory);
    if (searchQuery.trim()) {
      posts = searchForumPosts(searchQuery);
      if (selectedCategory !== 'all') {
        posts = posts.filter(post => post.category === selectedCategory);
      }
    }
    return posts;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community Forum</h1>
            <p className="text-gray-600 dark:text-gray-300">Share knowledge and get help from the community</p>
          </div>
          <Button 
            onClick={() => setShowNewPost(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-6 dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize whitespace-nowrap"
                  >
                    {category.replace('-', ' ')}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="p-6 mb-6 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Create New Post</h2>
            <div className="space-y-4">
              <Input placeholder="Post title..." className="dark:bg-gray-700 dark:border-gray-600" />
              <Textarea placeholder="Write your post content..." rows={4} className="dark:bg-gray-700 dark:border-gray-600" />
              <div className="flex items-center justify-between">
                <Input placeholder="Tags (comma separated)" className="flex-1 mr-4 dark:bg-gray-700 dark:border-gray-600" />
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button>Post</Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {post.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{post.author}</h3>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{post.timestamp}</span>
                    {post.solved && (
                      <>
                        <span className="text-gray-500 text-sm">•</span>
                        <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Solved</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.replies} replies</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="p-12 text-center dark:bg-gray-800">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Forum;
