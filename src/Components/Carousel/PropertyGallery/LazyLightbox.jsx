// Components/Carousel/PropertyGallery/LazyLightbox.jsx
import React, { Suspense, lazy } from 'react';

const Lightbox = lazy(() => import('yet-another-react-lightbox'));

const LazyLightbox = ({ open, ...props }) => {
  // Only load the lightbox when it's needed
  if (!open) return null;
  
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    }>
      <Lightbox open={open} {...props} />
    </Suspense>
  );
};

export default LazyLightbox;