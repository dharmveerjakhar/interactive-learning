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

// New function to convert content to paragraphs for typewriter effect
export const contentToParagraphs = (content: string): string[] => {
  const lines = content.split('\n').filter(line => line.trim());
  const paragraphs: string[] = [];
  let currentParagraph = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Handle headers (markdown-style)
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      if (currentParagraph) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
      // Remove bold formatting for plain text
      paragraphs.push(trimmedLine.replace(/\*\*/g, ''));
      continue;
    }
    
    // Handle bullet points
    if (trimmedLine.startsWith('- ')) {
      if (currentParagraph) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
      // Remove bold formatting and bullet for plain text
      paragraphs.push('• ' + trimmedLine.substring(2).replace(/\*\*/g, ''));
      continue;
    }
    
    // Regular lines - accumulate into current paragraph
    if (trimmedLine) {
      if (currentParagraph) {
        currentParagraph += ' ';
      }
      // Remove bold formatting for plain text
      currentParagraph += trimmedLine.replace(/\*\*/g, '');
    }
  }
  
  // Don't forget the last paragraph
  if (currentParagraph) {
    paragraphs.push(currentParagraph.trim());
  }
  
  return paragraphs.filter(p => p.length > 0);
};