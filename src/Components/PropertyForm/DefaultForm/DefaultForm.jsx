import React, { useEffect, useState } from "react";
import Inputs from "../../InputFields/Inputs";
import Selection from "../../InputFields/Selection";
import NumberInputs from "../../InputFields/NumberInputs";
import { DollarSign } from "lucide-react";
import { Controller, useWatch } from "react-hook-form";
const currencies = [
  "USD",
  "EUR",
  "CAD",
  "HKD",
  "ISK",
  "PHP",
  "DKK",
  "HUF",
  "CZK",
  "AUD",
  "RON",
  "SEK",
  "IDR",
  "INR",
  "BRL",
  "RUB",
  "HRK",
  "JPY",
  "THB",
  "CHF",
  "SGD",
  "PLN",
  "BGN",
  "TRY",
  "CNY",
  "NOK",
  "NZD",
  "ZAR",
  "MXN",
  "ILS",
  "GBP",
  "KRW",
  "MYR",
];
const DefaultForm = ({
  propertyTypeName,
  register,
  watch,
  setValue,
  control,
  PropertyRadios
}) => {
  // should log: "434"

  const Check = watch("custom_fields.BuildingSize");

  const formatNumber = (value) => {
    if (!value) return "";

    // Split into integer and decimal parts
    const [integer, decimal] = value.split(".");

    const formattedInteger = new Intl.NumberFormat("en-US").format(
      integer.replace(/\D/g, "")
    );

    // Return joined value
    return decimal !== undefined
      ? `${formattedInteger}.${decimal}`
      : formattedInteger;
  };

  const handleInputChange = (e, onChange) => {
    let value = e.target.value.replace(/,/g, "");

    // Allow only digits and one optional decimal point
    if (!/^\d*\.?\d*$/.test(value)) return;

    // Special case: user types just "." — convert to "0."
    if (value === ".") value = "0.";

    onChange(formatNumber(value));
  };

  return (
    <div className="border-[2px] rounded-[8px] px-4 border-solid border-[#ececec] mb-10 bg-[#fcfcfc] py-8">
      <div className="flex flex-col gap-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-end md:gap-8">
          {!(
            PropertyRadios === "For Lease" &&
            [
              "Church",
              "Gas Station",
              "Healthcare Facility",
              "Hospitality",
              "Industrial Building",
              "Mixed Use Property",
              "Office Building",
              "Recreation Center",
              "Retail Center",
              "School Building",
              "Self-Storage Facility",
              "Senior Living Facility",
              "Shopping Center",
              "Single-Tenant Retail Building",
              "Strip Center",
              "Warehouse",
              "Other"
            ].includes(propertyTypeName)
          ) && (
              <>
                <span className="">
                  <Selection
                    labels={"Currency"}
                    Options={currencies}
                    defaultOption={"Select"}
                    name={"custom_fields.Currency"}
                    register={register}
                    value={watch("custom_fields.Currency")}
                  />
                </span>

                <span className="">
                  <NumberInputs
                    labels={"Gross Scheduled Income (Annual)"}
                    type={"text"}
                    watch={watch}
                    setValue={setValue}
                    placeholder={"Ex: 10000"}
                    name={"custom_fields.MonthlyRental"}
                    register={register}
                  />
                </span>
              </>
            )}

          <span className="">
            <NumberInputs
              labels={"Lot Size"}
              type={"text"}
              watch={watch}
              setValue={setValue}
              placeholder={`Enter size in ${Check ? Check : "Unit"} (e.g., 10,000)`}
              name={"custom_fields.BuildingSizeNumber"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="">
            <Selection
              labels={"Units"}
              defaultOption={"Select"}
              Options={["Sq Ft", "Sq M"]}
              name={"custom_fields.BuildingSize"}
              value={watch("custom_fields.BuildingSize")}
              register={register}
            ></Selection>
          </span>

          <span className="">
            <NumberInputs
              labels={"Building Levels"}
              type={"text"}
              watch={watch}
              setValue={setValue}
              placeholder={"Ex:1"}
              name={"custom_fields.BuildingLevels"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="">
            <Inputs
              labels={"Year Built"}
              type={"number"}
              watch={watch}
              setValue={setValue}
              placeholder={"2020"}
              name={"custom_fields.YearBuilt"}
              register={register}
              min={"1900"}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
              }}
            ></Inputs>
          </span>
          <span className="">
            <Selection
              labels={"Tenancy"}
              defaultOption={"Select"}
              Options={["Multiple", "Single"]}
              name={"custom_fields.Tenancy"}
              value={watch("custom_fields.Tenancy")}
              register={register}
            ></Selection>
          </span>
          <span className="">
            <NumberInputs
              labels={"Parking Spaces"}
              type={"text"}
              placeholder={"Ex:1"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.ParkingSpace"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="relative ">
            <label className="block mb-1 font-[700] text-PurpleColor text-[14px]">
              {"CAM (Common Area Maintenance)"}
            </label>
            <div className="flex items-end">
              <span className="px-2 bg-[#F3EEFF] py-3.5 rounded-l-[5px]">
                <DollarSign className="size-4 top-4 md:size-4.5 lg:size-5" />
              </span>
              <span className="w-full">
                <Controller
                  name="custom_fields.CAM"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="text"
                      inputMode="decimal"
                      value={value}
                      onChange={(e) => handleInputChange(e, onChange)}
                      placeholder="Ex: $1.00"
                      className="bg-[#F3EEFF]  border-solid text-[#1d1d1d] font-[600] font-Urbanist text-[14px] placeholder:text-[12.5px] sm:placeholder:text-[14px] w-full px-4 rounded-r-[6px] outline-none max-[481px]:h-11 max-[891px]:h-12 max-[1000px]:h-10.5 max-[1100px]:h-11 max-[1280px]:h-11.5 max-[1666px]:h-12 min-[1666px]:h-14 min-[1666px]:text-[15px] min-[1666px]:placeholder:text-[15px] "
                    />
                  )}
                />
              </span>
            </div>
          </span>
          <span className="">
            <NumberInputs
              labels={"Number of Units"}
              type={"text"}
              placeholder={"Ex:1"}
              name={"custom_fields.NumberOfUnits"}
              register={register}
              watch={watch}
              setValue={setValue}
            ></NumberInputs>
          </span>
          <span className="">
            <Selection
              labels={"Building Class"}
              defaultOption={"Select"}
              Options={["A", "B", "C", "D"]}
              name={"custom_fields.BuildingClass"}
              register={register}
              value={watch("custom_fields.BuildingClass")}
            ></Selection>
          </span>
          <span className="">
            <NumberInputs
              labels={"Occupancy %"}
              type={"text"}
              watch={watch}
              setValue={setValue}
              placeholder={"Ex: 75"}
              name={"custom_fields.PercentageLeased"}
              register={register}
            ></NumberInputs>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DefaultForm;
