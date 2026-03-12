import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const ComboboxSelection = ({
  options = [],
  onSelect,
  placeholder,
  disabled,
  style,
  icon,
  value,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    if (type === "Acount") {
      if (!value) {
        setSelected(null);
      } else {
        const found = options.find((opt) => opt.name === value);
        setSelected(found || null);
      }
    } else {
      if (!value || !value.name) {
        setSelected(null);
      } else {
        const found = options.find((opt) => opt.name === value.name);
        setSelected(found || null);
      }
    }
  }, [value, options]);


  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setQuery("");
    onSelect?.(option);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`overline-none text-[13px] font-Inter text-Paracolor font-[500] -mt-0.5 focus:outline-none cursor-pointer ${style}`}
      >
        {selected ? selected.name : placeholder}
        <ChevronDown
          className={`pointer-events-none absolute top-1 right-0.5 size-[16px] text-black ${icon}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 py-1 mt-1 w-full sm:w-[200px] rounded-md shadow-lg bg-[#f8f8f8] border border-gray-200 max-h-100 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-none outline-none"
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="px-2.5 text-[13px] font-Inter text-Paracolor font-[400] py-0.5 cursor-pointer hover:text-white hover:bg-PurpleColor"
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 font-Inter text-Paracolor">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboboxSelection;
