import React, { useEffect, useState } from "react";

const CitySearchForm = ({
  setValue,
  watch,
  register,
  suggestedCities,
  error,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const watchedCity = watch("city", "");
  const [inputValue, setInputValue] = useState(watchedCity);

  useEffect(() => {
    setInputValue(watchedCity);
  }, [watchedCity]);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setValue("city", value, { shouldValidate: true }); // ✅

    if (value.trim() === "") {
      setFilteredSuggestions(suggestedCities);
    } else {
      const filtered = suggestedCities.filter((cityObj) =>
        cityObj.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }

    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (cityName) => {
    setInputValue(cityName);
    setValue("city", cityName, { shouldValidate: true }); // ✅
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        setValue("city", inputValue, { shouldValidate: true }); // ✅
        setShowSuggestions(false);
      }
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search city..."
        {...register("city", { required: true })}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          setFilteredSuggestions(suggestedCities);
          setShowSuggestions(true);
        }}
        disabled={suggestedCities.length === 0}
        onBlur={() => setShowSuggestions(false)}
        onKeyDown={handleKeyDown}
        className={`bg-[#F3EEFF] border border-solid text-[#1d1d1d] font-[600] font-Urbanist text-[14px] placeholder:text-[12.5px] sm:placeholder:text-[14px] w-full px-4 rounded-[6px] outline-none
            max-[481px]:h-11 max-[891px]:h-12 max-[1000px]:h-10.5 max-[1100px]:h-11
            max-[1280px]:h-11.5 max-[1666px]:h-12 min-[1666px]:h-14 min-[1666px]:text-[15px] min-[1666px]:placeholder:text-[15px]
            ${error ? "border-red-500" : "border-[#F3EEFF]"}
             ${suggestedCities.length === 4
            ? "opacity-100 cursor-not-allowed"
            : ""
          }
            
          `}
        autoComplete="off"
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="mt-2 lg:w-[13%] bg-white py-1 border absolute border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto">
          {filteredSuggestions.map((cityObj) => (
            <div
              key={cityObj.id}
              onMouseDown={() => handleSelectSuggestion(cityObj.name)}
              className="px-2.5 text-[13.5px] py-1 font-Inter text-Paracolor font-[400] cursor-pointer hover:text-white hover:bg-PurpleColor"
            >
              {cityObj.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CitySearchForm;
