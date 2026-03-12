import React, { useEffect, useRef, useState } from "react";
// COMPONENTS
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Step2 from "./Photo&MediaStep2/Photo&Media.jsx";
import Step1 from "./PropertyDetailStep1/PropertyDetail.jsx";
import Step3 from "./PreviewPropertyStep3/PreviewProperty.jsx";
import MiniFooter from "../../Components/Footer/MiniFooter.jsx";
import Spinner from "../../Components/Spinner/Spinner.jsx";

// IMAGES
import AddPropertyBanner from "../../assets/Banners/AddPropertyBanner1.1.jpg";
import axios from "axios";
import AlertModal from "../../Components/AlertModal/AlertModal.js";
import { useLocation, useNavigate } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import StripeCardForm from "../Pricing/StripeCardForm.jsx";

const PropertyForm = () => {
  const stepRef = useRef(null);

  const [loading, setloading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get("editId");
  const IsActive = localStorage.getItem("status")

  const navigate = useNavigate();



  if (stepRef.current) {
    stepRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const nextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);


  const handleFinalSubmit = async (data) => {
    if (!formData || Object.keys(formData).length === 0) {
      return;
    }

    try {
      setloading(true);
      const form = new FormData();
      form.append("property_id", editId || "");
      form.append("property_name", data.PropertyTitle);
      form.append("listing_type", data.propertyType);
      form.append("property_type", data.propertyName);
      form.append("listing_status", data.ListingStatus);
      form.append("lease_rate", data.leaseRate);
      form.append("lease_rate_unit", data.persf);
      form.append("lease_type", data.leaseType);
      form.append("building_size", data.BuildingSize_sqft);
      form.append("sale_price", data.salePrice || "");
      form.append("address", data.PropertyAddress);
      form.append("city", data.city);
      form.append("state", data.state);
      form.append("zip", data.ZipPostalCode);
      form.append("description", data.description);
      form.append(
        "featured_listing",
        !data.paymentMethodId && data.FeaturedListing ? 1 : 0
      );
      form.append(
        "off_market_listing",
        data.propertyType === 'For Sale' ? (data.OffTheMarketListing ? 1 : 0) : 0
      );
      form.append("owner_financing", data.OwnerFinancing ? 1 : 0);
      form.append("show_email", data.ShowEmail ? 1 : 0);
      form.append("show_phone", data.ShowNumber ? 1 : 0);
      form.append("noi", data.Noi || "");
      form.append("cap_rate", data.CapRate || "");
      form.append("stripe_token", data.paymentMethodId || "");

      data.fileInput?.forEach((item) => {
        if (typeof item === "string") {
          form.append("image_urls[]", item);
        } else {
          form.append("images[]", item);
        }
      });

      const customFields = data.custom_fields;
      if (customFields && typeof customFields === "object") {
        Object.keys(customFields).forEach((key) => {
          const value = customFields[key];
          if (value !== undefined && value !== null && value !== "") {
            form.append(`custom_fields[${key}]`, value);
          }
        });
      }

      const response = await axios.post(`${ApiKey}/add-update-property`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      AlertModal({
        icon: "success",
        title: "Thank You",
        iconColor: "#703BF7",
        text: response.data.message,
      });
      navigate("/properties");
    } catch (error) {
    } finally {
      setloading(false);
    }

  };

  useEffect(() => {
    if (editId) {
      fetchPropertyData(editId);
    }
  }, [editId]);

  const fetchPropertyData = async (id) => {
    try {
      setloading(true);

      const response = await axios.get(`${ApiKey}/view-property/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data?.data;
      if (data) {
        setFormData({
          PropertyTitle: data.property_name,
          propertyType: data.listing_type,
          propertyName: data.property_type,
          ListingStatus: data.listing_status,
          leaseRate: data.lease_rate || "",
          persf: data.lease_rate_unit || "",
          leaseType: data.lease_type || "",
          BuildingSize_sqft: data.building_size || "",
          salePrice: data.sale_price || "",
          PropertyAddress: data.address || "",
          city: data.city || "",
          state: data.state || "",
          ZipPostalCode: data.zip || "",
          description: data.description || "",
          fileInput: data.images || [],
          FeaturedListing: data.featured_listing === true,
          OffTheMarketListing: data.off_market_listing === true,
          OwnerFinancing: data.owner_financing === true,
          ShowNumber: data.show_phone === true,
          ShowEmail: data.show_email === true,
          Noi: data.noi || "",
          CapRate: data.cap_rate || "",
          custom_fields: data.custom_fields || {},
          OneTime: data.feauture_with_one_time || false,
        });
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  const steps = [
    <Step1 onNext={nextStep} defaultValues={formData} />,
    <Step2 onNext={nextStep} onBack={prevStep} defaultValues={formData} />,
    <Step3
      onBack={prevStep}
      onSubmit={handleFinalSubmit}
      formData={loading ? "loading..." : formData}
    />,
  ];

  return (
    <>
      {/* BANNER START  */}
      <section>
        <div>
          <img
            className="h-[25vh] sm:h-[40vh] object-cover w-[100%]"
            src={AddPropertyBanner}
            alt=""
          />
        </div>
      </section>
      {/* BANNER END   */}

      {/* PROPERTY FORM  */}
      <section
        ref={stepRef}
        className="sm:px-7 lg:px-10 xl:px-20 py-16 lg:py-20 flex justify-center"
      >
        <div className="flex flex-col gap-8 sm:gap-10 w-[100%] 2xl:w-[85%] min-[1780px]:!w-[70%] ">
          <div className="px-2.5 sm:px-0">
            <h1 className="text-[28px] leading-[32px] min-[400px]:text-[32px] min-[400px]:leading-[38px] font-[700] font-Urbanist text-[#1E1E1E] md:text-[35px] lg:text-[39px] xl:text-[43px] sm:leading-[48px]">
              Add New Property Listing
            </h1>
            <p className="text-[13px] min-[400px]:text-[13.5px] font-Inter font-medium text-pretty text-Paracolor mt-2 md:text-[14px]/8 sm:leading-[18px]">
              Fill out the form below to create your property listing
            </p>
          </div>

          {/* STEP TABS*/}
          <div className="flex justify-center gap-1 min-[380px]:gap-3 md:gap-5 bg-[#F3EEFF] items-center px-0 min-[380px]:px-4 py-3 rounded-[5px] mx-1 min-[380px]:!mx-2 sm:!mx-0">
            {["Property Details", "Photo & Media", "Preview & Submit"].map(
              (label, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 w-[100%]"
                  onClick={() => {
                    if (index <= currentStep) setCurrentStep(index);
                  }}
                >
                  <span
                    className={`text-[12px] min-[400px]:text-[14px] md:text-[14.5px] lg:text-[15px] xl:text-[18px] w-full  rounded-[5px] text-center px-0.5 md:px-10 py-2 font-[600] font-Urbanist border border-[#cecece]  ${currentStep === index
                      ? "text-white bg-PurpleColor"
                      : "text-Paracolor"
                      }`}
                  >
                    {label}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Current Step Form */}
          {loading ? (
            <div className="h-[100vh] flex justify-center items-center">
              <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
            </div>
          ) : (
            <div>{steps[currentStep]}</div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertyForm;