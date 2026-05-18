import Inputs from "../../InputFields/Inputs";
import NumberInputs from "../../InputFields/NumberInputs";
import Selection from "../../InputFields/Selection";

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

const RentailForm = ({ propertyTypeName, register, watch, setValue, PropertyRadio }) => {

  const Check = watch("custom_fields.BuildingSize");

  return (
    <div className="border-[2px] rounded-[8px] px-4 border-solid border-[#ececec] mt-5 bg-[#fcfcfc] py-8">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
        {PropertyRadio !== "For Lease" &&
          <>
          <span className="w-[100%]">
            <Selection
              labels={"Currency"}
              defaultOption={"Select Your Currency"}
              Options={currencies}
              name={"custom_fields.Currency"}
              register={register}
              value={watch("custom_fields.Currency")}
            ></Selection>
          </span>

        <span className="w-[100%]">
          <NumberInputs
            labels={"Gross Scheduled Income (Annual) "}
            type={"text"}
            placeholder={"Ex: 10000"}
            watch={watch}
            setValue={setValue}
            name={"custom_fields.MonthlyRental"}
            register={register}
          ></NumberInputs>
        </span></>
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
            labels={"Building Levels"}
            type={"text"}
            placeholder={"Ex:1"}
            watch={watch}
            setValue={setValue}
            name={"custom_fields.BuildingLevels"}
            register={register}
          ></NumberInputs>
        </span>
        <span className="w-[100%]">
          <Inputs
            labels={"Year Built"}
            type={"number"}
            placeholder={"2020"}
            watch={watch}
            setValue={setValue}
            name={"custom_fields.YearBuilt"}
            register={register}
          ></Inputs>
        </span>
        {/* <span className="w-[100%]">
          <Selection
            labels={"Land Scape Size"}
            defaultOption={"Select Size"}
            Options={["Sq Ft", "Sq M"]}
            name={"custom_fields.LandScape"}
            register={register}
            value={watch("custom_fields.LandScape")}
          ></Selection>
        </span> */}
        {/* <span className="w-[100%]">
          <NumberInputs
            labels={"‎ "}
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
            labels={"‎ "}
            defaultOption={"Select"}
            Options={["Acres", "Hectacres"]}
            name={"custom_fields.LandScapeAcres"}
            register={register}
            value={watch("custom_fields.LandScapeAcres")}
          ></Selection>
        </span>
        <span className="w-[100%]">
          <NumberInputs
            labels={"‎ "}
            type={"number"}
            watch={watch}
            setValue={setValue}
            placeholder={"Ex:1"}
            name={"custom_fields.LandScapeNumber2"}
            register={register}
          ></NumberInputs>
        </span> */}
        <span className="w-[100%]">
          <Selection
            labels={"Outdoor Signage Available"}
            defaultOption={"Select"}
            Options={["Yes", "No"]}
            name={"custom_fields.Outdoor-Signage"}
            value={watch("custom_fields.Outdoor-Signage")}
            register={register}
          ></Selection>
        </span>
        <span className="w-[100%]">
          <NumberInputs
            labels={"Parking Spaces"}
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
            labels={"Number of Units"}
            type={"number"}
            placeholder={"Ex:1"}
            watch={watch}
            setValue={setValue}
            name={"custom_fields.NumberOfUnits"}
            register={register}
          ></NumberInputs>
        </span>
        <span className="w-[100%]">
          <Selection
            labels={"Building Class"}
            defaultOption={"Select Class"}
            Options={["A", "B", "C", "D"]}
            name={"custom_fields.BuildingClass"}
            value={watch("custom_fields.BuildingClass")}
            register={register}
          ></Selection>
        </span>
        <span className="w-[100%]">
          <NumberInputs
            labels={"Percentage Leased (%)"}
            watch={watch}
            setValue={setValue}
            type={"number"}
            placeholder={"Ex:75"}
            name={"custom_fields.PercentageLease"}
            register={register}
          ></NumberInputs>
        </span>
      </div>
    </div>
  );
};

export default RentailForm;
