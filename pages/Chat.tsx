import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Search, MessageCircle, Paperclip, Image, FileText, X, Bot, Download } from 'lucide-react';
import { mockChats, getMockChatById } from '@/data/mockData';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface FileAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'other';
  size: string;
  url?: string;
  file?: File;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  attachments?: FileAttachment[];
  isAI?: boolean;
}

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiMode, setIsAiMode] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  // Auto-select chat if coming from Exchange page
  useEffect(() => {
    const partnerId = searchParams.get('partner');
    if (partnerId) {
      setSelectedChat(partnerId);
    }
  }, [searchParams]);

  // Load initial messages for selected chat
  useEffect(() => {
    if (selectedChat) {
      const currentChat = getMockChatById(selectedChat);
      if (currentChat) {
        setMessages(currentChat.messages.map(msg => ({
          ...msg,
          attachments: []
        })));
      }
    }
  }, [selectedChat]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredChats = mockChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentChat = selectedChat ? getMockChatById(selectedChat) : null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        // Check file size (limit to 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than 10MB. Please choose a smaller file.`,
            variant: "destructive"
          });
          return;
        }

        const attachment: FileAttachment = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text') ? 'document' : 'other',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          url: URL.createObjectURL(file),
          file: file
        };
        setAttachments(prev => [...prev, attachment]);
      });
    }
  };

  const removeAttachment = (id: string) => {
    const attachment = attachments.find(att => att.id === id);
    if (attachment?.url) {
      URL.revokeObjectURL(attachment.url);
    }
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const downloadAttachment = (attachment: FileAttachment) => {
    if (attachment.url) {
      const link = document.createElement('a');
      link.href = attachment.url;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const generateAIResponse = async (userMessage: string) => {
    setIsLoadingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-learning-assistant', {
        body: { 
          message: userMessage,
          context: 'learning_chat',
          userSkills: ['React', 'JavaScript', 'Python'] // This would come from user profile
        }
      });

      if (error) throw error;

      // Add AI response to messages
      const aiMessage: Message = {
        id: Date.now().toString() + '_ai',
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        isAI: true
      };

      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "AI Assistant",
        description: "Response generated successfully!",
      });
    } catch (error) {
      console.error('AI response error:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        content: 'Sorry, I encountered an error generating a response. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        isAI: true
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "AI Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() || attachments.length > 0) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        attachments: attachments.length > 0 ? [...attachments] : undefined
      };

      setMessages(prev => [...prev, newMessage]);
      
      // If AI mode is enabled and there's a text message, generate AI response
      if (isAiMode && message.trim()) {
        setTimeout(() => generateAIResponse(message), 1000);
      }

      setMessage('');
      setAttachments([]);
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast({
        title: "Message sent",
        description: isAiMode ? "AI will respond shortly..." : "Message delivered successfully!",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <Paperclip className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
              <p className="text-gray-600 dark:text-gray-300">Connect with fellow learners and teachers</p>
            </div>
            <Button
              onClick={() => setIsAiMode(!isAiMode)}
              variant={isAiMode ? "default" : "outline"}
              className={`transition-all duration-300 ${isAiMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'dark:border-gray-600 dark:hover:bg-gray-700'}`}
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant {isAiMode ? 'ON' : 'OFF'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
              <div className="p-4 border-b dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-500' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {chat.avatar}
                        </div>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate">{chat.name}</h3>
                          <span className="text-xs text-gray-500">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">{chat.lastMessage}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-wrap gap-1">
                            {chat.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          {chat.unread > 0 && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                              <span className="text-xs text-white font-medium">{chat.unread}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
              {currentChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {currentChat.avatar}
                          </div>
                          {currentChat.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{currentChat.name}</h3>
                          <p className="text-sm text-gray-500">
                            {currentChat.online ? 'Active now' : 'Last seen recently'}
                          </p>
                        </div>
                      </div>
                      {isAiMode && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-pulse">
                          <Bot className="w-3 h-3 mr-1" />
                          AI Assistant Active
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm relative ${
                          msg.isMe 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                            : msg.isAI 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                        }`}>
                          {msg.isAI && (
                            <div className="flex items-center space-x-1 mb-1">
                              <Bot className="w-3 h-3" />
                              <span className="text-xs font-medium opacity-90">AI Assistant</span>
                            </div>
                          )}
                          
                          {msg.content && <p className="text-sm whitespace-pre-wrap">{msg.content}</p>}
                          
                          {/* File attachments */}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {msg.attachments.map((attachment) => (
                                <div key={attachment.id} className={`flex items-center space-x-2 p-2 rounded border ${
                                  msg.isMe ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-600'
                                }`}>
                                  {getFileIcon(attachment.type)}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{attachment.name}</p>
                                    <p className="text-xs opacity-75">{attachment.size}</p>
                                  </div>
                                  {attachment.type === 'image' && attachment.url && (
                                    <img 
                                      src={attachment.url} 
                                      alt={attachment.name}
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => downloadAttachment(attachment)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <p className={`text-xs mt-1 ${
                            msg.isMe ? 'text-blue-100' : msg.isAI ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isLoadingAI && (
                      <div className="flex justify-start">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-sm">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4 animate-spin" />
                            <span className="text-sm">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* File Attachments Preview */}
                  {attachments.length > 0 && (
                    <div className="px-4 py-2 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex flex-wrap gap-2">
                        {attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
                            {getFileIcon(attachment.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                            {attachment.type === 'image' && attachment.url && (
                              <img 
                                src={attachment.url} 
                                alt={attachment.name}
                                className="w-8 h-8 object-cover rounded"
                              />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(attachment.id)}
                              className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                            >
                              <X className="w-3 h-3 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex space-x-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        multiple
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                        title="Attach files (Max 10MB each)"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder={isAiMode ? "Ask me anything about learning..." : "Type a message..."}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 dark:bg-gray-700 dark:border-gray-600 transition-colors"
                        disabled={isLoadingAI}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={isLoadingAI || (!message.trim() && attachments.length === 0)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
