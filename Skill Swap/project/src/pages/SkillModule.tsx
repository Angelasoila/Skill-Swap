import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Award, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockSkills } from '../data/mockData';

const SkillModule = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const skill = mockSkills.find(s => s.id === skillId);
  
  if (!skill) {
    navigate('/skills');
    return null;
  }

  const currentLesson = skill.modules[0]?.lessons.find(l => l.id === selectedLesson);
  const progress = state.userProgress[skill.id] || 0;

  const handleStartLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setShowQuiz(false);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleCompleteLesson = () => {
    setShowQuiz(true);
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer === null || !currentLesson) return;

    const isCorrect = selectedAnswer === currentLesson.quiz.correctAnswer;
    if (isCorrect) {
      const xp = currentLesson.xpReward;
      setXpGained(xp);
      dispatch({
        type: 'COMPLETE_LESSON',
        payload: { skillId: skill.id, lessonId: currentLesson.id, xp }
      });
    }
    setShowResult(true);
  };

  const handleNextLesson = () => {
    setSelectedLesson(null);
    setShowQuiz(false);
    setShowResult(false);
    setSelectedAnswer(null);
    setXpGained(0);
  };

  if (selectedLesson && currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedLesson(null)}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Lessons</span>
          </button>

          <div className="bg-white rounded-xl shadow-sm p-8">
            {!showQuiz ? (
              <>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentLesson.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Zap size={16} className="mr-1 text-yellow-500" />
                      {currentLesson.xpReward} XP
                    </span>
                    <span className="flex items-center">
                      <Award size={16} className="mr-1 text-purple-500" />
                      {skill.name}
                    </span>
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {currentLesson.content}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-purple-800 mb-2">💡 Pro Tip</h3>
                  <p className="text-purple-700">
                    Practice what you learn by building small projects. This helps reinforce the concepts and builds your portfolio!
                  </p>
                </div>

                <button
                  onClick={handleCompleteLesson}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Complete Lesson & Take Quiz
                </button>
              </>
            ) : (
              <>
                {!showResult ? (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Quiz</h2>
                      <p className="text-gray-600">Test your understanding of the lesson</p>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentLesson.quiz.question}</h3>
                      <div className="space-y-3">
                        {currentLesson.quiz.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedAnswer(index)}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                              selectedAnswer === index
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            <span className="font-medium text-gray-800">{String.fromCharCode(65 + index)}.</span>
                            <span className="ml-3 text-gray-700">{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSubmitQuiz}
                      disabled={selectedAnswer === null}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
                    >
                      Submit Answer
                    </button>
                  </>
                ) : (
                  <>
                    {selectedAnswer === currentLesson.quiz.correctAnswer ? (
                      <div className="text-center">
                        <div className="mb-6">
                          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                          <h2 className="text-3xl font-bold text-green-600 mb-2">Correct! 🎉</h2>
                          <p className="text-gray-600">Great job! You've mastered this concept.</p>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-6">
                          <div className="flex items-center justify-center space-x-3 mb-2">
                            <Zap className="text-yellow-500" size={24} />
                            <span className="text-2xl font-bold text-orange-600">+{xpGained} XP</span>
                          </div>
                          <p className="text-orange-700">Experience points earned!</p>
                        </div>

                        <button
                          onClick={handleNextLesson}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                        >
                          Continue Learning
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mb-6">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">😅</span>
                          </div>
                          <h2 className="text-2xl font-bold text-red-600 mb-2">Not quite right</h2>
                          <p className="text-gray-600 mb-4">Don't worry! Learning takes practice.</p>
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-blue-800">
                              <strong>Correct answer:</strong> {currentLesson.quiz.options[currentLesson.quiz.correctAnswer]}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleNextLesson}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                          Try Another Lesson
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/skills')}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Skills</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-4xl">{skill.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{skill.name}</h1>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{progress}/{skill.totalLessons} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${skill.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${(progress / skill.totalLessons) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {skill.modules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">{module.title}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {module.lessons.map((lesson, index) => {
                    const isCompleted = progress > index;
                    const isAvailable = progress >= index;
                    
                    return (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                          isCompleted
                            ? 'border-green-200 bg-green-50'
                            : isAvailable
                            ? 'border-purple-200 bg-purple-50 hover:border-purple-300'
                            : 'border-gray-200 bg-gray-50 opacity-50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          {isCompleted ? (
                            <CheckCircle className="text-green-500" size={24} />
                          ) : isAvailable ? (
                            <Play className="text-purple-500" size={24} />
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-800">{lesson.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Zap size={14} className="mr-1 text-yellow-500" />
                                {lesson.xpReward} XP
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {isAvailable && (
                          <button
                            onClick={() => handleStartLesson(lesson.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              isCompleted
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                          >
                            {isCompleted ? 'Review' : 'Start'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillModule;