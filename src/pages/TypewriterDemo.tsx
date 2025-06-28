import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from '../components/TypewriterText';
import TypewriterSection from '../components/TypewriterSection';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TypewriterDemo: React.FC = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const conceptExplanation = [
    "Welcome to Object-Oriented Programming! Let me explain this fundamental concept step by step.",
    "Think of OOP like organizing your daily life. Just as you have different categories for your belongings - clothes in the wardrobe, books on the shelf, kitchen items in cabinets - OOP helps us organize code into logical groups called 'classes'.",
    "A class is like a blueprint or template. For example, if you were to describe what makes a 'Car', you'd list properties like color, brand, model, and actions like start(), stop(), accelerate().",
    "When you create an actual car from this blueprint, you get an 'object' - a specific instance with actual values like 'red Toyota Camry' that can perform those actions.",
    "This approach makes code more organized, reusable, and easier to understand - just like how organizing your belongings makes your life more manageable!"
  ];

  const resetDemo = (demoName: string) => {
    setActiveDemo(null);
    setTimeout(() => setActiveDemo(demoName), 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Platform
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎭 Typewriter Effect Demo
        </h1>
        <p className="text-gray-600">
          See how we can add LLM-style thinking and typing animations to enhance the learning experience
        </p>
      </div>

      {/* Demo 1: Simple Typewriter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            📝 Simple Typewriter Effect
          </h2>
          <button
            onClick={() => resetDemo('simple')}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Replay
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 min-h-[60px] flex items-center">
          {activeDemo === 'simple' && (
            <TypewriterText
              text="Object-Oriented Programming is a programming paradigm that organizes code into reusable objects and classes."
              speed={50}
              className="text-lg text-gray-800"
            />
          )}
          {activeDemo !== 'simple' && (
            <button
              onClick={() => setActiveDemo('simple')}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Animation
            </button>
          )}
        </div>
      </motion.div>

      {/* Demo 2: Multi-paragraph with Thinking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            🤔 LLM-Style Thinking + Multi-Paragraph
          </h2>
          <button
            onClick={() => resetDemo('thinking')}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Replay
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
          {activeDemo === 'thinking' && (
            <TypewriterSection
              content={conceptExplanation}
              speed={25}
              paragraphDelay={800}
              showThinking={true}
            />
          )}
          {activeDemo !== 'thinking' && (
            <button
              onClick={() => setActiveDemo('thinking')}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Start LLM-Style Explanation
            </button>
          )}
        </div>
      </motion.div>

      {/* Demo 3: Code Example with Typewriter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            💻 Code Example with Animation
          </h2>
          <button
            onClick={() => resetDemo('code')}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Replay
          </button>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 min-h-[150px] font-mono text-green-400">
          {activeDemo === 'code' && (
            <TypewriterText
              text={`class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  
  start() {
    console.log('Engine started!');
  }
}`}
              speed={30}
              className="whitespace-pre-line"
              cursor={true}
            />
          )}
          {activeDemo !== 'code' && (
            <button
              onClick={() => setActiveDemo('code')}
              className="flex items-center text-green-400 hover:text-green-300"
            >
              <Play className="h-4 w-4 mr-2" />
              Animate Code
            </button>
          )}
        </div>
      </motion.div>

      {/* Integration Ideas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          💡 Integration Ideas for Your Learning Platform
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">📚 Concept Explanations</h3>
            <p className="text-sm text-gray-600">
              Use thinking + typewriter for complex OOP concepts to make them feel more conversational and engaging.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">💻 Code Walkthroughs</h3>
            <p className="text-sm text-gray-600">
              Animate code examples line by line with explanations, making it easier to follow along.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">🧪 Quiz Feedback</h3>
            <p className="text-sm text-gray-600">
              Show thinking animation before revealing quiz explanations for more realistic interaction.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">🎯 Learning Summaries</h3>
            <p className="text-sm text-gray-600">
              End each concept with an animated summary that reinforces key learning points.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TypewriterDemo; 