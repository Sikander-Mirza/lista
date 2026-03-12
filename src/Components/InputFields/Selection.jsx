import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Selection = ({
  labels,
  defaultOption,
  Options,
  Style,
  value,
  onChange,
  register,
  name,
  error,
  icon,
  rules,
  autoSelectFirst = false,
}) => {
  const [Optionss, setOptions] = useState([]);

  useEffect(() => {
    if (Array.isArray(Options)) {
      setOptions(Options);
    }
  }, [Options]);

  return (
    <>
      <div className={`relative ${Style}`}>
        <label
          htmlFor={name}
          className="block mb-1 font-[700] text-PurpleColor w-full text-[14px] lg:text-[15px]"
        >
          {labels}
        </label>
        <select
          id={name}
          name={name}
          className={`bg-[#F3EEFF] border text-[#4b4b4b] font-[600] font-Urbanist sm:text-[14px] w-full h-12 px-4 rounded-[6px] outline-none appearance-none cursor-pointer text-[12.5px]  focus:outline-none ${Style} ${
            error ? "border-red-500" : "border-[#F3EEFF]"
          }`}
          value={value}
          onChange={onChange}
          {...(register && typeof register === "function"
            ? { ...register(name, rules) }
            : {})}
        >
          {!autoSelectFirst && (
            <option value="" className="">
              {defaultOption || "Select an option"}
            </option>
          )}
          {Optionss.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <ChevronDownIcon
          className={`pointer-events-none absolute top-10 right-2.5 size-5 fill-black text-black ${Style} ${icon}`}
          aria-hidden="true"
        />
      </div>
      {error && (
        <p className="text-red-500 font-[500] text-[14px] pt-1 font-Urbanist">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </>
  );
};

export default Selection;
