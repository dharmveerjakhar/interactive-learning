import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import { CodeExample as CodeExampleType } from '../types';
import { Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TypewriterCodeExampleProps {
  example: CodeExampleType;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const TypewriterCodeExample: React.FC<TypewriterCodeExampleProps> = ({
  example,
  speed = 10,
  delay = 0,
  onComplete,
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reset state when the code example changes
    setDisplayedCode('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [example.code]);

  useEffect(() => {
    if (currentIndex < example.code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => prev + example.code[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timer);
    } else {
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
    }
  }, [currentIndex, example.code, speed, delay, onComplete, isComplete]);

  useEffect(() => {
    if (isComplete && codeRef.current) {
      // Apply syntax highlighting once the typewriter effect is complete
      Prism.highlightElement(codeRef.current);
    }
  }, [isComplete, displayedCode]); // Run when complete and code is fully displayed

  const handleCopy = () => {
    navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <h3 className="text-sm font-medium text-gray-300">{example.title}</h3>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm min-h-[100px] bg-gray-900">
          <code
            ref={codeRef}
            className={`language-${example.language}`}
            style={{ 
              whiteSpace: 'pre-wrap',
              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", "SF Mono", "Cascadia Code", "Roboto Mono", monospace',
              fontSize: '14px',
              lineHeight: '1.5',
              color: isComplete ? 'inherit' : '#e5e7eb' // Light gray during typing, inherit after highlighting
            }}
          >
            {displayedCode}
            {!isComplete && (
              <span className="animate-pulse text-blue-400">|</span>
            )}
          </code>
        </pre>
        
        {isComplete && example.highlightLines && example.highlightLines.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {example.highlightLines.map(lineNumber => (
              <div
                key={lineNumber}
                className="absolute left-0 right-0 bg-blue-500 bg-opacity-10 border-l-2 border-blue-500"
                style={{
                  top: `${(lineNumber - 1) * 1.5}em`,
                  height: '1.5em',
                  marginTop: '1rem'
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {isComplete && example.explanation && (
        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
          <p className="text-sm text-gray-300">{example.explanation}</p>
        </div>
      )}
    </motion.div>
  );
};

export default TypewriterCodeExample;