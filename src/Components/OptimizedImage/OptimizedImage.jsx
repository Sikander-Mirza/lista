// Components/OptimizedImage/OptimizedImage.jsx
import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false, // Set true for above-the-fold images
  placeholder = 'blur',
  quality = 80,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Generate WebP URL if your backend supports it
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    // If using a CDN like Cloudinary, ImageKit, or similar
    // return `${originalSrc}?format=webp&quality=${quality}&width=${width}`;
    
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Low quality placeholder (blur)
  const blurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
    </svg>`
  )}`;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
          }}
        />
      )}

      {/* Actual Image */}
      {isInView && (
        <picture>
          {/* WebP format for modern browsers */}
          <source
            srcSet={getOptimizedSrc(src)}
            type="image/webp"
          />
          {/* Fallback */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setIsLoaded(true)}
            className={`
              w-full h-full object-cover transition-opacity duration-300
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              contentVisibility: priority ? 'visible' : 'auto',
            }}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;