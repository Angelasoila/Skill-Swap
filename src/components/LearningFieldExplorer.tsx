
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, BookOpen, Clock, Users, Star } from 'lucide-react';
import { LearningPath } from '@/types/learning';

interface LearningFieldExplorerProps {
  field: string;
  onStartLearning: (pathId: string) => void;
  onSaveForLater: (pathId: string) => void;
}

const LearningFieldExplorer: React.FC<LearningFieldExplorerProps> = ({ 
  field, 
  onStartLearning, 
  onSaveForLater 
}) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const fieldPaths: { [key: string]: LearningPath[] } = {
    'data-science': [
      {
        id: 'ds-fundamentals',
        title: 'Data Science Fundamentals',
        description: 'Learn the basics of data analysis, statistics, and Python programming for data science.',
        duration: '8 weeks',
        difficulty: 'Beginner',
        students: 15420,
        rating: 4.8,
        topics: ['Python', 'Statistics', 'Pandas', 'NumPy', 'Data Visualization'],
        field: 'data-science'
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning Essentials',
        description: 'Master supervised and unsupervised learning algorithms with hands-on projects.',
        duration: '12 weeks',
        difficulty: 'Intermediate',
        students: 8950,
        rating: 4.7,
        topics: ['Scikit-learn', 'Regression', 'Classification', 'Clustering', 'Model Evaluation'],
        field: 'data-science'
      },
      {
        id: 'deep-learning',
        title: 'Deep Learning & Neural Networks',
        description: 'Build and train neural networks for computer vision and natural language processing.',
        duration: '16 weeks',
        difficulty: 'Advanced',
        students: 5670,
        rating: 4.9,
        topics: ['TensorFlow', 'PyTorch', 'CNNs', 'RNNs', 'Transformers'],
        field: 'data-science'
      }
    ],
    'web-development': [
      {
        id: 'frontend-basics',
        title: 'Frontend Development Fundamentals',
        description: 'Master HTML, CSS, and JavaScript to build interactive web applications.',
        duration: '10 weeks',
        difficulty: 'Beginner',
        students: 22100,
        rating: 4.6,
        topics: ['HTML', 'CSS', 'JavaScript', 'DOM Manipulation', 'Responsive Design'],
        field: 'web-development'
      },
      {
        id: 'react-mastery',
        title: 'React Development Mastery',
        description: 'Build modern React applications with hooks, context, and advanced patterns.',
        duration: '8 weeks',
        difficulty: 'Intermediate',
        students: 18750,
        rating: 4.8,
        topics: ['React', 'JSX', 'Hooks', 'State Management', 'Component Architecture'],
        field: 'web-development'
      },
      {
        id: 'fullstack-journey',
        title: 'Full-Stack Development Journey',
        description: 'Create complete web applications with frontend, backend, and database integration.',
        duration: '20 weeks',
        difficulty: 'Advanced',
        students: 9200,
        rating: 4.9,
        topics: ['Node.js', 'Express', 'Database Design', 'API Development', 'Deployment'],
        field: 'web-development'
      }
    ],
    'ai-ml': [
      {
        id: 'ai-foundations',
        title: 'AI & Machine Learning Foundations',
        description: 'Understand the core concepts of artificial intelligence and machine learning.',
        duration: '6 weeks',
        difficulty: 'Beginner',
        students: 12800,
        rating: 4.7,
        topics: ['AI Concepts', 'ML Algorithms', 'Problem Solving', 'Ethics in AI'],
        field: 'ai-ml'
      },
      {
        id: 'nlp-specialization',
        title: 'Natural Language Processing',
        description: 'Build systems that understand and generate human language.',
        duration: '14 weeks',
        difficulty: 'Advanced',
        students: 4320,
        rating: 4.8,
        topics: ['Text Processing', 'Language Models', 'Sentiment Analysis', 'Chatbots'],
        field: 'ai-ml'
      }
    ],
    'mobile-dev': [
      {
        id: 'react-native',
        title: 'React Native Development',
        description: 'Build cross-platform mobile apps using React Native.',
        duration: '12 weeks',
        difficulty: 'Intermediate',
        students: 7650,
        rating: 4.6,
        topics: ['React Native', 'Mobile UI', 'Navigation', 'Device APIs', 'Publishing'],
        field: 'mobile-dev'
      },
      {
        id: 'flutter-dev',
        title: 'Flutter Mobile Development',
        description: 'Create beautiful native mobile apps with Flutter and Dart.',
        duration: '10 weeks',
        difficulty: 'Intermediate',
        students: 6890,
        rating: 4.7,
        topics: ['Flutter', 'Dart', 'Widgets', 'State Management', 'Material Design'],
        field: 'mobile-dev'
      }
    ]
  };

  const paths = fieldPaths[field] || [];

  const getDifficultyColor = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): string => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const handlePathClick = (pathId: string): void => {
    setSelectedPath(selectedPath === pathId ? null : pathId);
  };

  const handleStartLearning = (e: React.MouseEvent, pathId: string): void => {
    e.stopPropagation();
    onStartLearning(pathId);
  };

  const handleSaveForLater = (e: React.MouseEvent, pathId: string): void => {
    e.stopPropagation();
    onSaveForLater(pathId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <span>Learning Paths</span>
        <ChevronRight className="w-4 h-4" />
        <span className="capitalize font-medium text-gray-900 dark:text-white">
          {field.replace('-', ' ')}
        </span>
      </div>

      <div className="grid gap-6">
        {paths.map((path) => (
          <Card
            key={path.id}
            className={`p-6 border transition-all duration-300 hover:shadow-lg cursor-pointer ${
              selectedPath === path.id
                ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            } dark:bg-gray-800`}
            onClick={() => handlePathClick(path.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {path.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {path.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{path.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{path.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Badge className={getDifficultyColor(path.difficulty)}>
                    {path.difficulty}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {path.topics.slice(0, 5).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs dark:bg-gray-600 dark:text-gray-300">
                      {topic}
                    </Badge>
                  ))}
                  {path.topics.length > 5 && (
                    <Badge variant="secondary" className="text-xs dark:bg-gray-600 dark:text-gray-300">
                      +{path.topics.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={(e) => handleStartLearning(e, path.id)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
              <Button
                variant="outline"
                onClick={(e) => handleSaveForLater(e, path.id)}
                className="dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Save for Later
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningFieldExplorer;
