import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, Video, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { messagesAPI } from '../services/api';
import socketService from '../services/socket';
import { User, Message } from '../context/AppContext';

interface ChatBoxProps {
  user: User;
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ user, onClose }) => {
  const { state } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    setupSocketListeners();
    
    // Join the chat room
    if (state.user) {
      socketService.connect(state.user.id);
    }

    return () => {
      socketService.offNewMessage();
      socketService.offMessageSent();
    };
  }, [user.id, state.user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await messagesAPI.getMessages(user.id);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    socketService.onNewMessage((message: Message) => {
      if (message.senderId === user.id || message.receiverId === user.id) {
        setMessages(prev => [...prev, message]);
      }
    });

    socketService.onMessageSent((message: Message) => {
      setMessages(prev => [...prev, message]);
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !state.user || sending) return;

    try {
      setSending(true);
      
      const messageData = {
        senderId: state.user.id,
        receiverId: user.id,
        content: newMessage.trim()
      };

      // Send via socket for real-time delivery
      socketService.sendMessage(messageData);
      
      // Also send via API for persistence
      await messagesAPI.sendMessage({
        receiverId: user.id,
        content: newMessage.trim()
      });

      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl w-full max-w-2xl h-96 flex flex-col`}>
        {/* Chat Header */}
        <div className={`p-4 border-b ${state.darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {user.name}
              </h3>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-lg transition-colors ${
              state.darkMode
                ? 'text-gray-400 hover:text-purple-400 hover:bg-gray-700'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}>
              <Phone size={20} />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              state.darkMode
                ? 'text-gray-400 hover:text-purple-400 hover:bg-gray-700'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}>
              <Video size={20} />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              state.darkMode
                ? 'text-gray-400 hover:text-purple-400 hover:bg-gray-700'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}>
              <MoreHorizontal size={20} />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                state.darkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className={`text-4xl mb-2`}>👋</div>
                <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Start your conversation with {user.name}
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const isMe = message.senderId === state.user?.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isMe
                      ? 'bg-purple-600 text-white'
                      : state.darkMode
                      ? 'bg-gray-700 text-gray-100 border border-gray-600'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      isMe 
                        ? 'text-purple-200' 
                        : state.darkMode 
                        ? 'text-gray-400' 
                        : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className={`p-4 border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${user.name}...`}
              className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                state.darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;