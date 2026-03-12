// utils/loadScript.js
export const loadScript = (src, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

// Load third-party scripts after page load
export const loadThirdPartyScripts = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      // Load Google Analytics
      loadScript('https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID');
      
      // Load other non-critical scripts
      // loadScript('https://example.com/widget.js');
    });
  }
};