import React from "react";

const PropertyDetail = ({ formData }) => {
  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row md:gap-10 py-10">
        {/* PROPERTY DETAILS  */}
        <div className="md:w-[50%] flex flex-col justify-between">
          <div className="mb-2">
            <h1 className="max-[400px]:text-[19px] text-[21px] lg:text-[23px] font-[700] font-Urbanist  text-[#1E1E1E]">
              Property Details:
            </h1>
          </div>
          <div className="mb-2">
            <div className="flex justify-between mb-2">
              <h1 className="max-[400px]:text-[15px] text-[17px] lg:text-[18px] font-[700] font-Urbanist  text-[#1E1E1E]">
                Name:
              </h1>
              <p className="max-[400px]:text-[13.5px] text-[14.5px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] ">
                {formData.PropertyTitle}
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <h1 className="max-[400px]:text-[15px] text-[17px] lg:text-[18px] font-[700] font-Urbanist  text-[#1E1E1E]">
                Type:
              </h1>
              <p className="max-[400px]:text-[13.5px] text-[14.5px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] ">
                {formData.propertyName}
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <h1 className="max-[400px]:text-[15px] text-[17px] lg:text-[18px] font-[700] font-Urbanist  text-[#1E1E1E]">
                Listing Type:
              </h1>
              <p className="max-[400px]:text-[13.5px] text-[14.5px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] ">
                {formData.propertyType}
              </p>
            </div>
            
            <div className="flex justify-between mb-2">
              <h1 className="max-[400px]:text-[15px] text-[17px] lg:text-[18px] font-[700] font-Urbanist  text-[#1E1E1E]">
                Status:
              </h1>
              <p className="max-[400px]:text-[13.5px] text-[14.5px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] ">
                {formData.ListingStatus}
              </p>
            </div>
            <div className="flex justify-between mb-2">
              {formData.salePrice ? (
                <>
                  <h1 className="max-[400px]:text-[15px] text-[17px] lg:text-[18px] font-[700] font-Urbanist  text-[#1E1E1E]">
                    Sale Price:
                  </h1>
                  <p className="max-[400px]:text-[13.5px] text-[14.5px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] ">
                    ${formData.salePrice}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="max-[400px]:text-[15px] text-[17px] lg:text-[18px] font-[700] font-Urbanist  text-[#1E1E1E]">
                    Lease Rate:
                  </h1>
                  <p className="max-[400px]:text-[14px] text-[14.5px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] ">
                    ${formData.leaseRate}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-between mb-2">
              <h1 className="max-[400px]:text-[14px] text-[17px] lg:text-[18px] font-[700] font-Urbanist  text-[#1E1E1E]">
                Building Size:
              </h1>
              <p className="max-[400px]:text-[13.5px] text-[14.5px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] ">
                {formData.BuildingSize_sqft + "sq ft"}
              </p>
            </div>
            {formData.leaseType && (
              <div className="flex justify-between mb-2">
                <h1 className="max-[400px]:text-[14px] text-[17px] lg:text-[18px] font-[700] font-Urbanist  text-[#1E1E1E]">
                  Lease Type:
                </h1>
                <p className="max-[400px]:text-[13.5px] text-[14.5px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] ">
                  NNN (Triple Net)
                </p>
              </div>
            )}
          </div>
        </div>
        {/* LOCATION  */}
        <div className="md:w-[50%]">
          <div className="flex sm:flex-row  md:flex-col lg:flex-row justify-between items-center md:items-start mb-2 ">
            <h1 className="text-[18px] sm:text-[21px] lg:text-[22px] font-[700] font-Urbanist  text-[#1E1E1E]">
              Location:
            </h1>
            <p className="font-Inter text-[12px] text-end min-[400px]:text-[13px] text-pretty text-Paracolor sm:text-[13.5px] lg:text-[14px]/8 sm:leading-[18px] ">
              {formData.PropertyAddress + " " + formData.city + " " + formData.state + " " + formData.ZipPostalCode}
            </p>
          </div>
          <div>
            <iframe
              src={`https://www.google.com/maps?q=404 ${formData.PropertyAddress + "," + formData.city + "," + formData.state + "," + formData.ZipPostalCode}&output=embed`}
              className="w-full h-[200px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
