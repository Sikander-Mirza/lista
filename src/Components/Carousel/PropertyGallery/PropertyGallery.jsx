import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";

const Lightbox = lazy(() => import('yet-another-react-lightbox'));

let cssLoaded = false;

export default function PropertyGallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const ImageKey = import.meta.env.VITE_IMAGE_KEY;

  const slides = useMemo(() => {
    return images.map((file) =>
      typeof file === "string"
        ? { src: ImageKey + file }
        : { src: URL.createObjectURL(file) }
    );
  }, [images, ImageKey]);

  const handleOpenLightbox = useCallback((idx) => {
    if (!cssLoaded) {
      import('yet-another-react-lightbox/styles.css');
      cssLoaded = true;
    }
    setIndex(idx);
    setOpen(true);
  }, []);

  if (!slides.length) {
    return (
      <div className="w-[93%] h-[570px] bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-col gap-6 w-[93%]">
        <div className="sm:w-[75%] md:w-full">
          {slides[0] && (
            <img
              src={slides[0].src}
              alt="Main"
              width={800}
              height={570}
              loading="eager"
              fetchPriority="high"
              className="w-full h-[570px] object-cover rounded-lg cursor-pointer"
              onClick={() => handleOpenLightbox(0)}
            />
          )}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-5">
          {slides.slice(1).map((slide, idx) => (
            <img
              key={idx + 1}
              src={slide.src}
              alt={`Preview-${idx + 1}`}
              width={150}
              height={128}
              loading="lazy"
              className="object-cover w-[100%] h-32 rounded-lg cursor-pointer"
              onClick={() => handleOpenLightbox(idx + 1)}
            />
          ))}
        </div>
      </div>

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