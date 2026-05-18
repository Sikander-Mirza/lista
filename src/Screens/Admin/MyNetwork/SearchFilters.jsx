import React, { useEffect, useState } from "react";
import SortIcon from "../../../assets/Icons/SortIcon1.1.png";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import Selection from "../../../Components/InputFields/Selection";
import ComboboxSelector from "../../../Components/ComboboxSelector/ComboboxSelector";
import MultiSelectCombobox from "./MultiSelectionFilter/MultiSelectionFilter";
import MultiSelectDropdown from "./MultiSelectionFilter/MultiSelectionFilter";

const PropertyInterest = [
  { id: 1, name: "Apartments / Multifamily" },
  { id: 2, name: "Automotive Property" },
  { id: 3, name: "Church" },
  { id: 4, name: "Gas Station" },
  { id: 5, name: "Healthcare Facility" },
  { id: 6, name: "Hospitality" },
  { id: 7, name: "Industrial Building" },
  { id: 8, name: "Industrial Park" },
  { id: 9, name: "Mixed Use Property" },
  { id: 10, name: "Office Building" },
  { id: 11, name: "Recreation Center" },
  { id: 12, name: "Retail Center" },
  { id: 13, name: "School Building" },
  { id: 14, name: "Self-Storage Facility" },
  { id: 15, name: "Senior Living Facility" },
  { id: 16, name: "Shopping Center" },
  { id: 17, name: "Single-Tenant Retail Building" },
  { id: 18, name: "Strip Center" },
  { id: 19, name: "Vacant Land" },
  { id: 20, name: "Warehouse" },
  { id: 21, name: "Other" },
];

