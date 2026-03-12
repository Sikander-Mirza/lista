import React, { useState, useEffect } from "react";

const formatNumber = (value) => {
  if (!value) return "";
  const cleaned = value.toString().replace(/,/g, "");
  const number = parseFloat(cleaned);
  if (isNaN(number)) return "";
  return number.toLocaleString("en-US");
};

const NumberInputs = ({
  labels,
  placeholder,
  type = "text",
  style = "",
  error,
  name,
  register,
  setValue,
  watch,
}) => {
  const watchedValue = watch?.(name);

  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    if (watchedValue !== undefined) {
      setLocalValue(formatNumber(watchedValue));
    }
  }, [watchedValue]);

  const registrationProps =
    typeof register === "function" && name ? register(name) : register || {};

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      setLocalValue(formatNumber(rawValue));

      // Update react-hook-form
      setValue?.(name, rawValue, {
        shouldValidate: true,
        shouldDirty: true,
      });

      registrationProps.onChange?.({
        ...e,
        target: {
          ...e.target,
          name,
          value: rawValue,
        },
      });
    }
  };

  return (
    <>
      {labels && (
        <label
          htmlFor={name}
          className="block mb-1 font-[700] text-PurpleColor text-[14.5px]"
        >
          {labels}
        </label>
      )}
      <input
        name={name}
        type="text"
        inputMode="numeric"
        value={localValue}
        setValue={setValue}
        watch={watch}
        onChange={handleChange}
        onBlur={registrationProps.onBlur}
        ref={registrationProps.ref}
        className={`bg-[#F3EEFF] border border-solid text-[#1d1d1d] font-[600] font-Urbanist text-[14px] placeholder:text-[12.5px] sm:placeholder:text-[14px] w-full px-4 rounded-[6px] outline-none max-[481px]:h-11 max-[891px]:h-12 max-[1000px]:h-10.5 max-[1100px]:h-11 max-[1280px]:h-11.5 max-[1666px]:h-12 min-[1666px]:h-14 min-[1666px]:text-[15px] min-[1666px]:placeholder:text-[15px] ${style} ${
          error ? "border-red-500" : "border-[#F3EEFF]"
        }`}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 font-Urbanist">{error}</p>
      )}
    </>
  );
};

export default NumberInputs;
