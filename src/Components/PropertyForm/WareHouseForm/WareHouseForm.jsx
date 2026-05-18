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

const WareHouseForm = ({
  propertyTypeName,
  register,
  control,
  watch,
  setValue,
  PropertyRadio
}) => {

  const Check = watch("custom_fields.BuildingSize");
  return (
    <div className="border-[2px] rounded-[8px] px-4 border-solid border-[#ececec] mt-5 bg-[#fcfcfc] py-8">
      <div className="">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-5 md:gap-8">
          {PropertyRadio !== "For Lease" &&
            <>
              <span className="w-[100%]">
                <Selection
                  labels={"Currency"}
                  Options={currencies}
                  defaultOption={"Select"}
                  register={register}
                  name={"custom_fields.Currency"}
                  value={watch("custom_fields.Currency")}
                ></Selection>
              </span>
              <span className="w-[100%]">
                <NumberInputs
                  labels={"Gross Scheduled Income (Annual) "}
                  type={"text"}
                  watch={watch}
                  setValue={setValue}
                  placeholder={"Ex: 10000"}
                  name={"custom_fields.MonthlyRental"}
                  register={register}
                ></NumberInputs>
              </span>
            </>
          }
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
          {/* <span className="w-[100%]">
            <Selection
              labels={"Land Scape"}
              defaultOption={"Select"}
              Options={["Sq Ft", "Sq M"]}
              name={"custom_fields.LandScape"}
              register={register}
              value={watch("custom_fields.LandScape")}
            ></Selection>
          </span> */}
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
            <Selection
              labels={"‎"}
              defaultOption={"Select"}
              Options={["Acres", "Hectacres"]}
              name={"custom_fields.LandScapeAcres"}
              register={register}
              value={watch("custom_fields.LandScapeAcres")}
            ></Selection>
          </span>
          <span className="w-[100%]">
            <NumberInputs
              labels={"‎"}
              type={"number"}
              watch={watch}
              setValue={setValue}
              placeholder={"Ex:10"}
              name={"custom_fields.LandScapeNumber2"}
              register={register}
            ></NumberInputs>
          </span> */}
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
              labels={"Parking Space"}
              type={"number"}
              placeholder={"Ex:1"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.ParkingSpace"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="w-[100%]">
            <NumberInputs
              labels={"Number of Docks"}
              type={"number"}
              placeholder={"Ex:1"}
              watch={watch}
              setValue={setValue}
              name={"custom_fields.NumberOfDocks"}
              register={register}
            ></NumberInputs>
          </span>
          <span className="w-[100%]">
            <Selection
              labels={"Building Class"}
              defaultOption={"Select"}
              Options={["A", "B", "C", "D"]}
              name={"custom_fields.BuildingClass"}
              register={register}
              value={watch("custom_fields.BuildingClass")}
            ></Selection>
          </span>
          <span className="w-[100%]">
            <NumberInputs
              labels={"Ground Level Docks"}
              type={"number"}
              placeholder={"Ex:2"}
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
              name="custom_fields.Phase3"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs
                  {...field}
                  name="custom_fields.Phase3"
                  labels="Phase 3"
                />
              )}
            />
            <Controller
              name="custom_fields.220V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs {...field} name="custom_fields.220V" labels="220V" />
              )}
            />
            <Controller
              name="custom_fields.230V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs {...field} name="custom_fields.230V" labels="230V" />
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
              name="custom_fields.380V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs {...field} name="custom_fields.380V" labels="380V" />
              )}
            />
            <Controller
              name="custom_fields.480V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs {...field} name="custom_fields.480V" labels="480V" />
              )}
            />
            <Controller
              name="custom_fields.110/120V "
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs
                  {...field}
                  name="custom_fields.110/120V"
                  labels="110 / 120V "
                />
              )}
            />
            <Controller
              name="custom_fields.100/127V"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkboxs
                  {...field}
                  name="custom_fields.100/127V"
                  labels="100 / 127V"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WareHouseForm;
