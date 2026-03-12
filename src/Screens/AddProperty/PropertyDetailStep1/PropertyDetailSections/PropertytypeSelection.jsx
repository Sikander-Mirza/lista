import React, { useEffect, useMemo } from "react";
import Inputs from "../../../../Components/InputFields/Inputs";
import Selection from "../../../../Components/InputFields/Selection";
import RadioButton from "../../../../Components/InputFields/RadioButton";
import NumberInputs from "../../../../Components/InputFields/NumberInputs";

const propertyTypes = [
  "Apartments / Multifamily",
  "Automotive Property",
  "Church",
  "Gas Station",
  "Healthcare Facility",
  "Hospitality",
  "Industrial Building",
  "Industrial Park",
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
  "Vacant Land",
  "Warehouse",
  "Other",
];

const PropertytypeSelection = ({
  PropertyRadios,
  register,
  errors,
  watch,
  setValue,
  propertyType,
  getValues
}) => {
  const salePrice = watch("salePrice");
  const noi = watch("Noi");

  const capRate = useMemo(() => {
    const price = parseFloat((salePrice || "").toString().replace(/,/g, ""));
    const income = parseFloat((noi || "").toString().replace(/,/g, ""));

    if (!price || !income || price === 0) return null;

    return (income * 100) / price;
  }, [salePrice, noi]);

  setValue("CapRate", capRate);

  // WATCHED VALUES
  const leaseRateMin = watch("leaseMinRate");
  const leaseRateMax = watch("leaseRateMax");
  // const leaseRateMin = leaseRateMins.toLocaleString("en-US", {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });

  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return "0.00";
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };








  const multipleLeaseRates = watch("multipleLeaseRates");

  const clean = (val) => parseFloat((val || "").toString().replace(/,/g, ""));
  useEffect(() => {
    const min = clean(leaseRateMin);
    const max = clean(leaseRateMax);

    if (multipleLeaseRates) {
      if (!isNaN(min) && !isNaN(max)) {
        setValue("leaseRate", `${formatNumber(min.toFixed(2))} - ${formatNumber(max.toFixed(2))}`);
      } else {
        setValue("leaseRate", "");
      }
    } else {
      if (!isNaN(min)) {
        setValue("leaseRate", formatNumber(min.toFixed(2)));
      } else {
        setValue("leaseRate", "");
      }
    }
  }, [leaseRateMin, leaseRateMax, multipleLeaseRates, setValue]);


  





  useEffect(() => {
    setTimeout(() => {
      const leaseRate = getValues("leaseRate");

      if (leaseRate) {
        if (leaseRate.includes("-")) {
          const [min, max] = leaseRate
            .split("-")
            .map((val) => parseFloat(val.trim().replace(/[$,]/g, "")));

          if (!isNaN(min)) setValue("leaseMinRate", min.toFixed(2));
          if (!isNaN(max)) setValue("leaseRateMax", max.toFixed(2));
          setValue("multipleLeaseRates", true);
        } else {
          const min = parseFloat(leaseRate.replace(/[$,]/g, ""));
          if (!isNaN(min)) setValue("leaseMinRate", min.toFixed(2));
          setValue("multipleLeaseRates", false);
        }
      }
    }, 100);
  }, []);




  return (
    <div className="flex flex-col gap-6 pb-10">
      <div>
        <span className="w-[100%]">
          <Inputs
            labels={"Property Name"}
            name="PropertyTitle"
            placeholder={"Enter Property Name"}
            register={register("PropertyTitle", {
              required: "Property Name is required",
            })}
            error={errors.PropertyTitle?.message}
          />
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <span className="w-[100%]">
          <Selection
            defaultOption={"Select Your Property"}
            labels={"Property Type"}
            Options={propertyTypes}
            name={"propertyName"}
            value={watch("propertyName")}
            register={register}
            rules={{ required: "Please select an option." }}
            error={errors.propertyName?.message}
          />
        </span>

        <span className="w-[100%]">
          <Selection
            defaultOption={"Select Status"}
            labels={"Listing Status"}
            Options={["Available", "Withdrawn", "Pending", "Under Contract", "Leased"]}
            name={"ListingStatus"}
            register={register}
            value={watch("ListingStatus")}
            rules={{ required: "Please select an option." }}
            error={errors.ListingStatus?.message}
          />
        </span>
      </div>

      <div className="grid  lg:grid-cols-2 gap-6 md:gap-8">
        {(PropertyRadios === "For Sale" ||
          PropertyRadios === "Both (For Sale & For Lease)") && (
            <span className="grid sm:grid-cols-2 gap-5">
              <span className="">
                <NumberInputs
                  labels={"Sale Price"}
                  type={"number"}
                  name="salePrice"
                  placeholder={"Enter Price"}
                  register={register("salePrice", {
                    required: "Sales Price is required",
                  })}
                  setValue={setValue}
                  watch={watch}
                  error={errors.salePrice?.message}
                />
              </span>
              <span className="">
                <NumberInputs
                  name="Noi"
                  labels={"NOI (Net Operating Income)"}
                  type={"number"}
                  placeholder={"Enter Price"}
                  register={register("Noi", {
                    required: "Net Operating Income is required",
                  })}
                  setValue={setValue}
                  watch={watch}
                  error={errors.Noi?.message}
                />
              </span>
            </span>
          )}

        {(PropertyRadios === "For Sale" ||
          PropertyRadios === "Both (For Sale & For Lease)") && (
            <span className="">
              <label className="block mb-1 font-[700] text-PurpleColor w-full max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px]">
                Cap. Rate (%)
              </label>

              <div
                className={`bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-full px-4 rounded-[6px] outline-none h-12 flex items-center border ${capRate === null && errors.capRate
                  ? "border-red-600"
                  : "border-[#F3EEFF]"
                  }`}
              >
                {capRate !== null ? `${capRate.toFixed(2)}%` : ""}
              </div>
            </span>
          )}

        {(PropertyRadios === "For Lease" || PropertyRadios === "Both (For Sale & For Lease)") && (
          <>
            <input
              type="hidden"
              {...register("leaseRate")}
              value={watch("leaseRate") || ""}
            />
            {/* Lease Rate Fields */}
            <span className="grid sm:grid-cols-2 gap-4 flex-wrap">
              <span className="flex gap-2">
                <span className="w-[100%] lg:w-[75%] xl:w-[100%]">
                  <NumberInputs
                    labels={"Lease Rate"}
                    type={"number"}
                    name={"leaseMinRate"}
                    placeholder={"Enter Price"}
                    register={register("leaseMinRate", {
                      required: "Minimum Lease Rate is required",
                    })}
                    setValue={setValue}
                    watch={watch}
                    error={errors.leaseMinRate?.message}
                  />
                </span>

                {watch("multipleLeaseRates") && (
                  <span className="w-[100%]">
                    <NumberInputs
                      labels={"Lease Rate (Max)"}
                      type={"number"}
                      name={"leaseRateMax"}
                      placeholder={"Enter Price"}
                      register={register("leaseRateMax", {
                        required: "Maximum Lease Rate is required",
                      })}
                      setValue={setValue}
                      watch={watch}
                      error={errors.leaseRateMax?.message}
                    />
                  </span>
                )}
              </span>
              <span className="w-[100%]">
                <Selection
                  labels="ㅤ"
                  defaultOption="Select"
                  Options={[
                    "Per SF/Month",
                    "Per SF/Year",
                    "Per Month",
                    "Per Year",
                  ]}
                  name="persf"
                  value={watch("persf")}
                  register={register}
                  rules={{ required: "Please select an option." }}
                  error={errors.persf?.message}
                />
              </span>
              {/* Multiple Lease Rate Checkbox */}
              <label className="flex items-center gap-2 mb-2">
                <input
                  className="w-3.5 h-3.5"
                  type="checkbox"
                  {...register("multipleLeaseRates")}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setValue("multipleLeaseRates", isChecked);

                    if (!isChecked) {
                      setValue("leaseRateMax", "");
                    }
                  }}
                />
                <span className="block mb-1 font-[700] text-PurpleColor text-[14.5px]">
                  Multiple Units{" "}
                  <span className="text-Paracolor">
                    {watch("multipleLeaseRates") && watch("leaseRateMin") && watch("leaseRateMax") && (
                      `$${watch("leaseRateMin")} - $${watch("leaseRateMax")}`
                    )}
                  </span>
                </span>
              </label>
            </span>

          </>
        )}


        <span className="">
          <NumberInputs
            labels={"Building Size (sq ft)"}
            type={"number"}
            name={"BuildingSize_sqft"}
            placeholder={"Total Building Square Footage"}
            register={register("BuildingSize_sqft", {
              required: "Building Size is required",
            })}
            setValue={setValue}
            watch={watch}
            error={errors.BuildingSize_sqft?.message}
          />
        </span>
      </div>

      {(PropertyRadios === "For Lease" ||
        PropertyRadios === "Both (For Sale & For Lease)") && propertyType !== "Vacant Land" && (
          <div className="flex gap-2 flex-col">
            <label className="block mb-1 font-[700] text-PurpleColor">
              Lease Type
            </label>
            <span className="flex gap-4 flex-wrap">
              <RadioButton
                label={"N (Single Net)"}
                register={register("leaseType", {
                  required: "Please select a lease type.",
                })}
                name="leaseType"
                value="N"
              />
              <RadioButton
                label={"NN (Double Net)"}
                register={register("leaseType")}
                name="leaseType"
                value="NN"
              />
              <RadioButton
                label={"NNN (Triple Net)"}
                register={register("leaseType")}
                name="leaseType"
                value="NNN"
              />
              <RadioButton
                label={"None"}
                register={register("leaseType")}
                name="leaseType"
                value="None"
              />
            </span>
            {errors.leaseType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.leaseType.message}
              </p>
            )}
          </div>
        )}
    </div>

  );
};

export default PropertytypeSelection;
