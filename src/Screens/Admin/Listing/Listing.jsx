import React, { useState } from "react";
import FilterIcon from "../../../assets/Icons/FilterIcon.png";
import Selection from "../../../Components/InputFields/Selection.jsx";
import { Link } from "react-router-dom";
import ListingTable from "./ListingSection/ListingTable/ListingTable.jsx";
import { useForm } from "react-hook-form";
import { ChevronLeft, RefreshCw } from "lucide-react";

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

const InvestmentRange = [
  "Under $250K",
  "$250K – $500K",
  "$500K – $1M",
  "$1M – $2.5M",
  "$2.5M – $5M",
  "$5M – $10M",
  "$10M – $25M",
  "$25M – $50M",
  "Over $50M",
];

const Listing = () => {
  const { register, watch, setValue } = useForm();
  const status = watch("status");
  const propertyType = watch("propertyType");
  const priceRange = watch("priceRange");
  const search = watch("search");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleResetFilters = () => {
    setValue("status", "");
    setValue("search", "");
    setValue("propertyType", "");
    setValue("priceRange", "");
    setIsFilterOpen(false)
  };

  return (
    <>
      {/* HEADING SECTION  */}
      <section className="py-6">
        {/* PAGE TITTLE  */}
        <div className="flex flex-co flex-wrap max-[350px]:gap-3 gap-5 sm:px-2 sm:flex-row justify-between items-center">
          <h1 className="font-Urbanist text-[#222222] text-[24px] sm:text-[30px] xl:text-[32px] font-[700]">
            My Listings
          </h1>
          <Link to={"/create-property"}>
            <button className="!text-[11px] sm:!text-[13.5px] px-3 sm:px-5 md:!text-[15px] font-Inter hover-btn hover-btn-black  bg-[#1E1E1E] text-white py-2.5 sm:py-3 max-[350px]:text-[12.5px] rounded-[7px]">
              <span>Add New Property</span>
            </button>
          </Link>
        </div>
      </section>

      <section className=" xl:bg-white rounded-t-[20px] w-[100%] pt-3 sm:pt-5">
        {/* UPPER TAB  */}
        <div className="flex xl:flex- 2xl:flex-row overflow-hidden gap-3 sm:gap-5 sm:px-4 xl:bg-white">
          {/* SEARCH  */}
          <div className="relative w-[100%] xl:w-[33%] 2xl:w-[30%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg
                className="w-4 h-4 text-[#444444] "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="w-[100%] text-[#444444] placeholder:text-[#444444] font-Urbanist font-semibold py-[13.5px] xl:py-4 pl-11 rounded-[10px] text-[13px] sm:text-[15px] bg-[#F3EEFF] outline-none"
              placeholder="Search Property Name "
              {...register("search")}
            />
          </div>
          {/* FILTER  */}
          {/* Desktop filter bar (hidden on mobile) */}
          <div className="hidden xl:flex gap-1 px-0 bg-white  w-[100%] border-[1px] border-solid border-[#1E1E1E] rounded-[10px]">
            {/* FILTER BUTTON  */}
            <button className=" font-Inter bg-[#1E1E1E] text-white py-2.5 rounded-l-[7px] flex items-center px-4 gap-1 w-[15%]">
              <img className="w-5 h-5" src={FilterIcon} alt="Newlista" />{" "}
              <span className="font-Urbanist font-[500] text-[15px]">
                Filter
              </span>
            </button>
            {/* STATUS  */}
            <div className="border-r-[1px] border-solid border-[#BBBBBB] w-[17%]">
              <Selection
                defaultOption={"Status"}
                Options={[
                  "Available",
                  "Withdrawn",
                  "Pending",
                  "Under Contract",
                  "Leased",
                ]}
                icon={"!top-3.5"}
                name={"status"}
                register={register}
                Style={"bg-transparent border-none"}
              />
            </div>
            <div className="border-r-[1px] border-solid border-[#BBBBBB] w-[23%]">
              <Selection
                defaultOption={"Property Type"}
                Options={propertyTypes}
                name={"propertyType"}
                icon={"!top-3.5"}
                register={register}
                Style={"bg-transparent border-none"}
              />
            </div>
            <div className=" border-r-[1px] border-solid border-[#BBBBBB] w-[20%]">
              <Selection
                defaultOption={"Price Range"}
                Options={InvestmentRange}
                icon={"!top-3.5"}
                name={"priceRange"}
                register={register}
                Style={"bg-transparent border-none"}
              />
            </div>
            <div className="flex justify-center items-center w-[20%]">
              <button
                onClick={handleResetFilters}
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="font-Urbanist font-[500] text-[15px] text-[#E31D1C]">
                  Reset Filter
                </span>
                <RefreshCw size={16} className="text-[#E31D1C]" />
              </button>
            </div>
          </div>
          {/* Mobile filter button (visible only on small screens) */}
          <div className="flex xl:hidden  max-[400px]:w-[40%] w-[30%] sm:w-[22%]   md:w-[17%] py-[9px] sm:py-3 md:py-[12.8px] max-[350px]:px-4 px-4 bg-[#1E1E1E] justify-center rounded-[10px]">
            <button
              onClick={() =>{
                setIsFilterOpen(true)
              } }
              className="bg-[#1E1E1E] text-white rounded-[10px] flex items-center gap-1"
            >
              <img
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5"
                src={FilterIcon}
                alt="Filter"
              />
              <span className="font-Urbanist font-medium text-[15.5px] sm:text-[16px] lg:text-[16px]">
                Filter
              </span>
            </button>
          </div>
          {/* Fullscreen filter drawer (visible when isFilterOpen === true) */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-white z-50 pt-20 px-5  flex flex-col gap-3">
              {/* Back Button */}
              <div className="flex items-center mb-4">
                <button
                
                  onClick={handleResetFilters}
                  className="text-[#1E1E1E] text-[18px] flex items-center gap-2 font-Urbanist  font-[600]"
                >
                  <ChevronLeft />
                  Back
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex flex-col gap-4">
                <button className="bg-[#1E1E1E] text-white py-2.5 px-4 rounded-[7px] flex items-center gap-2 w-full">
                  <img className="w-5 h-5" src={FilterIcon} alt="Sort" />
                  <span className="font-Urbanist font-medium text-[14px]">
                    Sort by
                  </span>
                </button>
                <div>
                  <Selection
                    defaultOption={"Status"}
                    Options={[
                      "Available",
                      "Withdrawn",
                      "Pending",
                      "Under Contract",
                      "Leased",
                    ]}
                    icon={"!top-3.5"}
                    name={"status"}
                    register={register}
                  />
                </div>
                <div>
                  <Selection
                    defaultOption={"Property Type"}
                    Options={propertyTypes}
                    name={"propertyType"}
                    icon={"!top-3.5"}
                    register={register}
                  />
                </div>
                <div>
                  <Selection
                    defaultOption={"Price Range"}
                    Options={InvestmentRange}
                    icon={"!top-3.5"}
                    name={"priceRange"}
                    register={register}
                  />
                </div>
                <button
                  onClick={() => {
                    setIsFilterOpen(false);
                    const table = document.getElementById("listing-table");
                    if (table) table.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 justify-end mt-2"
                >
                  <span className="font-Urbanist font-medium text-[15.5px] rounded-[6px] text-white px-4 py-2 bg-PurpleColor">
                    Search
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TABLE SECTION */}
      <ListingTable
        search={search}
        priceRange={priceRange}
        status={status}
        propertyType={propertyType}
      ></ListingTable>
    </>
  );
};

export default Listing;
