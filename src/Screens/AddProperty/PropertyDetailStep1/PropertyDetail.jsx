import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import DefaultForm from "../../../Components/PropertyForm/DefaultForm/DefaultForm.jsx";
import RentailForm from "../../../Components/PropertyForm/RentailForm/RentailForm.jsx";
import LandForm from "../../../Components/PropertyForm/LandForm/LandForm.jsx";
import WareHouseForm from "../../../Components/PropertyForm/WareHouseForm/WareHouseForm.jsx";
// import RadioButton from "../../../Components/InputFields/RadioButton.jsx";

// SCHEMA
import PropertyDetailSchema from "../../../Schema/AddPropertySchema/PropertyDetailSchema.js";
import AddressFields from "./PropertyDetailSections/AddressFields.jsx";
import ListingVisibilitySwitches from "./PropertyDetailSections/ListingVisibilitySwitches.jsx";
import TextAreas from "../../../Components/InputFields/TextAreas.jsx";
import PropertyRadios from "./PropertyDetailSections/PropertyRadio.jsx";
import PropertytypeSelection from "./PropertyDetailSections/PropertytypeSelection.jsx";
import FormattedNumberInput from "../../../Components/InputFields/NumberInputs.jsx";
import Inputs from "../../../Components/InputFields/Inputs.jsx";
import NumberInputs from "../../../Components/InputFields/NumberInputs.jsx";
import IndustrialForm from "../../../Components/PropertyForm/IndustrialForm/IndustrialForm.jsx";
import CustomCheckBox from "./PropertyDetailSections/CustomCheckBox.jsx";

const Step1 = ({ onNext, defaultValues, prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    control,
    setValue,
    reset,
    trigger
  } = useForm({
    defaultValues,
    leaseRateMin: "",
    leaseRateMax: "",
    leaseRate: "",
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);





    }
  }, [defaultValues, reset]);

  // CHECK RADIO VALUE
  const PropertyRadio = watch("propertyType");
  const propertyType = watch("propertyName");


  const renderFormFields = () => {
    switch (propertyType) {
      case "Retail Center":
        return (
          <RentailForm
            watch={watch}
            PropertyRadio={PropertyRadio}
            setValue={setValue}
            register={register}
            propertyTypeName={propertyType}
          />
        );
      case "Warehouse":
        return (
          <WareHouseForm
            register={register}
            control={control}
            PropertyRadio={PropertyRadio}
            watch={watch}
            setValue={setValue}
            propertyTypeName={propertyType}
          />
        );
      case "Vacant Land":
        return (
          <LandForm
            watch={watch}
            setValue={setValue}
            register={register}
            control={control}
            propertyTypeName={propertyType}
          />
        );
      case "Industrial Building":
        return (
          <IndustrialForm
            register={register}
            control={control}
            PropertyRadio={PropertyRadio}
            watch={watch}
            setValue={setValue}
            propertyTypeName={propertyType}
          />
        );
      case "Industrial Park":
        return (
          <IndustrialForm
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            propertyTypeName={propertyType}
          />
        );
      default:
        return (
          <DefaultForm
            errors={errors}
            register={register}
            PropertyRadios={PropertyRadio}
            watch={watch}
            setValue={setValue}
            propertyTypeName={propertyType}
            control={control}
          />
        );
    }
  };

  const SubmitPropertyForm = (value) => {
    if (value) {
      onNext(value);
      reset(value);
    }
    return;
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(SubmitPropertyForm)}>
          <PropertyRadios defaultValues={defaultValues} register={register}></PropertyRadios>
          <div className="border border-[#ececec] rounded-2xl mx-3 md:mx-0 px-3 md:px-5 py-8">
            <PropertytypeSelection
              getValues={getValues}
              propertyType={propertyType}
              setValue={setValue}
              watch={watch}
              PropertyRadios={PropertyRadio}
              register={register}
              errors={errors}
              control={control}
            />
            {/* CUSTOM FIELD  */}
            {propertyType && renderFormFields()}

            {/* CHECK BOX FIELD  */}
            <div className="pb-8">
              <CustomCheckBox propertyType={propertyType} control={control} errors={errors}></CustomCheckBox>
            </div>

            <AddressFields defaultValues={defaultValues} setValue={setValue} control={control} trigger={trigger} watch={watch} register={register} errors={errors} />
            {/* DESCRIPTION SECTION  */}
            <div className="border-b-[1px]  border-[#BBBBBB] pb-7 sm:py-7 flex-col gap-4 flex">
              <TextAreas
                label={"Description"}
                placeholder={PropertyRadio === "For Sale" ?
                  "Describe the property, its features, location, and any unique selling points. You may also include zoning, deed restrictions, environmental or title issues, and investment highlights." : PropertyRadio === "For Lease" ? "Describe the property, available suites, square footage, lease rate (per month or per SF), location, and any unique features. If there are multiple units, list each with its suite number, size, and lease price" : "Describe the property, its location, and any unique selling points. If the property is available for both sale and lease, include relevant lease terms, suite details, and any investment considerations such as zoning or deed restrictions."
                }
                register={register("description", {
                  required: "Description is required",
                })}
                error={errors.description?.message}
              ></TextAreas>
            </div>
            <ListingVisibilitySwitches setValue={setValue} watch={watch} defaultValues={defaultValues} PropertyRadio={PropertyRadio} controls={control} />
          </div>

          {/* Send Message Button */}
          <div className="mt-1 flex justify-end gap-5 py-5">
            <button
              className="bg-PurpleColor hover-btn hover-btn-purple font-[600] cursor-pointer text-[14px] mr-3 sm:mr-0 sm:text-[14.5px] lg:text-[17px] px-6 py-3 text-white font-Urbanist rounded-[6px]"
              type="submit"
            >
              <span>Continue To Photo And Media</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Step1;
