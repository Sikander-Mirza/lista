// Components/Cards/PropertiesCards/PropertiesCards2.jsx
import React from "react";
import { Link } from "react-router-dom";
import PropertyIcon from "../../../assets/Icons/PropertyIcon.png";
import PropertyIcon2 from "../../../assets/Icons/PropertyIcon2.png";
import TruncatedText from "../../TruncatedText/TruncatedText";
import { generatePropertyUrl } from "../../../utils/slugify";

const PropertiesCards2 = ({
  Heading,
  desc,
  Status,
  Price,
  id,
  images,
  PropertyType,
  Area,
  CheckProperty,
  forsale,
  featured_listing,
  forlease,
  propertyData, // Full property object for URL generation
}) => {
  const ImageKey = import.meta.env.VITE_IMAGE_KEY;

  // Generate URL from property data (NO ID in URL)
  const propertyUrl = propertyData
    ? generatePropertyUrl(propertyData)
    : `/properties/${id}`; // Fallback

  return (
    <Link to={propertyUrl} className="block">
      <div className="min-[420px]:w-[300px] sm:w-[100%] lg:w-[275px] xl:w-[100%] min-[1450px]:!w-[300px] 2xl:!w-[100%] bg-white border border-gray-200 rounded-lg shadow-sm relative">
        <img
          className="rounded-t-lg h-[200px] min-[350px]:h-[230px] object-cover w-[100%]"
          src={`${ImageKey}${images}`}
          alt={Heading || "Property"}
          loading="lazy"
        />
        <div className="py-3 pb-4 px-4 flex flex-col gap-2 justify-between sm:min-h-[360px] sm:h-full lg:h-[39ch]">
          {/* Status Badge */}
          <div className="absolute top-5 end-4">
            {Status === "Active" ? (
              <span className="bg-[#28A745] text-white font-Inter px-4 py-1.5 text-[11.5px] sm:text-[14px] rounded-full">
                Active
              </span>
            ) : Status === "Sold" ? (
              <span className="bg-[#DC3545] text-white font-Inter px-4 py-1.5 text-[11.5px] sm:text-[14px] rounded-full">
                Sold
              </span>
            ) : (
              <span className="bg-[#FFC107] text-white font-Inter px-4 py-1.5 text-[11.5px] sm:text-[14px] rounded-full">
                {Status}
              </span>
            )}
          </div>

          <div>
            <div className="my-2.5">
              {CheckProperty && (
                <span className="bg-[#FFC107] text-white font-Inter px-4 py-1.5 mb-3 text-[11.5px] sm:text-[14px] rounded-full">
                  {CheckProperty}
                </span>
              )}
              {!CheckProperty && featured_listing && (
                <span className="bg-[#28A745] text-white font-Inter px-4 py-1.5 mb-3 text-[11.5px] sm:text-[14px] rounded-full">
                  {featured_listing}
                </span>
              )}
            </div>
            <h2 className="mb-2 text-[19px] md:text-[21px] font-[600] font-Inter tracking-tight leading-[24px] mt-4 text-gray-900">
              {Heading}
            </h2>
            <p className="mb-2 font-Inter text-[13px] font-normal text-gray-700 flex break-all">
              {desc}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="bg-[#E3E3E3] text-Paracolor font-semibold font-Inter px-3 py-1 text-[12px] md:text-[13px] flex rounded-full w-max gap-1">
              <img
                className="w-[16px] h-4.5 md:w-[18px] md:h-4.5"
                src={PropertyIcon}
                alt="Area"
              />
              {Area} Sq
            </span>
            <span className="bg-[#E3E3E3] text-Paracolor font-semibold font-Inter px-3 py-1 text-[12px] md:text-[13px] flex rounded-full w-max gap-1">
              <img
                className="w-[16px] h-4.5 md:w-[18px] md:h-4.5"
                src={PropertyIcon2}
                alt="Type"
              />
              {PropertyType}
            </span>
          </div>

          <div className="flex justify-between items-center mt-5">
            {Status === "Both (For Sale & For Lease)" ? (
              <div>
                <h5 className="font-Inter text-[16px] font-[500] -mt-3">
                  Price
                </h5>
                <h3 className="font-Inter text-[16px] font-bold">
                  $<TruncatedText text={forsale} maxLength={6} />
                  /sale
                </h3>
                <h3 className="font-Inter text-[16px] font-bold">
                  $<TruncatedText text={forlease} maxLength={6} />
                  /lease
                </h3>
              </div>
            ) : (
              <div>
                <h5 className="font-Inter text-[16px] font-[500]">Price</h5>
                <h3 className="font-Inter text-[16px] font-bold">${Price}</h3>
              </div>
            )}

            <div>
              <span className="inline-flex font-Inter text-[12.5px] items-center px-5 py-2.5 rounded-full text-sm font-medium text-center hover-btn-purple hover-btn">
                <span>View Property</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertiesCards2;