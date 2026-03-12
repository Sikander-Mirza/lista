import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
// IMAGES
import AddPropertyBanner from "../../assets/Banners/AddPropertyBanner1.1.jpg";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import RentailForm from "../../Components/PropertyForm/RentailForm/RentailForm";
import WareHouseForm from "../../Components/PropertyForm/WareHouseForm/WareHouseForm";
import LandForm from "../../Components/PropertyForm/LandForm/LandForm";
import DefaultForm from "../../Components/PropertyForm/DefaultForm/DefaultForm";

const propertyTypes = [
  "Retail For Lease",
  "Office For Lease",
  "Warehouse For Lease",
  "Land For Lease",
  "Condominium Building",
  "Apartments or Flats",
  "Mobile Home Parks",
  "Storage Facility",
  "Churches",
  "Mixed Use Properties",
  "Group of Townhomes",
  "Medical Building",
  "School Building",
  "Other Building",
];

function AddProperty2() {
  const [propertyType, setPropertyType] = useState("");

//   useEffect(() => {
    const renderFormFields = () => {
      switch (propertyType) {
        case "Retail For Lease":
          return <RentailForm propertyTypeName={propertyType} />;
        case "Warehouse For Lease":
          return <WareHouseForm propertyTypeName={propertyType} />;
        case "Land For Lease":
          return <LandForm propertyTypeName={propertyType} />;
        default:
          return <DefaultForm propertyTypeName={propertyType} />;
      }
    };
//   }, );

  return (
    <>
      <Navbar />

      {/* BANNER START  */}
      <section>
        <div>
          <img
            className="h-[40vh] object-cover w-[100%]"
            src={AddPropertyBanner}
            alt=""
          />
        </div>
      </section>
      {/* BANNER END   */}

      {/* HEADING AND BUTTONS  */}
      <section className="px-20 pt-20 pb-10">
        {/* CONTACT INFO  */}
        <div className="flex justify-between items-center gap-4">
          <div className="w-[50%]">
            <h1 className="text-7xl font-[700] font-Urbanist  text-[#1E1E1E] sm:text-[43px] leading-[48px]">
              Add a Property
            </h1>
            <p className="text-md font-Inter font-medium text-pretty text-Paracolor mt-2 sm:text-[14px]/8 sm:leading-[18px] ">
              List your property to attract serious buyers, investors, and
              tenants.
            </p>
          </div>
          <div className="w-[50%]">
            <div
              className={`relative w-[100%] flex justify-center items-center text-end gap-5`}
            >
              <label
                for="text"
                className="block mb-1 text-[16px] font-[600] text-[#222222] w-[100%]"
              >
                Property Type :
              </label>
              <Select
                className={
                  "bg-[#F3EEFF] border-[#F3EEFF] text-[#474747] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none "
                }
                name="status"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                aria-label="Project status"
              >
                <option  value={""}>
                    Select Your Property
                  </option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon
                className={`group pointer-events-none absolute top-3.5 right-3 size-5 fill-black text-black`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FORMS  */}
      <section>
        <div className="px-20 pb-20">{propertyType && renderFormFields()}</div>
      </section>

      <Footer></Footer>
    </>
  );
}

export default AddProperty2;
