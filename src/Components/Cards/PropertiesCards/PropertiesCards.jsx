import React from "react";
import { Link } from "react-router-dom";
// IMAGES
import PropertyIcon from "../../../assets/Icons/PropertyIcon.png";
import PropertyIcon2 from "../../../assets/Icons/PropertyIcon2.png";
// COMPONENTS 
import TruncatedText from "../../TruncatedText/TruncatedText";

const PropertiesCards = ({
  Img,
  Heading,
  desc,
  Status,
  type,
  Price,
  id,
  PropertyType,
  Area,
  forsale,
  forlease,
}) => {
  return (
    <>
      <div className="max-[400px]:w-[100%] w-[330px] sm:w-[100%] bg-white border border-gray-200 rounded-lg shadow-sm relative">
        <Link to={`/properties/${id}`}>
          <img
            className="rounded-t-lg h-[245px] lg:h-[270px] object-cover w-[100%]"
            src={import.meta.env.VITE_IMAGE_KEY + Img}
            alt=""
          />
        </Link>
        <div className="px-5 py-6 sm:p-5 min-[870px]:!px-3 lg:!px-5 flex flex-col gap-5 sm:gap-2 justify-between sm:h-[72vh] min-h-[350px] lg:min-h-[360px] xl:min-h-[340px] xl:gap-3 md:h-[100%] 2xl:min-h-[380px]">
          <div className="flex flex-col gap-0.5 md:gap-2">
            <div>
              {"For Sale" === type ? (
                <span className="bg-[#28A745] text-white font-Inter px-3 py-1 text-[14px] sm:text-[12.5px] rounded-full">
                  For Sale
                </span>
              ) : (
                <span className="bg-[#FFC107] text-white font-Inter px-3 py-1 text-[14px] sm:text-[12.5px] rounded-full">
                  {type}
                </span>
              )}
            </div>
            <div className="absolute top-6 end-6">
              {"Available" === Status ? (
                <span className="bg-[#28A745] text-white font-Inter px-3 py-1 text-[14px] sm:text-[12.5px] rounded-full">
                  Available
                </span>
              ) : "Sold" === Status ? (
                <span className="bg-[#DC3545] text-white font-Inter px-3 py-1 text-[14px] sm:text-[12.5px] rounded-full">
                  Sold
                </span>
              ) : (
                <span className="bg-[#FFC107] text-white font-Inter px-3 py-1 text-[14px] sm:text-[12.5px] rounded-full">
                  {Status}
                </span>
              )}
            </div>
            <div>
              <Link to={`/properties/${id}`}>
                <h1 className="mb-1 text-[22px] font-[600] font-Inter tracking-tight leading-[27px] mt-3 text-gray-900 sm:text-[19.5px] md:text-[22px] min-[870px]:!text-[20px] min-[1080px]:!text-[22px] min-[1780px]:!text-[26px] min-[1780px]:mb-3">
                  {Heading}
                </h1>
              </Link>
              <p className="mb-2 font-Inter text-[13.5px] sm:text-[12.5px] sm:leading-[15.5px] font-normal text-gray-700 min-[870px]:!text-[12px] min-[1080px]:!text-[12.5px] min-[1780px]:!text-[15px]">
                {desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#E3E3E3] text-Paracolor font-semibold font-Inter px-3 py-1 text-[13px] flex rounded-full w-max gap-1 sm:text-[12.5px] min-[1780px]:!text-[15px]">
                <img className="w-[18px] h-4.5 sm:w-[16px] sm:h-4 min-[1780px]:!w-[20px] min-[1780px]:!h-6" src={PropertyIcon} alt="Newlista" />{" "}
                {Area} Sq
              </span>
              <span className="bg-[#E3E3E3] text-Paracolor font-semibold font-Inter px-3 py-1 text-[13px] flex rounded-full w-max gap-1 sm:text-[12.5px] min-[1780px]:!text-[15px]">
                <img className="w-[18px] h-4.5 sm:w-[16px] sm:h-4 min-[1780px]:!w-[20px] min-[1780px]:!h-6" src={PropertyIcon2} alt="Newlista" />{" "}
                {PropertyType}
              </span>
            </div>
          </div>
          <div className="flex items-cente flex-col flex-wrap gap-3">
            {type === "Both (For Sale & For Lease)" && (
              <div className=" ">
                <h5 className="font-Inter text-[16px] sm:text-[14px] min-[1780px]:!text-[15px] font-[500] ">
                  Price
                </h5>
                <h1 className="font-Inter text-[18px] font-bold">
                  $
                  <TruncatedText text={forsale} maxLength={6} />
                  {"/sale"}
                </h1>
                <h1 className="font-Inter text-[18px] font-bold">
                  $
                  <TruncatedText text={forlease} maxLength={6} />
                  {"/lease"}
                </h1>
              </div>
            )}
            {type !== "Both (For Sale & For Lease)" && (
              <div>
                <h5 className="font-Inter text-[18px] sm:text-[16px] min-[1780px]:!text-[18px] font-[500]">Price</h5>
                <h1 className="font-Inter text-[18px] sm:text-[16px] min-[1780px]:!text-[20px] font-bold">${Price}</h1>
              </div>
            )}
            <div>
              <Link
                to={`/properties/${id}`}
                className="inline-flex font-Inter text-[13px] items-center px-5 py-2.5 rounded-full text-sm font-medium text-center focus:outline-none  hover-btn-purple hover-btn sm:text-[12.5px] md:text-[14px] min-[870px]:!text-[13px] min-[1780px]:!text-[15px]"
              >
                <span>View Property Details</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesCards;
