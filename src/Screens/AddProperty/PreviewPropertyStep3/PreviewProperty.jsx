import { Building, DollarSign, Image, Phone } from "lucide-react";
import Checkboxs from "../../../Components/InputFields/Checkboxs";
import PropertyDetail from "./PropertyDetail/PropertyDetail";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import ImagesCarousel from "../../../Components/ImagesCarousel/ImagesCarousel";
import { loadStripe } from "@stripe/stripe-js";
import StripeCardForm from "../../Pricing/StripeCardForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_ID
);


const Step3 = ({ formData, onBack, onSubmit }) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmInfo: false,
      authorizedToList: false,
    },
  });
  const status = localStorage.getItem("status");
  useEffect(() => {
    if (formData) {
      reset();
    }
  }, [formData, reset]);

  const cardFormRef = useRef();

  const handlePaymentSuccess = (paymentMethodId) => {
  };


  const handleFinalSubmit = async (data) => {
    const finalData = { ...formData, ...data };

    if (status !== "active" && finalData.FeaturedListing === true) {
      if (cardFormRef.current) {
        const paymentResult = await cardFormRef.current.submitPayment();
        if (!paymentResult.success) {
          return; // stop if payment fails
        }
        finalData.paymentMethodId = paymentResult.paymentMethodId;
      }
    } else {
      finalData.paymentMethodId = null;
    }

    onSubmit(finalData);
  };


  return (
    <>
      <Elements stripe={stripePromise}>

        <form onSubmit={handleSubmit(handleFinalSubmit)}>
          <div className="border border-[#ececec] rounded-2xl px-3.5 sm:px-5 py-8 mx-3 sm:mx-0">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center md:gap-0">
              <div>
                <h1 className="text-[20px] sm:text-[25px] md:text-[28px] font-[700] font-Urbanist  text-[#1E1E1E] lg:text-[30px]">
                  Property Preview
                </h1>
                <p className="max-[400px]:text-[11.5px] text-[13.5px] font-Inter font-medium text-pretty text-Paracolor mt-1 md:text-[13.5px] lg:text-[14px]/8 sm:leading-[18px] ">
                  Review your listing before publishing
                </p>
              </div>
            </div>

            {/* Image Preview */}
            <ImagesCarousel images={formData.fileInput || []} />

            {/* Property Details */}
            <PropertyDetail formData={formData} />

            {/* Description */}
            <div className="grid grid-cols-2">
              <div className="py-5">
                <h1 className="text-[22px] font-[700] font-Urbanist text-[#1E1E1E]">
                  Description
                </h1>
                <p className="text-[13.5px] break-all font-Inter font-medium text-Paracolor mt-1">
                  {formData.description}
                </p>
              </div>

              <div>
                {status !== "active" &&
                  formData?.FeaturedListing === true &&
                  (formData?.OneTime === false || formData?.OneTime === undefined) && (
                    <StripeCardForm
                      ref={cardFormRef}
                      onPaymentSuccess={handlePaymentSuccess}
                    />
                  )}

              </div>
            </div>

            {/* Verification Checkboxes */}
            <div className="bg-[#f5f5f5] px-5 py-5 rounded-[8px]">
              <h1 className="text-[18px] font-[600] font-Urbanist text-[#1E1E1E] flex items-center gap-2">
                <Building size={22} /> Listing Verification
              </h1>
              <div className="mt-3 flex flex-col gap-4 sm:gap-3">
                <Controller
                  name="confirmInfo"
                  control={control}
                  rules={{ required: "You must confirm the information." }}
                  render={({ field }) => (
                    <Checkboxs
                      {...field}
                      labels="I confirm that all information provided is accurate and complete"
                      error={errors.confirmInfo?.message}
                    />
                  )}
                />
                <Controller
                  name="authorizedToList"
                  control={control}
                  rules={{ required: "You must confirm authorization to list." }}
                  render={({ field }) => (
                    <Checkboxs
                      {...field}
                      labels="I am authorized to list this property"
                      error={errors.authorizedToList?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-between px-1.5 py-5 mx-3 sm:mx-0">
            <button
              type="button"
              onClick={onBack}
              className="bg-transparent border-[#6C757D] text-[#6C757D] border-2 font-[600] px-3 py-2.5 sm:px-5 sm:py-2 cursor-pointer rounded-[6px] text-[13px]"
            >
              Back to Photo & Media
            </button>
            <button
              type="submit"
              className="bg-PurpleColor text-white font-[600] px-3 py-2.5 sm:px-5 sm:py-2 rounded-[6px] cursor-pointer text-[13px]"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </Elements>

    </>
  );
};

export default Step3;