const statesArray = [
  { id: 57, name: "Any", code: "" },
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

const investmentRanges = [
  { label: "Under $250K", value: "under_250k" },
  { label: "$250K – $500K", value: "250k_500k" },
  { label: "$500K – $1M", value: "500k_1m" },
  { label: "$1M – $2.5M", value: "1m_2_5m" },
  { label: "$2.5M – $5M", value: "2_5m_5m" },
  { label: "$5M – $10M", value: "5m_10m" },
  { label: "$10M – $25M", value: "10m_25m" },
  { label: "$25M – $50M", value: "25m_50m" },
  { label: "Over $50M", value: "over_50m" },
];

const propertyTypess = [
  "Church",
  "Gas Station",
  "Hotel",
  "Industrial Park",
  "Medical Building",
  "Mixed Use",
  "Motel",
  "Office Building",
  "Recreation Center",
  "Retail Center",
  "Self-Storage Facility",
  "School Building",
  "Senior Living Facility",
  "Shopping Center",
  "Single Tenant Retail Building",
  "Storage Facility",
  "Vacant Land",
  "Warehouse",
  "Other",
];

const InvestmentRange = [
  "Any",
  "Under $250K",
  "$250K – $500K",
  "$500K – $1M",
  "$1M – $2.5M",
  "$2.5M – $5M",
  "$5M – $10M",
  "$10M – $25M",
  "$25M – $50M",
  "Over $50M",
];



const SearchFilters = ({ watch, setValue, register, control }) => {
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const DefaultSelection = useWatch({ control, name: "state" });
  const handleResetFilters = () => {
    setValue("propertyinterest", "");
    setValue("search", "");
    setValue("investmentRange", "");
    setValue("state", "");
    setSelectedStates([]);
    setSelectedInterests([]);
    setIsFilterOpen(false)
  };

  return (
    <>
      <section className="w-[100%] pt-5">
        {/* UPPER TAB  */}
        <div className="flex gap-2 xl:flex-col 2xl:flex-row items-center sm:gap-5 ">
          {/* SEARCH  */}
          <div className="relative max-[350px]:w-[70%] w-full 2xl:w-[40%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 sm:ps-4 pointer-events-none">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#444444] "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              title="Search by Investor name, Company and Keyword Filter by Property Type, Maximum Investment Amount, Investment Location"
              type="search"
              id="default-search"
              className=" w-[100%] text-[#444444] placeholder:text-[#444444] font-Urbanist font-semibold pl-9 max-[400px]:py-3.5 py-4 2xl:py-5 sm:py-3.5 sm:pl-11 rounded-[10px] text-[13px] sm:text-[15px] bg-[#F3EEFF] outline-none"
              placeholder="Search by Name, Company and Keyword"
              {...register("search")}
            />
          </div>
          {/* FILTER  */}
          {/* Desktop filter bar (hidden on mobile) */}
          <div className="hidden xl:flex gap- px-0 bg-white  w-[100%] border-[1px] border-solid border-[#1E1E1E] rounded-[10px]">
            {/* FILTER BUTTON  */}
            <button className=" font-Inter bg-[#1E1E1E] text-white py-2.5 rounded-l-[7px] flex items-center px-4 gap-1 w-[15%]">
              <img className="w-5 h-5" src={SortIcon} alt="Newlista" />{" "}
              <span className="font-Urbanist font-[500] text-[15px]">
                Filter
              </span>
            </button>
            {/* STATUS  */}
            <div className="border-r-[1px] border-solid border-[#BBBBBB] w-[22%]">
              <MultiSelectDropdown
                options={PropertyInterest}
                selectedValues={selectedInterests}
                setSelectedValues={setSelectedInterests}
                setValue={setValue}
                name="propertyinterest"
                placeholder="Investment Interest"
              />
            </div>
            <div className="border-r-[1px] border-solid border-[#BBBBBB] w-[24%]">
              <Selection
                defaultOption={"Investment Capacity"}
                Options={InvestmentRange}
                name={"investmentRange"}
                icon={"!top-3.5 !right-1.5"}
                register={register}
                Style={"bg-transparent border-none"}
              />
            </div>
            <div className=" border-r-[1px] border-solid border-[#BBBBBB] w-[24%]">
              <MultiSelectDropdown
                options={statesArray}
                selectedValues={selectedStates}
                setSelectedValues={setSelectedStates}
                setValue={setValue}
                name="state"
                placeholder="Investment Location"
              />
            </div>
            <div className="flex justify-center items-center w-[20%]">
              <button
                onClick={handleResetFilters}
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="font-Urbanist font-[500] text-[15px] text-[#E31D1C]">
                  Reset Filter
                </span>
                <RefreshCw size={16} className="text-[#E31D1C]" />
              </button>
            </div>
          </div>
          {/* Mobile filter button (visible only on small screens) */}
          <div className="flex xl:hidden  w-[30%] sm:w-[20%]   md:w-[17%] py-[11.8px] sm:py-3 md:py-[12.8px] max-[350px]:px-0 px-4 bg-[#1E1E1E] justify-center rounded-[10px]">
            <button
              onClick={() =>{ setIsFilterOpen(true) } }
              className=" text-white  flex items-center gap-2"
            >
              <img
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5"
                src={SortIcon}
                alt="Filter"
              />
              <span className="font-Urbanist font-medium text-[14px] sm:text-[15px] lg:text-[16px]">
                Filter
              </span>
            </button>
          </div>
          {/* Fullscreen filter drawer (visible when isFilterOpen === true) */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-white z-50 pt-20 px-5  flex flex-col gap-3">
              {/* Back Button */}
              <div className="flex items-center mb-4">
                <button
                  onClick={handleResetFilters}
                  className="text-[#1E1E1E] text-[18px] flex items-center gap-2 font-Urbanist  font-[600]"
                >
                  <ChevronLeft />
                  Back
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex flex-col gap-4">
                <button className="bg-[#1E1E1E] text-white py-2.5 px-4 rounded-[7px] flex items-center gap-2 w-full">
                  <img className="w-5 h-5" src={SortIcon} alt="Sort" />
                  <span className="font-Urbanist font-medium text-[14px]">
                    Sort by
                  </span>
                </button>
                <div>
                  <MultiSelectDropdown
                    options={PropertyInterest}
                    selectedValues={selectedInterests}
                    setSelectedValues={setSelectedInterests}
                    setValue={setValue}
                    name="propertyinterest"
                    placeholder="Select Investment Interest"
                  />
                </div>
                <div>
                  <Selection
                    defaultOption={"Investment Range"}
                    Options={InvestmentRange}
                    icon={"!top-3.5"}
                    name={"investmentRange"}
                    register={register}
                  />
                </div>
                <div>
                  <MultiSelectDropdown
                    options={statesArray}
                    selectedValues={selectedStates}
                    setSelectedValues={setSelectedStates}
                    setValue={setValue}
                    name="state"
                    placeholder="Select State(s)"
                  />
                </div>

                <button
                  onClick={() => {
                    setIsFilterOpen(false);
                  }}
                  className="flex items-center gap-2 justify-end mt-2"
                >
                  <span className="font-Urbanist font-medium text-[15.5px] rounded-[6px] text-white px-4 py-2 bg-PurpleColor">
                    Search
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchFilters;
