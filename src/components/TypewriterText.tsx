import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // initial delay before starting
  className?: string;
  onComplete?: () => void;
  cursor?: boolean; // show blinking cursor
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 10,
  delay = 0,
  className = '',
  onComplete,
  cursor = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
      
      // Stop cursor blinking after completion
      if (cursor) {
        setTimeout(() => setShowCursor(false), 1000);
      }
    }
  }, [currentIndex, text, speed, delay, onComplete, isComplete, cursor]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor || !showCursor) return;
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, [cursor, showCursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && showCursor && !isComplete && (
        <span className="animate-pulse text-blue-600">|</span>
      )}
    </span>
  );
};

export default TypewriterText; 