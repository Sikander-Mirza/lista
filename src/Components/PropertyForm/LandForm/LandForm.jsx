import React, { useState } from "react";
import Inputs from "../../InputFields/Inputs";
import Selection from "../../InputFields/Selection";
import Checkboxs from "../../InputFields/Checkboxs";
import { Textarea } from "@headlessui/react";
import NumberInputs from "../../InputFields/NumberInputs";
import { Controller } from "react-hook-form";

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

const LandForm = ({ propertyTypeName, register, watch, setValue, control }) => {
  const Check = watch("custom_fields.BuildingSize");
  return (
    <div className="border-[2px] rounded-[8px] px-4 border-solid border-[#ececec] mt-5 mb-5 bg-[#fcfcfc] py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 ">
        <span className="w-[100%]">
          <Selection
            labels={"Topography"}
            defaultOption={null}
            Options={["Flat", "Sloped", "Rolling", "Mixed"]}
            name={"custom_fields.Topography"}
            register={register}
            value={watch("custom_fields.Topography")}
          ></Selection>
        </span>
        <span className="">
          <Selection
            labels={"Flood Zone Status"}
            defaultOption={"Select Flood Zone Status"}
            Options={["Yes", "No"]}
            name={"custom_fields.zonestatus"}
            value={watch("custom_fields.BuildingSize")}
            register={register}
          ></Selection>
        </span>
        <span className="w-[100%]">
          <Selection
            labels={"Access Type"}
            defaultOption={"Select Access Type"}
            Options={["Public", "Road", "Easement", "Private Road"]}
            name={"custom_fields.Access"}
            register={register}
            value={watch("custom_fields.Access")}
          ></Selection>
        </span>

        <span className="w-[100%]">
          <Selection
            labels={"Mineral Rights"}
            defaultOption={"Select Mineral Rights"}
            Options={["Yes", "No"]}
            name={"custom_fields.Mineral"}
            register={register}
            value={watch("custom_fields.Mineral")}
          ></Selection>
        </span>
        <span className="w-[100%]">
          <Selection
            labels={"Environmental Clearances"}
            defaultOption={"Select"}
            Options={["Yes", "No"]}
            name={"custom_fields.Clearances"}
            register={register}
            value={watch("custom_fields.Clearances")}
          ></Selection>
        </span>
        <span className="lg:!w-[180%]">
          <span className="block mb-4 font-[700] text-PurpleColor text-[14.5px]">
          Utilities Available
          </span>
          <Controller
            name="custom_fields"
            control={control}
            render={({ field }) => (
              <div className="grid max-[400px]:grid-cols-1 grid-cols-2 gap-2 lg:grid-cols-4 md:gap-3">
                {[
                  { name: "Water", label: "Water" },
                  { name: "Sewer", label: "Sewer" },
                  { name: "Electricity", label: "Electricity" },
                  { name: "Gas", label: "Gas" },
                ].map((opt) => (
                  <Checkboxs
                    key={opt.name}
                    name={opt.name}
                    labels={opt.label}
                    checked={field.value?.[opt.name] || false}
                    onChange={(checked) =>
                      field.onChange({
                        ...field.value,
                        [opt.name]: checked,
                      })
                    }
                  />
                ))}
              </div>
            )}
          />
        </span>

        {/* <span className="w-[100%]">
          <NumberInputs
            labels={"‎"}
            type={"number"}
            placeholder={"Ex:1"}
            watch={watch}
            setValue={setValue}
            name={"custom_fields.LandScapeNumber"}
            register={register}
          ></NumberInputs>
        </span>
        <span className="w-[100%]">
          <NumberInputs
            labels={"‎"}
            type={"number"}
            placeholder={"Ex:10"}
            watch={watch}
            setValue={setValue}
            name={"custom_fields.LandScapeNumber2"}
            register={register}
          ></NumberInputs>
        </span>
        <span className="w-[100%]">
          <Selection
            labels={"‎"}
            defaultOption={"Select"}
            Options={["Acres", "Hectacres"]}
            name={"custom_fields.LandScapeAcres"}
            register={register}
            value={watch("custom_fields.LandScapeAcres")}
          ></Selection>
        </span> */}
      </div>
    </div>
  );
};

export default LandForm;
