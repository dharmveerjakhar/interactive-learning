import React from 'react';
import { Link } from 'react-router-dom';
import { learningCategories } from '../data/learningModules';
import { ArrowRight, CheckCircle, Clock, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Interactive Learning Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to your comprehensive learning hub. Start your journey with machine coding to master programming interviews and build better software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningCategories.map((category, index) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-5xl">{category.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        category.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        category.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {category.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-indigo-100 text-indigo-800">
                        {category.modules.length} modules
                      </span>
                    </div>
                  </div>
                </div>
                {category.completed && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {category.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{category.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{category.modules.length} modules</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>

              {category.progress !== undefined && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{category.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Start Your Learning Journey
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Choose a category to begin your learning adventure. Each category contains carefully crafted modules 
          designed to take you from basics to advanced concepts with hands-on practice.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Structured Learning</h3>
            <p className="text-sm text-gray-600">Follow carefully designed curricula with progressive difficulty</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Interactive Practice</h3>
            <p className="text-sm text-gray-600">Learn by doing with interactive examples and quizzes</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-World Ready</h3>
            <p className="text-sm text-gray-600">Build skills that directly apply to interviews and job performance</p>
          </div>
        </div>
      </div>

      {/* Future categories placeholder */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Coming Soon
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          We're working on expanding the platform with more learning categories including Data Structures & Algorithms, 
          System Design, and Frontend/Backend development tracks.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <span className="text-4xl mb-3 block">🧮</span>
            <h3 className="font-semibold text-gray-700 mb-2">Data Structures & Algorithms</h3>
            <p className="text-sm text-gray-500">Master core CS concepts for coding interviews</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <span className="text-4xl mb-3 block">🏗️</span>
            <h3 className="font-semibold text-gray-700 mb-2">System Design</h3>
            <p className="text-sm text-gray-500">Learn to design scalable distributed systems</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <span className="text-4xl mb-3 block">🌐</span>
            <h3 className="font-semibold text-gray-700 mb-2">Web Development</h3>
            <p className="text-sm text-gray-500">Full-stack development with modern frameworks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 