import axios from "axios";
import { Grip, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import ComboboxSelector from "../ComboboxSelector/ComboboxSelector";
import { Select } from "@headlessui/react";
import Selection from "../InputFields/Selection";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../Reducers/filterSlice/filterSlice";

const propertyType = [
  { label: "Select Your Property", name: "Select Your Property" },
  { label: "Any", name: "All Properties" },
  { label: "Apartments / Multifamily", name: "Apartments / Multifamily" },
  { label: "Automotive Property", name: "Automotive Property" },
  { label: "Church", name: "Church" },
  { label: "Gas Station", name: "Gas Station" },
  { label: "Healthcare Facility", name: "Healthcare Facility" },
  { label: "Hospitality", name: "Hospitality" },
  { label: "Industrial Building", name: "Industrial Building" },
  { label: "Industrial Park", name: "Industrial Park" },
  { label: "Mixed Use Property", name: "Mixed Use Property" },
  { label: "Office Building", name: "Office Building" },
  { label: "Recreation Center", name: "Recreation Center" },
  { label: "Retail Center", name: "Retail Center" },
  { label: "School Building", name: "School Building" },
  { label: "Self-Storage Facility", name: "Self-Storage Facility" },
  { label: "Senior Living Facility", name: "Senior Living Facility" },
  { label: "Shopping Center", name: "Shopping Center" },
  {
    label: "Single-Tenant Retail Building",
    name: "Single-Tenant Retail Building",
  },
  { label: "Strip Center", name: "Strip Center" },
  { label: "Vacant Land", name: "Vacant Land" },
  { label: "Warehouse", name: "Warehouse" },
  { label: "Other", name: "Other" },
];

const initialCities = [
  { id: 1, labels: "Any", name: "Any" },
  { id: 1, labels: "Houston", name: "Houston" },
  { id: 2, labels: "Dallas", name: "Dallas" },
  { id: 3, labels: "Atlanta", name: "Atlanta" },
  { id: 4, labels: "Los Angeles", name: "Los Angeles" },
  { id: 5, labels: "Miami", name: "Miami" },
  { id: 6, labels: "Chicago", name: "Chicago" },
  { id: 7, labels: "Phoenix", name: "Phoenix" },
  { id: 8, labels: "Charlotte", name: "Charlotte" },
  { id: 9, labels: "Las Vegas", name: "Las Vegas" },
  { id: 10, labels: "New York", name: "New York" },
];

const statesArray = [
  { id: 57, name: "Any", code: "any" },
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
  { id: 47, name: "Washington", code: "WA" },
  { id: 48, name: "Washington D.C.", code: "DC" },
  { id: 49, name: "West Virginia", code: "WV" },
  { id: 50, name: "Wisconsin", code: "WI" },
  { id: 51, name: "Wyoming", code: "WY" },
  { id: 52, name: "Puerto Rico", code: "PR" },
  { id: 53, name: "U.S. Virgin Islands", code: "VI" },
  { id: 54, name: "Guam", code: "GU" },
  { id: 55, name: "American Samoa", code: "AS" },
  { id: 56, name: "Northern Mariana Islands", code: "MP" },
];

const MobileMenu = ({
  isFilterOpen,
  setIsFilterOpen,
  listingType,
  handleFilterChange,
}) => {




  

  const filters = useSelector((state) => state.filters);

  const navigate = useNavigate();
  const [cities, setCities] = useState(initialCities);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const ApiKey = import.meta.env.VITE_API_KEY;

  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  if(listingType){
    setValue("listingType" , listingType)
  }

  const propertyName = watch("propertyName");
  const priceRange = watch("priceRange");
  const state = watch("state");
  const city = watch("city");

  const onSubmit = () => {
    const data = {
      listingType: getValues("listingType"),
      propertyName: getValues("propertyName"),
      state: selectedState,
      city: selectedCity,
      priceRange: getValues("priceRange"),
    };
    setIsFilterOpen(false)
    dispatch(setFilters(data));
    if (location.pathname !== "/properties") {
      navigate("/properties");
    }
  };


  useEffect(() => {
    if (filters) {
      if (filters.listingType) setValue("listingType", filters.listingType);
      if (filters.propertyName) setValue("propertyName", filters.propertyName);
      if (filters.priceRange) setValue("priceRange", filters.priceRange);
      if (filters.state) {
        setValue("state", filters.state);
        setSelectedState(filters.state);
      }
      if (filters.city) {
        setValue("city", filters.city);
        setSelectedCity(filters.city);
      }
    }
  }, [filters, setValue]);

  const StateSelectionHandler = (value) => {
    if (!value || !value.name) return;
    setValue("state", value.name, { shouldValidate: true });
    setSelectedState(value.name);
  };

  useEffect(() => {
    async function fetchAndAddCities() {
      try {
        const response = await axios.get(`${ApiKey}/properties`);
        const properties = response.data.data;

        setCities((prevCities) => {
          const citySet = new Set(prevCities.map((c) => c.name.toLowerCase()));

          const newCities = [];

          properties.forEach((p) => {
            const cityName = p.city?.trim();
            if (cityName && !citySet.has(cityName.toLowerCase())) {
              citySet.add(cityName.toLowerCase());
              newCities.push(cityName);
            }
          });

          if (newCities.length > 0) {
            const startId = prevCities.length > 0 ? Math.max(...prevCities.map((c) => c.id)) + 1 : 1;

            const newCityObjects = newCities.map((cityName, index) => ({
              id: startId + index,
              labels: cityName,
              name: cityName,
            }));

            return [...prevCities, ...newCityObjects];
          }

          return prevCities;
        });
      } catch (error) {
      }
    }

    fetchAndAddCities();
  }, [ApiKey]);


  const CitySelectionHandler = (value) => {
    if (!value || !value.labels) return;

    setValue("city", value.labels, { shouldValidate: true });
    setSelectedCity(value.labels);
  };

  return (
    <div className="relative overflow-scroll">
      {/* Mobile filter button (visible only on small screens) */}
      <div className="sm:hidden w-0">
        <button
          onClick={() => {
            setIsFilterOpen(true);
          }}
        ></button>
      </div>
      {/* Fullscreen filter drawer (visible when isFilterOpen === true) */}
      {isFilterOpen && (
        <div className="fixed inset-0 md:w-[40%] bg-white z-50 pt-10 px-5  flex flex-col gap-3 overflow-scroll">
          {/* Back Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-[#1E1E1E] text-[18px] flex items-center gap-2 font-Urbanist  font-[600]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Selection
                Options={["For Sale", "For Lease" , "Off Market Listing"]}
                labels={"ㅤ"}
                // SelectOption={listingType}
                name="listingType"
                register={register}
              ></Selection>
            </div>
            {/* PROPERTY TYPE  */}
            <div className="relative">
              <label className="block mb-1 font-[700] text-PurpleColor w-[100%] max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px]">
                {"Property Type"}
              </label>
              <select
                {...register("propertyName")}
                aria-label="Project status"
                className={
                  "bg-[#F3EEFF] border-[#F3EEFF]  text-[#4b4b4b] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none cursor-pointer focus:outline-none"
                }
              >
                {propertyType.map((item, index) => (
                  <option
                    key={index}
                    className="outline-none font-Inter text-[11px]"
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                className={`group pointer-events-none absolute top-10 right-2.5 size-5 fill-black text-black `}
                aria-hidden="true"
              />
            </div>

            {/* STATES  */}
            <div>
              <label className="block mb-1 font-[700] text-PurpleColor w-[100%] max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px]">
                {"State"}
              </label>
              <div className="bg-[#F3EEFF] border-[#F3EEFF]  text-[#4b4b4b] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none cursor-pointer focus:outline-none flex flex-col justify-center">
                <ComboboxSelector
                  options={statesArray}
                  onSelect={StateSelectionHandler}
                  placeholder="Select Your State"
                />
              </div>
            </div>

            {/* CITY  */}
            <div>
              <label className="block mb-1 font-[700] text-PurpleColor w-[100%] max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px]">
                {"City"}
              </label>
              <div className="bg-[#F3EEFF] border-[#F3EEFF]  text-[#4b4b4b] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none cursor-pointer focus:outline-none flex flex-col justify-center">
                <ComboboxSelector
                  options={cities}
                  onSelect={CitySelectionHandler}
                  placeholder="Select Your City"
                />
              </div>
            </div>

            {/* PRICE RANGE  */}
            <div>
              <Selection
                Options={[
                  "Under $250K",
                  "$250K – $500K",
                  "$500K – $1M",
                  "$1M – $2.5M",
                  "$2.5M – $5M",
                  "$5M – $10M",
                  "$10M – $25M",
                  "$25M – $50M",
                  "Over $50M",
                ]}
                defaultOption={"Choose Price Range"}
                labels={" Price Range"}
                name="priceRange"
                register={register}
              ></Selection>
            </div>

            <button
              onClick={onSubmit}
              className="hover-btn hover-btn-purple w-[40%] text-white px-4 pr-7 py-2 mt-4 text-[14px] cursor-pointer"
            >
              <span className="flex gap-2 justify-center items-center font-Urbanist font-[600]">
                <Search size={19} />
                Search
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
