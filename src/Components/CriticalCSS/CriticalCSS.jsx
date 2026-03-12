// Components/CriticalCSS/CriticalCSS.jsx
import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Load non-critical CSS asynchronously
    const loadCSS = (href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    };

    // Load non-critical stylesheets
    // loadCSS('/styles/animations.css');
    // loadCSS('/styles/print.css');
  }, []);

  return null;
};

export default CriticalCSS;