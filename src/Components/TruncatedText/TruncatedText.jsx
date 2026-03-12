import React, { useState } from 'react';

function TruncatedText({ text, maxLength  }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const isLongText = text.length > maxLength;

  const displayedText = isExpanded || !isLongText
    ? text
    : text.slice(0, maxLength) + '..';

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
     <>
      {displayedText}
      {isLongText && (
        <span
          onClick={toggleExpand}
          style={{
            marginLeft: '5px',
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
            padding: 0,
            fontSize: '0.9em',
            textDecoration: 'underline'
          }}
          aria-label={isExpanded ? "Show less" : "Read more"}
        >
        </span>
      )}
     </>
  );
}

export default TruncatedText;
