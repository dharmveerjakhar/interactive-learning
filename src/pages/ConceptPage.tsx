import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { learningModules } from '../data/learningModules';
import { ArrowLeft, ChevronRight, CheckCircle } from 'lucide-react';
import TypewriterCodeExample from '../components/TypewriterCodeExample';
import QuizSection from '../components/QuizSection';
import TypewriterSection from '../components/TypewriterSection';
import { motion } from 'framer-motion';
import { contentToParagraphs } from '../utils/formatContent';

const ConceptPage: React.FC = () => {
  const { moduleSlug, conceptSlug } = useParams<{ moduleSlug: string; conceptSlug: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizStarted, setQuizStarted] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);

  const module = learningModules.find(m => m.slug === moduleSlug);
  const concept = module?.concepts.find(c => c.slug === conceptSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setContentLoaded(false);
    setTextCompleted(false);
    // Small delay to trigger typewriter effect on section change
    const timer = setTimeout(() => setContentLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Debug effect to track state changes
  useEffect(() => {
    console.log('State update:', {
      contentLoaded,
      textCompleted,
      hasCodeExample: !!concept?.sections[activeSection]?.codeExample,
      codeExample: concept?.sections[activeSection]?.codeExample
    });
  }, [contentLoaded, textCompleted, concept, activeSection]);

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

  const handleTypewriterComplete = () => {
    console.log('Text typewriter completed, showing code block...');
    setTextCompleted(true);
  };

  const handleCodeComplete = () => {
    console.log('Code typewriter completed');
  };

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
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {concept.sections[activeSection].title}
            </h2>
            
            {/* Typewriter Content */}
            {contentLoaded && (
              <div className="prose prose-lg max-w-none">
                <TypewriterSection
                  content={contentToParagraphs(concept.sections[activeSection].content)}
                  speed={5}
                  paragraphDelay={300}
                  onComplete={handleTypewriterComplete}
                  showThinking={true}
                />
              </div>
            )}

            {concept.sections[activeSection].codeExample && textCompleted && (
              <div className="mt-8">
                <TypewriterCodeExample 
                  example={concept.sections[activeSection].codeExample!} 
                  speed={1}
                  delay={500}
                  onComplete={handleCodeComplete}
                />
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
                disabled={!textCompleted && !!concept.sections[activeSection].codeExample}
                className={`flex items-center px-6 py-2 rounded-md font-medium ${
                  !textCompleted && !!concept.sections[activeSection].codeExample
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
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