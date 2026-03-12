import React, { useEffect, useState } from "react";
import Inputs from "../../../../Components/InputFields/Inputs";
import ComboboxSelector from "../../../../Components/ComboboxSelector/ComboboxSelector.jsx";
import { useWatch } from "react-hook-form";
import axios from "axios";
import CitySearchForm from "../../../Admin/AccountSetting/Fields/CitySelectionField.jsx";

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

const AddressFields = ({
  register,
  errors,
  setValue,
  trigger,
  control,
  watch,
  defaultValues
}) => {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Build cities option list
  const citiess = cities.map((name, index) => ({
    id: index + 1,
    name,
  }));
  const DefaultSelection = useWatch({ control, name: "state" });

  useEffect(() => {
    if (defaultValues?.state) {
      const matchedState = statesArray.find(
        (s) => s.name.toLowerCase() === defaultValues.state.toLowerCase()
      );

      if (matchedState?.code) {
        setValue("state", matchedState.name);
        setSelectedState(matchedState.name); 

        axios
          .get(`/states/${matchedState.code}.json`)
          .then((res) => setCities(res.data))
          .catch((error) => {
            setCities([]);
          });
      }
    }
  }, [defaultValues?.state]);


  const StateSelectionHandler = (value) => {
    setValue("state", value.name, { shouldValidate: true });
    trigger("state");
    // reset cities
    let state = value.name;
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);

    if (defaultValues.state || state) {
      const stateShortNames = value.code;
      axios
        .get(`/states/${stateShortNames}.json`)
        .then((res) => setCities(res.data))
        .catch((error) => {
          setCities([]);
        });
    }
  };
  const selectedCitys = useWatch({ control, name: "city" });

  return (
    <>
      <div className="flex flex-col gap-6 py-8 border-[#BBBBBB] border-t-[1px] ">
        <div>
          <Inputs
            labels={"Property Address"}
            type={"text"}
            placeholder={"Enter Full Address"}
            register={register("PropertyAddress", {
              required: "Property Address is required",
            })}
            error={errors.PropertyAddress?.message}
          ></Inputs>
        </div>
        <div className="flex justify-between flex-wrap md:flex-nowrap gap-5 md:gap-8">
          <span className="w-[100%] sm:w-[45%] md:w-[100%]">
            <label className="block mb-1 font-[700] text-PurpleColor w-full max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px]">
              State
            </label>
            <ComboboxSelector
              style={`flex items-center bg-[#F3EEFF] text-[#4b4b4b] font-[600] font-Urbanist text-[14px] w-full h-12 px-4 rounded-[6px] outline-none appearance-none cursor-pointer focus:outline-none ${errors.state ? "border border-red-500" : ""
                }`}
              icon={"top-3.5 right-3.5"}
              options={statesArray}
              onSelect={StateSelectionHandler}
              placeholder={"Select state or province"}
              value={DefaultSelection}
              type="Acount"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                State or province is required.
              </p>
            )}
            <input type="hidden" {...register("state", { required: true })} />
          </span>

          <span className="w-[100%] sm:w-[50%] md:w-[100%]">
            <label className="block mb-1 font-[700] text-PurpleColor w-full max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px]">
              City
            </label>
            <CitySearchForm
              error={errors.city}
              setValue={setValue}
              watch={watch}
              register={register}
              suggestedCities={citiess}
            ></CitySearchForm>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">City is required.</p>
            )}
          </span>
          <span className="w-[100%] sm:w-[45%] md:w-[100%]">
            <Inputs
              labels={"Zip / Postal Code"}
              type={"text"}
              placeholder={"Enter Zip /Postal Codes"}
              register={register("ZipPostalCode", {
                required: "Zip/PostalCode is required",
              })}
              error={errors.ZipPostalCode?.message}
            ></Inputs>
          </span>
        </div>
      </div>
    </>
  );
};

export default AddressFields;
