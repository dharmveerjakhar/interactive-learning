import React, { useState } from 'react';
import { Quiz } from '../types';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizSectionProps {
  quiz: Quiz[];
  onComplete: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    const isCorrect = selectedAnswer === quiz[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, selectedAnswer]);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      onComplete();
    }
  };

  const question = quiz[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = ((currentQuestion + 1) / quiz.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold text-gray-900">Quiz</h2>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quiz.length}
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? isCorrect && index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : showResult && index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">{option}</span>
                  {showResult && (
                    <>
                      {index === question.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {selectedAnswer === index && index !== question.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-lg bg-gray-100"
            >
              <p className="text-sm text-gray-700">
                <span className="font-medium">Explanation:</span> {question.explanation}
              </p>
            </motion.div>
          )}

          <div className="mt-8 flex justify-between">
            {!showResult ? (
              <>
                <div />
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-2 rounded-md font-medium ${
                    selectedAnswer === null
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Submit Answer
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    Score: {score}/{currentQuestion + 1}
                  </span>
                </div>
                <button
                  onClick={handleNext}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  {currentQuestion === quiz.length - 1 ? 'Complete Quiz' : 'Next Question'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizSection; 