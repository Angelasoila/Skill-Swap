import React, { useState } from 'react';
import { Send, Phone, Video, MoreHorizontal, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockMatches } from '../data/mockData';
import Navigation from '../components/Navigation';

const Chat = () => {
  const { state } = useApp();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  const conversations = mockMatches.map(match => ({
    id: match.id,
    user: match.user,
    lastMessage: 'Hey! Ready to start learning together?',
    timestamp: '2 hours ago',
    unread: true
  }));

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const mockMessages = [
    {
      id: '1',
      senderId: selectedConversation?.user.id || '',
      content: 'Hey! I saw we matched on React and Python. Ready to start learning together?',
      timestamp: new Date('2024-01-15T10:00:00'),
      isMe: false
    },
    {
      id: '2',
      senderId: state.user.id,
      content: 'Absolutely! I\'m excited to learn Python from you. Where should we start?',
      timestamp: new Date('2024-01-15T10:05:00'),
      isMe: true
    },
    {
      id: '3',
      senderId: selectedConversation?.user.id || '',
      content: 'Let\'s start with Python basics. I can create a shared practice session. What time works for you?',
      timestamp: new Date('2024-01-15T10:10:00'),
      isMe: false
    },
    {
      id: '4',
      senderId: state.user.id,
      content: 'Sounds perfect! I\'m free after 6 PM PST most days. And I can help you with React components in return!',
      timestamp: new Date('2024-01-15T10:15:00'),
      isMe: true
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-full md:w-80 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === conversation.id ? 'bg-purple-50 border-purple-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conversation.unread && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">{conversation.user.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-purple-600">Level {conversation.user.level}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-orange-600">🔥 {conversation.user.streak}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedConversation.user.avatar}
                      alt={selectedConversation.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedConversation.user.name}</h3>
                      <p className="text-sm text-green-600">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Phone size={20} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Video size={20} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isMe
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.isMe ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Start a Conversation</h3>
                <p className="text-gray-600">Select a chat to start messaging with your learning partners</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;