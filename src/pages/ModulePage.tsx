import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { learningModules } from '../data/learningModules';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const ModulePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const module = learningModules.find(m => m.slug === slug);

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Module not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Return to home
        </button>
      </div>
    );
  }

  if (module.concepts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to modules
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-12">
          <span className="text-6xl mb-6 block">{module.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{module.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{module.description}</p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">🚧</span>
              <h3 className="text-lg font-semibold text-yellow-800">Coming Soon!</h3>
            </div>
            <p className="text-yellow-700">
              This module is currently under development. We're working hard to bring you high-quality content for {module.title.toLowerCase()}.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Other Modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to modules
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <span className="text-6xl">{module.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{module.description}</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{module.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{module.concepts.length} concepts</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {module.difficulty}
                </span>
              </div>
            </div>
          </div>

          {module.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Module Progress</span>
                <span>{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-blue-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${module.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Concepts in this Module</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {module.concepts.map((concept, index) => (
            <Link
              key={concept.id}
              to={`/module/${module.slug}/concept/${concept.slug}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{concept.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {concept.title}
                      </h3>
                      <span className="text-sm text-gray-500">Concept {index + 1}</span>
                    </div>
                  </div>
                  {concept.completed && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {concept.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {concept.sections.length} sections
                    </span>
                    <span className="text-sm text-gray-500">
                      {concept.quiz.length} quiz questions
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>

                {concept.progress !== undefined && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{concept.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${concept.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Learning Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">📚 Study Approach</h4>
            <p className="text-sm text-gray-600">
              Go through concepts in order, as each builds upon the previous one. Take notes and try to understand the 'why' behind each concept.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">💻 Practice</h4>
            <p className="text-sm text-gray-600">
              Code along with the examples and experiment with variations. The best learning happens when you modify and break things yourself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePage; 