import React from 'react';

export const formatContent = (content: string): React.ReactElement[] => {
  const lines = content.split('\n');
  
  return lines.map((line, index) => {
    // Handle bold text
    let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle bullet points
    if (line.trim().startsWith('- ')) {
      formattedLine = `<li>${formattedLine.substring(2)}</li>`;
      return (
        <div key={index} className="ml-4" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    }
    
    // Return paragraph for regular lines
    if (line.trim()) {
      return (
        <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    }
    
    // Return null for empty lines
    return null;
  }).filter(Boolean) as React.ReactElement[];
};