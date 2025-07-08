
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Lightbulb, Target, BarChart, Brain } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { mockAIResponses } from '@/data/mockLearningData';

interface AILearningAssistantProps {
  isLoadingAI: boolean;
  setIsLoadingAI: (loading: boolean) => void;
  onPersonalizedQuestions: () => void;
  onStudyRecommendations: () => void;
  onWeeklyReview: () => void;
  aiResponse: string;
  setAiResponse: (response: string) => void;
}

const AILearningAssistant: React.FC<AILearningAssistantProps> = ({
  isLoadingAI,
  setIsLoadingAI,
  onPersonalizedQuestions,
  onStudyRecommendations,
  onWeeklyReview,
  aiResponse,
  setAiResponse
}) => {
  const [aiQuestion, setAiQuestion] = useState<string>('');

  const askAI = async (): Promise<void> => {
    if (!aiQuestion.trim()) return;
    
    setIsLoadingAI(true);
    
    setTimeout(() => {
      const responses = [
        `Great question about "${aiQuestion}"! Based on your current skill levels, I recommend focusing on practical implementation. Your JavaScript skills are at intermediate level, so you're ready for more advanced concepts like async programming and error handling.`,
        `Excellent inquiry! For your learning path in "${aiQuestion}", I suggest building small projects to reinforce concepts. Since you're advanced in React, consider exploring state management patterns and performance optimization techniques.`,
        `That's a thoughtful question about "${aiQuestion}". Given your current progress, I recommend combining theory with hands-on practice. Your Python skills could benefit from more structured learning in data structures and OOP concepts.`,
        `Perfect timing for this question about "${aiQuestion}"! Based on your learning pattern, I suggest dedicating 2-3 focused study sessions per week. Your strong areas in React can help you mentor others while improving weaker areas.`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setIsLoadingAI(false);
      
      toast({
        title: "AI Response Generated",
        description: "Your personalized learning advice is ready!",
      });
    }, 2000);
  };

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
      <div className="flex items-center space-x-2 mb-3">
        <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h4 className="font-semibold text-gray-900 dark:text-white">AI Personalized Learning Assistant</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Button 
          onClick={onPersonalizedQuestions}
          disabled={isLoadingAI}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          {isLoadingAI ? 'Generating...' : 'Get Personal Questions'}
        </Button>
        <Button 
          onClick={onStudyRecommendations}
          disabled={isLoadingAI}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
        >
          <Target className="w-4 h-4 mr-2" />
          {isLoadingAI ? 'Generating...' : 'Study Recommendations'}
        </Button>
        <Button 
          onClick={onWeeklyReview}
          disabled={isLoadingAI}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <BarChart className="w-4 h-4 mr-2" />
          {isLoadingAI ? 'Generating...' : 'Weekly Review'}
        </Button>
      </div>

      <div className="space-y-3">
        <Textarea
          placeholder="Ask me about your learning journey, request targeted practice questions, or get study recommendations..."
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          className="min-h-[80px] dark:bg-gray-700 dark:border-gray-600"
        />
        <Button 
          onClick={askAI}
          disabled={isLoadingAI || !aiQuestion.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isLoadingAI ? 'Thinking...' : 'Ask AI'}
        </Button>
      </div>

      {aiResponse && (
        <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Assistant:</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AILearningAssistant;
