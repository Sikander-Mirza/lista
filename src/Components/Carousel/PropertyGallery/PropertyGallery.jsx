// Components/Carousel/PropertyGallery/PropertyGallery.jsx
import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import "yet-another-react-lightbox/styles.css";

// Lazy load lightbox
const Lightbox = lazy(() => import('yet-another-react-lightbox'));

export default function PropertyGallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const ImageKey = import.meta.env.VITE_IMAGE_KEY;

  const slides = useMemo(() => {
    return images.map((file) =>
      typeof file === "string"
        ? { src: ImageKey + file }
        : { src: URL.createObjectURL(file) }
    );
  }, [images, ImageKey]);

  const handleImageLoad = useCallback((idx) => {
    setLoadedImages((prev) => ({ ...prev, [idx]: true }));
  }, []);

  const handleOpenLightbox = useCallback((idx) => {
    setIndex(idx);
    setOpen(true);
  }, []);

  if (!slides.length) {
    return (
      <div 
        className="w-[93%] bg-gray-200 rounded-lg flex items-center justify-center"
        style={{ height: '570px' }}
      >
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-col gap-6 w-[93%]">
        {/* Main Image */}
        <div className="sm:w-[75%] md:w-full relative aspect-[800/570]">
          {slides[0] && (
            <>
              {!loadedImages[0] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              <img
                src={slides[0].src}
                alt="Property main image"
                width={800}
                height={570}
                loading="eager"
                fetchpriority="high"
                decoding="async"
                onLoad={() => handleImageLoad(0)}
                onClick={() => handleOpenLightbox(0)}
                className={`
                  w-full h-full object-cover rounded-lg cursor-pointer
                  transition-opacity duration-300
                  ${loadedImages[0] ? 'opacity-100' : 'opacity-0'}
                `}
              />
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-5">
          {slides.slice(1).map((slide, idx) => {
            const actualIndex = idx + 1;
            return (
              <div 
                key={actualIndex} 
                className="relative aspect-[150/128]"
              >
                {!loadedImages[actualIndex] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                )}
                <img
                  src={slide.src}
                  alt={`Property image ${actualIndex + 1}`}
                  width={150}
                  height={128}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(actualIndex)}
                  onClick={() => handleOpenLightbox(actualIndex)}
                  className={`
                    w-full h-full object-cover rounded-lg cursor-pointer
                    transition-opacity duration-300 hover:opacity-90
                    ${loadedImages[actualIndex] ? 'opacity-100' : 'opacity-0'}
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lazy loaded Lightbox */}
      {open && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        }>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={slides}
            index={index}
          />
        </Suspense>
      )}
    </>
  );
}