// OtpInput.jsx
import React, { useEffect, useRef } from "react";

const OtpInput = ({ length = 6, value = "", onChange, error }) => {
  const inputsRef = useRef([]);

  // Keep OTP in array form for managing individual inputs
  const otp = value.split("").concat(Array(length).fill("")).slice(0, length);

  const focusInput = (index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].focus();
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    onChange(newOtp.join(""));

    if (index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
        onChange(newOtp.join(""));
      } else if (index > 0) {
        focusInput(index - 1);
        newOtp[index - 1] = "";
        onChange(newOtp.join(""));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, length).replace(/\D/g, "").split("");

    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (i < length) {
        newOtp[i] = char;
      }
    });

    onChange(newOtp.join(""));
    if (pasted.length < length) {
      focusInput(pasted.length);
    } else {
      inputsRef.current[length - 1].blur();
    }
  };

  return (
    <div className="flex gap-2 min-[410px]:gap-4">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={`w-9 h-10 min-[410px]:w-11 min-[410px]:h-12 text-center border outline-none rounded-md text-lg font-medium ${
            error ? "border-red-600" : "border-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
