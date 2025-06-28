import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { learningCategories } from '../data/learningModules';
import { ArrowRight, CheckCircle, Clock, Award, ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const category = learningCategories.find(cat => cat.slug === slug);
  
  if (!category) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div>
      {/* Back navigation */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Categories</span>
        </Link>
      </div>

      {/* Category header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-6xl">{category.icon}</span>
          <h1 className="text-4xl font-bold text-gray-900">
            {category.title}
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {category.description}
        </p>
        
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">{category.estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">{category.modules.length} modules</span>
          </div>
        </div>

        {category.progress !== undefined && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{category.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${category.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.modules.map((module, index) => (
          <Link
            key={module.id}
            to={`/module/${module.slug}`}
            className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-5xl">{module.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {module.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {module.difficulty}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        module.type === 'concepts' ? 'bg-blue-100 text-blue-800' :
                        module.type === 'principles' ? 'bg-purple-100 text-purple-800' :
                        module.type === 'practice' ? 'bg-orange-100 text-orange-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {module.type}
                      </span>
                    </div>
                  </div>
                </div>
                {module.completed && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {module.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{module.estimatedTime}</span>
                  </div>
                  {module.concepts.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{module.concepts.length} topics</span>
                    </div>
                  )}
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>

              {module.progress !== undefined && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {module.concepts.length === 0 && (
                <div className="text-center py-4">
                  <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Learning path section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Recommended Learning Path
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Start with <strong>OOP Fundamentals</strong> to build a solid foundation, then advance to 
          <strong> SOLID Principles</strong> and <strong>Design Patterns</strong> for better code architecture. 
          Finally, apply your knowledge with <strong>Practice Problems</strong> to ace your machine coding interviews.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Learn Concepts</h3>
            <p className="text-sm text-gray-600">Master fundamentals with interactive lessons and real code examples</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏗️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Apply Principles</h3>
            <p className="text-sm text-gray-600">Learn industry-standard practices and design patterns</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💪</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Practice & Excel</h3>
            <p className="text-sm text-gray-600">Solve real interview problems and build confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 