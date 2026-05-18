import React, { useState } from "react";

const statesArray = [
  { id: 1, name: "Alabama", code: "AL" },
  { id: 2, name: "Alaska", code: "AK" },
  { id: 3, name: "Arizona", code: "AZ" },
  { id: 4, name: "Arkansas", code: "AR" },
  { id: 5, name: "California", code: "CA" },
  { id: 6, name: "Colorado", code: "CO" },
  { id: 7, name: "Connecticut", code: "CT" },
  { id: 8, name: "Delaware", code: "DE" },
  { id: 9, name: "Florida", code: "FL" },
  { id: 10, name: "Georgia", code: "GA" },
  { id: 11, name: "Hawaii", code: "HI" },
  { id: 12, name: "Idaho", code: "ID" },
  { id: 13, name: "Illinois", code: "IL" },
  { id: 14, name: "Indiana", code: "IN" },
  { id: 15, name: "Iowa", code: "IA" },
  { id: 16, name: "Kansas", code: "KS" },
  { id: 17, name: "Kentucky", code: "KY" },
  { id: 18, name: "Louisiana", code: "LA" },
  { id: 19, name: "Maine", code: "ME" },
  { id: 20, name: "Maryland", code: "MD" },
  { id: 21, name: "Massachusetts", code: "MA" },
  { id: 22, name: "Michigan", code: "MI" },
  { id: 23, name: "Minnesota", code: "MN" },
  { id: 24, name: "Mississippi", code: "MS" },
  { id: 25, name: "Missouri", code: "MO" },
  { id: 26, name: "Montana", code: "MT" },
  { id: 27, name: "Nebraska", code: "NE" },
  { id: 28, name: "Nevada", code: "NV" },
  { id: 29, name: "New Hampshire", code: "NH" },
  { id: 30, name: "New Jersey", code: "NJ" },
  { id: 31, name: "New Mexico", code: "NM" },
  { id: 32, name: "New York", code: "NY" },
  { id: 33, name: "North Carolina", code: "NC" },
  { id: 34, name: "North Dakota", code: "ND" },
  { id: 35, name: "Ohio", code: "OH" },
  { id: 36, name: "Oklahoma", code: "OK" },
  { id: 37, name: "Oregon", code: "OR" },
  { id: 38, name: "Pennsylvania", code: "PA" },
  { id: 39, name: "Rhode Island", code: "RI" },
  { id: 40, name: "South Carolina", code: "SC" },
  { id: 41, name: "South Dakota", code: "SD" },
  { id: 42, name: "Tennessee", code: "TN" },
  { id: 43, name: "Texas", code: "TX" },
  { id: 44, name: "Utah", code: "UT" },
  { id: 45, name: "Vermont", code: "VT" },
  { id: 46, name: "Virginia", code: "VA" },
  { id: 47, name: "Washington", code: "WA" }, // U.S. State
  { id: 48, name: "Washington D.C.", code: "DC" }, // Federal District
  { id: 49, name: "West Virginia", code: "WV" },
  { id: 50, name: "Wisconsin", code: "WI" },
  { id: 51, name: "Wyoming", code: "WY" },
  { id: 52, name: "Puerto Rico", code: "PR" },
  { id: 53, name: "U.S. Virgin Islands", code: "VI" },
  { id: 54, name: "Guam", code: "GU" },
  { id: 55, name: "American Samoa", code: "AS" },
  { id: 56, name: "Northern Mariana Islands", code: "MP" },
];

const SuggestedState = ({ onSelect, register, errors }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value); 
    const filtered = statesArray.filter((state) =>
      state.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered); 
  };

  const handleFocus = () => {
    if (!inputValue.trim()) {
      setSuggestions(statesArray);
    }
  };

  const handleSelect = (state) => {
    setInputValue(state.name);
    setSuggestions([]);
    if (onSelect) onSelect(state);
    setInputValue("")

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const match = statesArray.find(
        (s) => s.name.toLowerCase() === inputValue.toLowerCase()
      );
      if (match) {
        handleSelect(match);
        e.preventDefault();
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100); // Timeout to allow click on suggestion before it disappears
  };

  return (
    <div className="relative w-full">
      <input
        {...register("preferred_locations", {
          validate: (value) => value.length > 0 || "Please select at least one",
        })}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Search Preferred Investment Location"
        className="w-full text-[13px] p-2 rounded bg-[#F3EEFF] text-sm py-3.5 font-Urbanist font-[600] outline-none focus:outline-none"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-[50%] bg-white mt-1 rounded shadow max-h-40 overflow-auto">
          {suggestions.map((state) => (
            <li
              key={state.code}
              onMouseDown={() => handleSelect(state)}
              className="px-4 py-2 text-[13px] border-b border-[#d6d6d6] hover:bg-gray-100 cursor-pointer font-Urbanist font-[600]"
            >
              {state.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestedState;
