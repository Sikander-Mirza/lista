import React, { lazy, Suspense } from "react";
import "react-phone-input-2/lib/style.css";

const PhoneInput = lazy(() => import("react-phone-input-2"));

const CountrySelector = ({ setPhone, phone, error }) => {
  return (
    <div className="w-full">
      <label
        htmlFor="phone"
        className="block mb-2 font-[700] text-PurpleColor text-[16px]"
      >
        Phone Number
      </label>

      <Suspense
        fallback={
          <div className="w-full h-12 rounded-md bg-[#F3EEFF] animate-pulse" />
        }
      >
        <div className="phone-input-wrapper">
          <PhoneInput
            country="us"
            value={phone || ""}
            onChange={setPhone}
            onlyCountries={["us"]}
            enableSearch={false}
            disableSearchIcon={true}
            placeholder="Enter Your Phone Number"
            containerClass="phone-container"
            inputClass={`phone-input ${error ? "phone-input-error" : ""}`}
            buttonClass="phone-button"
            dropdownClass="phone-dropdown"
          />
        </div>
      </Suspense>

      {error && (
        <p className="text-red-500 font-[500] text-[14px] pt-1 font-Urbanist tracking-wide">
          {error}
        </p>
      )}

      <style>{`
        .phone-input-wrapper {
          width: 100%;
        }

        .phone-container {
          width: 100% !important;
          position: relative;
        }

        .phone-container .form-control {
          width: 100% !important;
          height: 48px !important;
          padding-left: 58px !important;
          border-radius: 8px !important;
          border: 1px solid #F3EEFF !important;
          background-color: #F3EEFF !important;
          color: #1d1d1d !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          font-family: Urbanist, sans-serif !important;
          box-shadow: none !important;
        }

        .phone-container .form-control:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: #7c3aed !important;
        }

        .phone-container .flag-dropdown {
          border: none !important;
          background: transparent !important;
          width: 52px !important;
          border-radius: 8px 0 0 8px !important;
        }

        .phone-container .selected-flag {
          width: 52px !important;
          padding-left: 14px !important;
          background: transparent !important;
          border-radius: 8px 0 0 8px !important;
        }

        .phone-container .selected-flag:hover {
          background: transparent !important;
        }

        .phone-container .flag-dropdown.open .selected-flag {
          background: transparent !important;
        }

        .phone-container .country-list {
          width: 300px !important;
          border-radius: 10px !important;
          box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important;
        }

        .phone-input-error {
          border: 1px solid #ef4444 !important;
        }
      `}</style>
    </div>
  );
};

export default CountrySelector;