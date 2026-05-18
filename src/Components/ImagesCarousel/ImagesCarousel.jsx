import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ImagesCarousel({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="mt-7 rounded-lg bg-muted flex items-center justify-center bg-[#f5f5f5] py-24 sm:py-28 lg:py-40">
        <p className="text-gray-500">No images uploaded</p>
      </div>
    );
  }

  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,  
        }}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        modules={[Navigation, Pagination]}
        className="rounded-lg overflow-hidden h-[450px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              className=" w-full h-full object-contain"
              src={
                typeof img === "string"
                  ? import.meta.env.VITE_IMAGE_KEY + img
                  : URL.createObjectURL(img)
              }
              alt={`Preview-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Inline style with increased specificity */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
              color: #fff !important;
    background-color: #703bf7 !important;
    border-radius: 50%;
    padding: 7px 22px 5px 21px;
    font-size: 16px !important;
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 20px;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          color: #fff !important;
        }
      `}</style>
    </>
  );
}
