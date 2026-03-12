import React, { useState } from "react";
import Inputs from "../../InputFields/Inputs";
import Selection from "../../InputFields/Selection";
import Checkboxs from "../../InputFields/Checkboxs";
import { Textarea } from "@headlessui/react";

import { Controller } from "react-hook-form";
import NumberInputs from "../../InputFields/NumberInputs";

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

const IndustrialForm = ({
  propertyTypeName,
  register,
  control,
  watch,
  setValue,
  PropertyRadio
}) => {
  return (
    <div className="border-[2px] rounded-[8px] px-4 border-solid border-[#ececec] mt-5 bg-[#fcfcfc] py-8">
      <div className="">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-5 md:gap-8">
          <span className="w-[100%]">
            <NumberInputs
              labels={"Ceiling Height (FT/M)"}
              type={"number"}
              placeholder={"Ex:1"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.CeilingHeight"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="w-[100%]">
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
          <span className="w-[100%]">
            <NumberInputs
              labels={"Overhead Doors"}
              type={"number"}
              placeholder={"Ex:1"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.OverheadDoors"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="w-[100%]">
            <NumberInputs
              labels={"Ground Level Docks"}
              type={"number"}
              placeholder={"Ex:75"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.GroundLevelDocks "}
              register={register}
            ></NumberInputs>
          </span>
          <span className="w-[100%]">
            <NumberInputs
              labels={"High Level Docks"}
              type={"number"}
              placeholder={"Ex:1"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.HighLevelDocks"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="w-[100%]">
            <NumberInputs
              labels={"BathRoom"}
              type={"number"}
              placeholder={"Ex:1"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.Bathroom"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="w-[100%]">
            <NumberInputs
              labels={"Lot Size (Sf)"}
              type={"number"}
              placeholder={"Ex:1"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.LotSize"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="">
            <Selection
              labels={"Crane"}
              defaultOption={"Select"}
              Options={["Yes", "No"]}
              name={"custom_fields.Crane"}
              register={register}
              value={watch("custom_fields.Crane")}
            ></Selection>
          </span>
          <span className="">
            <Selection
              labels={"Office/Meeting Room"}
              defaultOption={"Select"}
              Options={["Yes", "No"]}
              name={"custom_fields.office/meetingroom"}
              value={watch("custom_fields.office/meetingroom")}
              register={register}
            ></Selection>
          </span>
          <span className="">
            <Selection
              labels={"Stabilized Yard"}
              defaultOption={"Select"}
              Options={["Yes", "No"]}
              name={"custom_fields.stabilizedyard"}
              value={watch("custom_fields.stabilizedyard")}
              register={register}
            ></Selection>
          </span>
          <span className="">
            <Selection
              labels={"Fence"}
              defaultOption={"Select"}
              Options={["Yes", "No"]}
              name={"custom_fields.fence"}
              value={watch("custom_fields.fence")}
              register={register}
            ></Selection>
          </span>
          <span className="">
            <Selection
              labels={"Kitchen/Break Area"}
              defaultOption={"Select"}
              Options={["Yes", "No"]}
              name={"custom_fields.kitchen/breakArea"}
              value={watch("custom_fields.kitchen/breakArea")}
              register={register}
            ></Selection>
          </span>
        </div>
      </div>
      <div className="">
        <div className="pt-8 flex gap-4 flex-col">
          <span>
            <h1 className="font-Urbanist font-[500] -mb-3 text-[#242424]">
              Electrical Power
            </h1>
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-3 md:gap-5">
            <Controller
              name="custom_fields.120/240V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs
                  {...field}
                  name="custom_fields.120/240V"
                  labels="120/240V"
                />
              )}
            />
            <Controller
              name="custom_fields.120/208V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs
                  {...field}
                  name="custom_fields.120/208V"
                  labels="120/208V"
                />
              )}
            />
            <Controller
              name="custom_fields.240V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs {...field} name="custom_fields.240V" labels="240V" />
              )}
            />
            <Controller
              name="custom_fields.277/480V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs
                  {...field}
                  name="custom_fields.277/480V"
                  labels="277/480V"
                />
              )}
            />
            <Controller
              name="custom_fields.Other"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs
                  {...field}
                  name="custom_fields.Other"
                  labels="Other"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrialForm;
