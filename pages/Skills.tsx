import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import SkillCard from '@/components/SkillCard';
import SkillLevelIndicator from '@/components/SkillLevelIndicator';
import { Plus, BookOpen, Trophy } from 'lucide-react';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { SkillLevel } from '@/types/learning';

const Skills: React.FC = () => {
  const navigate = useNavigate();
  const { currentProgress, continueLearning } = useLearningProgress();

  const currentSkills = [
    {
      name: 'JavaScript',
      icon: '💻',
      progress: 8,
      totalLessons: 15,
      xp: 1250,
      level: 3,
      timeSpent: 24
    },
    {
      name: 'React',
      icon: '⚛️',
      progress: 12,
      totalLessons: 20,
      xp: 2100,
      level: 4,
      timeSpent: 35
    },
    {
      name: 'UI/UX Design',
      icon: '🎨',
      progress: 5,
      totalLessons: 18,
      xp: 850,
      level: 2,
      timeSpent: 18
    }
  ];

  const skillLevels: SkillLevel[] = [
    { skill: 'JavaScript', level: 'Intermediate', progress: 75, xp: 1250 },
    { skill: 'React', level: 'Advanced', progress: 85, xp: 2100 },
    { skill: 'Python', level: 'Beginner', progress: 35, xp: 450 },
    { skill: 'UI/UX Design', level: 'Intermediate', progress: 60, xp: 850 }
  ];

  const recommendedSkills = [
    { name: 'TypeScript', icon: '📘', description: 'Perfect next step after JavaScript' },
    { name: 'Node.js', icon: '🚀', description: 'Complete your full-stack journey' },
    { name: 'Figma', icon: '🎯', description: 'Enhance your design workflow' },
    { name: 'Python', icon: '🐍', description: 'Expand into data science' }
  ];

  const handleContinueLearning = (skillName: string): void => {
    console.log(`Continue learning ${skillName}`);
    // Navigate to learning page with skill name
    navigate(`/learning?skill=${encodeURIComponent(skillName)}&pathId=${skillName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleStartLearning = (skillName: string): void => {
    // Navigate to learning page for recommended skills
    navigate(`/learning?skill=${encodeURIComponent(skillName)}&pathId=${skillName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">My Skills</h1>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">Track your progress and discover new skills to master</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Skill
          </Button>
        </div>

        {/* Skills Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{skillLevels.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Active Skills</p>
          </Card>

          <Card className="p-6 text-center dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentProgress.reduce((total, progress) => total + progress.completedLessons, 0)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Lessons Completed</p>
          </Card>

          <Card className="p-6 text-center dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentProgress.reduce((total, progress) => total + progress.xp, 0)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Total XP Earned</p>
          </Card>
        </div>

        {/* Active Learning Paths */}
        {currentProgress.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Continue Learning</h2>
            <div className="grid gap-4">
              {currentProgress.map((progress) => (
                <Card key={progress.pathId} className="p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Learning Path #{progress.pathId.slice(-4)}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>{progress.completedLessons}/{progress.totalLessons} lessons</span>
                        <span>{progress.xp} XP earned</span>
                        <span>{progress.progress}% complete</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress.progress}%` }}
                        />
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/learning?pathId=${progress.pathId}&skill=Learning Path`)}
                      className="ml-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      Continue
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Skill Level Indicators */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Your Skill Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillLevels.map((skill, index) => (
              <SkillLevelIndicator
                key={index}
                skill={skill.skill}
                level={skill.level}
                progress={skill.progress}
                xp={skill.xp}
              />
            ))}
          </div>
        </section>

        {/* Current Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Currently Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSkills.map((skill, index) => (
              <SkillCard 
                key={index}
                skill={skill}
                onContinue={() => handleContinueLearning(skill.name)}
              />
            ))}
          </div>
        </section>

        {/* Recommended Skills */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedSkills.map((skill, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{skill.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{skill.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() => handleStartLearning(skill.name)}
                  >
                    Start Learning
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Skills;
