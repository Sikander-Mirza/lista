import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CountrySelector = ({setPhone , phone , error ,Style}) => {

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  return (
    <div>
      <label
        htmlFor={"Phone Number"}
        className="block mb-1.5 font-[700] text-PurpleColor w-[100%] max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px]"
      >
        Phone Number
      </label>
      <PhoneInput
        country={"us"}
        value={phone}
        onChange={handlePhoneChange}
        onlyCountries={["us"]}
        enableSearch={false}
        disableDropdown={false}
        disableCountryCode={false}
        placeholder="Enter Your Phone Number"
        containerClass="w-full !flex !justify-between sm:!gap-10 "
        inputClass={`!bg-[#F3EEFF] !text-[#1d1d1d] !font-[600] !font-Urbanist !text-[14px] rounded-[6px] outline-none !w-[100%] !ml-20 sm:!ml-24 !h-12 !placeholder:text-black !placeholder:text-[13px]  !rounded-md !pl-4 !border focus:!outline-none focus:!ring-none focus:!ring-none ${error ? '!border-red-500' : '!border-none'}`}
        buttonClass={`!bg-[#F3EEFF] max-[400px]:!w-[23%] !w-[18%] sm:!w-[11%] lg:!w-[18%] xl:!w-[16%] 2xl:!w-[12%] md:!w-[20%] lg:!w-[14%] !rounded-[8px] border !hover:bg-[#F3EEFF] !border-[#F3EEFF] !mr-10 ${Style}`}
      />
      <style>
        {`
          .react-tel-input .country-list .search-box{
              padding: 10px 12px 11px;
              width: 90%;
                  background: #f2f2f2;
                border: #f2f2f2;
              }
          .react-tel-input .flag-dropdown.open .selected-flag{
           background-color: #F3EEFF;
          }
           .react-tel-input .country-list .search{
               padding: 14px 0 10px 5px;
           }
           .react-tel-input .country-list .search-emoji{
           display:none}
          .react-tel-input .flag-dropdown {
            width: 105px; 
            padding-left: 4px
          }
          .react-tel-input .selected-flag:hover{
           background-color: #F3EEFF;
          }
          .react-tel-input .selected-flag {
            padding: 8px 12px;
          }
          .react-tel-input .flag {
            transform: scale(1.5); /* increases flag size */
          }
        `}
      </style>
      {error && (
        <p className="text-red-500 font-[500] text-[14px] pt-1 ml-24 font-Urbanist tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
};

export default CountrySelector;
