import IntlTelInput from "intl-tel-input/react";
import React, { useState, useEffect, useRef } from "react";

const countries = [
  { code: "+1", label: "USA", flag: "https://flagcdn.com/w40/us.png" },
];

const CountrySelector = ({ phone, setPhone, countryCode, setCountryCode }) => {

  const [value, setValue] = useState("");   // <-- Declare value here
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  // STATES
  // const [countryCode, setCountryCode] = useS/tate("+91");
  const [isOpen, setIsOpen] = useState(false);
  // const [phone, setPhone] = useState("");

  // FIND COUNTRY AND SHOW
  const selectedCountry = countries.find((c) => c.code === countryCode);
  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent page reload
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <IntlTelInput
        initialValue={value}
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        // any initialisation options from the readme will work here
        initOptions={{
          initialCountry: "us",
          utilsScript:
            "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js",
        }}
      />
      <label
        htmlFor="phone"
        className="  text-[15px] font-[700] text-PurpleColor"
      >
        Phone Number
      </label>
      <div className="flex items-center gap-5 -mt-2">
        <div className="relative w-24" ref={dropdownRef}>
          {/* Custom Dropdown Button */}
          <button
            onClick={toggleDropdown}
            className="bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-3 rounded-[6px] flex items-center justify-between"
          >
            <img
              src={selectedCountry?.flag}
              alt={selectedCountry?.label}
              className="w-7.5 h-6.5"
            />
            <span>
              {selectedCountry?.label} ({selectedCountry?.code})
            </span>
            <svg
              className="w-4 h-4 text-gray-500 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown List */}
          {isOpen && (
            <div className="absolute left-0 top-full w-16 bg-[#F3EEFF] border border-[#F3EEFF] rounded-md mt-2 z-10 shadow-md">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCountryCode(c.code);
                    setIsOpen(false);
                  }}
                  className="flex justify-center items-center w-full px-2 py-2.5 text-left hover:bg-gray-200"
                >
                  <img src={c.flag} alt={c.label} className="w-7.5 h-6.5" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <div className="w-[100%]">
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            className="bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none"
            placeholder="Enter your phone number2"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>
    </>
  );
};

export default CountrySelector;
