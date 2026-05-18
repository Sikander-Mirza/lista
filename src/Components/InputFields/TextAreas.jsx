import { Textarea } from "@headlessui/react";
import React from "react";

const TextAreas = ({ label, placeholder, name, register, require , error }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-1 text-[15px] font-[700] text-PurpleColor"
      >
        {label}
      </label>
      <Textarea
        required={require}
        className={
          `bg-[#F3EEFF] border placeholder:text-[#868686] font-[500] font-Urbanist text-[13.5px] sm:text-[15px] w-[100%]  px-4 rounded-[6px] outline-none py-5  ${error ? "border-red-500" : "border-[#F3EEFF]"}`
        }
        rows={6}
        name="description"
        placeholder={placeholder}
        {...register}
        // {...(register && typeof register === "function" ? register(name) : {})}
      ></Textarea>
      {error && (
        <p className="text-red-500 font-[500] text-[14px] pt-1 font-Urbanist tracking-wide">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default TextAreas;
