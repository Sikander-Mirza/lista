import React from "react";
import TruncatedText from "../TruncatedText/TruncatedText";

const Testimonials = ({
  RevTitle,
  RevParagraph,
  RevImage,
  UserName,
  Desination,
  Stars,
}) => {
  return (
    <>
      <div className="border-[1px] border-solid border-[#BBBBBB] py-8 px-6 flex flex-col justify-start items-start gap-4 rounded-[7px] sm:w-[48.5%] md:w-[47%] lg:w-[31.5%] sm:px-8 ">
        <span className="flex gap-1">
          {Stars < 5
            ? Array.from({ length: Stars }).map((_, i) => (
                <p
                  key={i}
                  className="bg-PurpleColor px-1.5 py-1.5 rounded-full w-max"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 text-YellowColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              ))
            : Array.from({ length: 5 }).map((_, i) => (
                <p
                  key={i}
                  className="bg-PurpleColor px-1.5 py-1.5 rounded-full w-max"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 text-YellowColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              ))}
        </span>
        <span>
          <h1 className="font-Inter font-bold text-[22px] sm:text-[19px] leading-[25px]">
            {RevTitle}
          </h1>
          <p className="text-[14.5px] font-Inter font-medium text-pretty text-Paracolor mt-2 sm:text-[12.5px]/5.5  ">
            <TruncatedText text={RevParagraph} maxLength={1000} />
          </p>
        </span>
        <div className="flex justify-center gap-3">
          <span>
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={RevImage}
              alt=""
            />
          </span>
          <span>
            <h4 className="font-Inter font-semibold text-[16px]">{UserName}</h4>
            <h6 className="font-Inter text-[13.5px] font-[500]">
              {Desination}
            </h6>
          </span>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
