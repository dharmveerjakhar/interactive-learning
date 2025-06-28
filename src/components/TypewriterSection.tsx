import React, { useState, useEffect } from 'react';
import TypewriterText from './TypewriterText';
import { motion } from 'framer-motion';

interface TypewriterSectionProps {
  content: string[];
  speed?: number;
  paragraphDelay?: number;
  className?: string;
  onComplete?: () => void;
  showThinking?: boolean;
}

const TypewriterSection: React.FC<TypewriterSectionProps> = ({
  content,
  speed = 30,
  paragraphDelay = 500,
  className = '',
  onComplete,
  showThinking = true
}) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [completedParagraphs, setCompletedParagraphs] = useState<number[]>([]);
  const [isThinking, setIsThinking] = useState(showThinking);

  useEffect(() => {
    if (showThinking) {
      // Show thinking animation for 1-2 seconds
      const thinkingTimer = setTimeout(() => {
        setIsThinking(false);
      }, 1500);
      return () => clearTimeout(thinkingTimer);
    }
  }, [showThinking]);

  const handleParagraphComplete = () => {
    setCompletedParagraphs(prev => [...prev, currentParagraph]);
    
    if (currentParagraph < content.length - 1) {
      setTimeout(() => {
        setCurrentParagraph(prev => prev + 1);
      }, paragraphDelay);
    } else {
      onComplete?.();
    }
  };

  if (isThinking) {
    return (
      <div className={`${className} flex items-center space-x-2`}>
        <span className="text-gray-600">Thinking</span>
        <div className="flex space-x-1">
          <motion.div
            className="w-2 h-2 bg-blue-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {content.map((paragraph, index) => (
        <div key={index} className="mb-4">
          {index < currentParagraph && (
            <p className="text-gray-700 leading-relaxed">{paragraph}</p>
          )}
          {index === currentParagraph && (
            <p className="text-gray-700 leading-relaxed">
              <TypewriterText
                text={paragraph}
                speed={speed}
                onComplete={handleParagraphComplete}
                cursor={index === content.length - 1}
              />
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TypewriterSection; 