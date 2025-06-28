import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { learningModules } from '../data/learningModules';
import { ArrowLeft, ChevronRight, CheckCircle } from 'lucide-react';
import CodeExample from '../components/CodeExample';
import QuizSection from '../components/QuizSection';
import { motion } from 'framer-motion';
import { formatContent } from '../utils/formatContent';

const ConceptPage: React.FC = () => {
  const { moduleSlug, conceptSlug } = useParams<{ moduleSlug: string; conceptSlug: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizStarted, setQuizStarted] = useState(false);

  const module = learningModules.find(m => m.slug === moduleSlug);
  const concept = module?.concepts.find(c => c.slug === conceptSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  if (!module || !concept) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Concept not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Return to home
        </button>
      </div>
    );
  }

  const handleSectionComplete = () => {
    const currentSection = concept.sections[activeSection];
    setCompletedSections(prev => new Set(prev).add(currentSection.id));
    
    if (activeSection < concept.sections.length - 1) {
      setActiveSection(activeSection + 1);
    } else {
      setQuizStarted(true);
    }
  };

  const progress = Math.round(
    ((completedSections.size + (quizStarted ? 1 : 0)) / (concept.sections.length + 1)) * 100
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/module/${moduleSlug}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {module.title}
        </button>
        
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-5xl">{concept.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{concept.title}</h1>
            <p className="text-gray-600">{concept.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">{progress}% Complete</p>
      </div>

      {/* Content */}
      {!quizStarted ? (
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Section Navigation */}
          <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
            {concept.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === index
                    ? 'bg-blue-600 text-white'
                    : completedSections.has(section.id)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {completedSections.has(section.id) && (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                {section.title}
              </button>
            ))}
          </div>

          {/* Section Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {concept.sections[activeSection].title}
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              {formatContent(concept.sections[activeSection].content)}
            </div>

            {concept.sections[activeSection].codeExample && (
              <div className="mt-8">
                <CodeExample example={concept.sections[activeSection].codeExample!} />
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeSection === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              <button
                onClick={handleSectionComplete}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                {activeSection === concept.sections.length - 1 ? 'Start Quiz' : 'Next Section'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <QuizSection
          quiz={concept.quiz}
          onComplete={() => {
            // Mark concept as completed and navigate back
            alert('Congratulations! You\'ve completed this concept!');
            navigate(`/module/${moduleSlug}`);
          }}
        />
      )}
    </div>
  );
};

export default ConceptPage; 