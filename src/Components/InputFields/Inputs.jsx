import React from "react";

const Inputs = ({
  labels,
  placeholder,
  type = "text",
  style = "",
  error,
  name,
  register,
  maxle,
  onInput,
}) => {
  const registrationProps =
    typeof register === "function" && name ? register(name) : register || {};

  return (
    <>
      <label
        htmlFor={name}
        className="block mb-1 font-[700] text-PurpleColor w-full max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px]"
      >
        {labels}
      </label>
      <input
        name={name}
        type={type}
        maxLength={maxle}
        onInput={onInput}
        {...registrationProps}
        className={`bg-[#F3EEFF] border border-solid text-[#1d1d1d] font-[600] font-Urbanist text-[14px] placeholder:text-[12.5px] sm:placeholder:text-[14px] w-full px-4 rounded-[6px] outline-none
            max-[481px]:h-11 max-[891px]:h-12 max-[1000px]:h-10.5 max-[1100px]:h-11
            max-[1280px]:h-11.5 max-[1666px]:h-12 min-[1666px]:h-14 min-[1666px]:text-[15px] min-[1666px]:placeholder:text-[15px]
            ${style} ${error ? "border-red-500" : "border-[#F3EEFF]"}
          `}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 font-[500] text-[14px] pt-1 font-Urbanist tracking-wide">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </>
  );
};

export default Inputs;
