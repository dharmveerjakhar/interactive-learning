import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import { CodeExample as CodeExampleType } from '../types';
import { Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CodeExampleProps {
  example: CodeExampleType;
}

const CodeExample: React.FC<CodeExampleProps> = ({ example }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [example.code]);

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
        <pre className="overflow-x-auto p-4 text-sm">
          <code
            ref={codeRef}
            className={`language-${example.language}`}
          >
            {example.code}
          </code>
        </pre>
        
        {example.highlightLines && example.highlightLines.length > 0 && (
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
      
      {example.explanation && (
        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
          <p className="text-sm text-gray-300">{example.explanation}</p>
        </div>
      )}
    </motion.div>
  );
};

export default CodeExample; 