import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "../../Components/Icons/Icons";
import clsx from "clsx";

export default function MultiSelectDropdown({
  options = [],
  selectedValues = [],
  setSelectedValues,
  setValue, 
  name = "multiSelect", 
  placeholder = "Select Options",
  displayField = "name", 
  valueField = "name",   
  className = "",       
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const toggleSelection = (item) => {
    const itemValue = item[valueField];
    const alreadySelected = selectedValues.includes(itemValue);
    const updated = alreadySelected
      ? selectedValues.filter((val) => val !== itemValue)
      : [...selectedValues, itemValue];

    setSelectedValues(updated);
    if (setValue) setValue(name, updated);
  };


  return (
    <div ref={dropdownRef} className={`text-black py-2 w-full max-w-md relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-10 px-4 text-left rounded-[6px] font-Urbanist font-[600] text-[14px] text-Paracolor bg-[#f3eeff] lg:bg-white truncate cursor-pointer relative"
      >
        {selectedValues.length === 0
          ? placeholder
          : selectedValues.join(", ")}
        <ChevronDownIcon className="absolute right-2 top-2.5 w-5 h-5 text-gray-500" />
      </button>

      {isOpen && (
        <ul className="mt-1 max-h-60 absolute z-50 w-full overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg">
          {options.map((item) => {
            const itemValue = item[valueField];
            const isSelected = selectedValues.includes(itemValue);

            return (
              <li
                key={item.id}
                onClick={() => toggleSelection(item)}
                className={clsx(
                  "flex items-center justify-between px-3 py-1 font-[500] text-[14.5px] rounded-md cursor-pointer select-none font-Urbanist",
                  isSelected ? "font-semibold bg-purple-100" : "hover:bg-gray-100"
                )}
              >
                <span>{item[displayField]}</span>
                {isSelected && <CheckIcon className="w-4 h-4 text-purple-600" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
