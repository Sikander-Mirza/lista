import React from "react";
import { Link } from "react-router-dom";
import TruncatedText from "../../TruncatedText/TruncatedText";

const TopDevelopes = ({
  Img,
  MiniHeading,
  Heading,
  desc,
  Price,
  id,
  Status,
  type,
  OffMarketProperties,
}) => {
  return (
    <>
      <div className="max-[400px]:w-[100%] w-[330px] sm:w-full bg-white border border-gray-200 rounded-lg shadow-sm relative">
        <img
          className="rounded-t-lg h-[245px] lg:h-[270px] 2xl:h-[300px] object-cover w-[100%] "
          src={import.meta.env.VITE_IMAGE_KEY + Img}
          alt=""
        />
        <div className="pt-4 flex flex-col gap-3 sm:!gap-0 px-5 py-7 min-[870px]:!px-3.5 lg:!px-5 justify-between sm:h-[39.5ch] md:h-[38ch] xl:h-[41ch] xl:!gap-4">
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-wrap gap-2 items-center">
              {"For Sale" === type ? (
                <span className="bg-[#28A745] text-white font-Inter px-3 py-1 text-[13.5px] sm:text-[12px] min-[870px]:!text-[11.5px] lg:!text-[12px] rounded-full">
                  For Sale
                </span>
              ) : (
                <span className="bg-[#FFC107] text-white font-Inter px-3 py-1 text-[13.5px] sm:text-[12px] min-[870px]:!text-[11.5px] lg:!text-[12px] rounded-full">
                  {type}
                </span>
              )}
              {OffMarketProperties && (
                <span className="bg-[#FFC107] text-white font-Inter px-3 py-1 text-[13.5px] sm:text-[12px] min-[870px]:!text-[11.5px] lg:!text-[12px] rounded-full">
                  {OffMarketProperties}
                </span>
              )}
            </div>
            <div className="absolute top-6 end-6">
              {"Available" === Status ? (
                <span className="bg-[#28A745] text-white font-Inter px-3 py-1 text-[14px] sm:text-[12.5px] min-[870px]:!text-[13px] lg:!text-[14px] rounded-full">
                  Available
                </span>
              ) : "Sold" === Status ? (
                <span className="bg-[#DC3545] text-white font-Inter px-3 py-1 text-[14px] sm:text-[12.5px] min-[870px]:!text-[13px] lg:!text-[14px] rounded-full">
                  Sold
                </span>
              ) : (
                <span className="bg-[#FFC107] text-white font-Inter px-3 py-1 text-[14px] sm:text-[12.5px] min-[870px]:!text-[13px] lg:!text-[14px] rounded-full">
                  {Status}
                </span>
              )}
            </div>
          </div>

          <div>
            <h1 className=" text-[23px] leading-[30px] mb-3 font-[700] font-Inter tracking-tight sm:leading-[24px] mt-3 text-gray-900 sm:text-[19.5px] md:text-[21.5px] min-[870px]:!text-[18.5px] lg:!text-[23px] xl:leading-[28px]">
              {Heading}
            </h1>
            <h1 className="mb-2 text-[18px] sm:text-[15px] min-[870px]:!text-[14px] lg:!text-[15px] font-[600] font-Inter tracking-tight leading-[24px] mt-1 text-gray-900">
              {MiniHeading}
            </h1>
            <p className="mb-2 font-Inter text-[14px] sm:text-[12.5px] min-[870px]:!text-[11.5px] lg:!text-[12.5px] font-normal text-gray-700">
              {desc}
            </p>
          </div>
          <div className="flex justify-between items-end flex-wrap gap-3">
            {type === "Both (For Sale & For Lease)" && (
              <div className=" ">
                <h5 className="font-Inter text-[15px] sm:text-[14px] min-[870px]:!text-[13.5px] lg:!text-[14px] font-[500]">
                  Starting from
                </h5>
                <h1 className="font-Inter text-[20px] sm:text-[18px] min-[870px]:!text-[16.5px] lg:!text-[18px] font-bold">
                  {" "}
                  $
                  <TruncatedText text={forsale} maxLength={6} />
                  {"/sale"}
                </h1>
                <h1 className="font-Inter text-[20px]sm:text-[18px] min-[870px]:!text-[16.5px] lg:!text-[18px] font-bold">
                  {" "}
                  $
                  <TruncatedText text={forlease} maxLength={6} />
                  {"/lease"}
                </h1>
              </div>
            )}
            {type !== "Both (For Sale & For Lease)" && (
              <div className="">
                <h5 className="font-Inter text-[15px] sm:text-[14px] min-[870px]:!text-[13.5px] lg:!text-[14px] font-[500]">
                  Starting from
                </h5>
                <h1 className="font-Inter text-[20px] sm:text-[18px] min-[870px]:!text-[15.5px] lg:!text-[18px] font-bold">${Price}</h1>
              </div>
            )}

            <div className="">
              <Link to={`/properties/${id}`}>
                <button className="inline-flex font-Inter text-[12.5px] sm:text-[13px]  min-[870px]:!text-[11.5px] lg:!text-[13px] items-center px-5 py-2.5 rounded-full text-sm font-medium text-center focus:outline-none hover-btn-purple hover-btn ">
                  <span>View Property Details</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopDevelopes;
