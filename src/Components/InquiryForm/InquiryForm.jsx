"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Inputs from "../InputFields/Inputs";
import { Controller, useForm } from "react-hook-form";
import CountrySelector from "../RegisterCountrySelector/CountrySelection";
import NumberInputs from "../InputFields/NumberInputs";
import TextAreas from "../InputFields/TextAreas";
import axios from "axios";
import AlertModal from "../AlertModal/AlertModal";
import { AtSign, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Reducers/authSlice/authSlice";

function InquiryForm({ id, propertyAddress, ListingType, disable }) {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [Loading, setLoading] = useState(false);
  const ProfileComplete = localStorage.getItem("ProfileComplete")
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { user, error } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!token) {
      // navigate("/login");
    } else {
      dispatch(fetchUser({ token, apiKey: ApiKey }));
    }
  }, [dispatch, token, ApiKey]);
  const IsLocked = user?.profile_complete !== 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();


  console.log();
  

  const InquirySubmission = async (data) => {
    function formatUSPhone(phone) {
      if (!phone) return "";

      const cleaned = phone.replace(/\D/g, ""); // remove non-digits
      const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);

      if (match) {
        return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
      }

      return String(phone); // fallback: return as string
    }

    const formatted = formatUSPhone(data.phone);

    try {
      setLoading(true);
      const response = await axios.post(
        `${ApiKey}/loan-inquiry`,
        {
          name: data.BorrowerName,
          phone: formatted,
          email: data.Email,
          company: data.Company,
          loan_amount: data.LoanAmount,
          cash_on_hand: data.AvailableCash,
          timeline: data.Timeline,
          payment_method: data.PaymentMethod,
          property_address: propertyAddress,
          message: data.Message,
          property_id: id,
          action_url: `${window.location.origin}/properties/${id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reset();
      setOpen(false);
      AlertModal({
        icon: "success",
        title: "Thank you for your inquiry!",
        iconColor: "#703BF7",
        text: "Please allow us some time to process your request. A team member will get back to you shortly",
      });
    } catch (error) {
      setLoading(false);
      setOpen(false);
      AlertModal({
        icon: "error",
        title: "Thank You",
        iconColor: "#703BF7",
        text: error.response.data.message,
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
    reset();
  };

  const handleMakeOfferClick = () => {
    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      setOpen(true);
    }
  };




  return (
    <div>
      <button

        disabled={!IsLocked && true}
        onClick={handleMakeOfferClick}
        title={!IsLocked && "Finish your profile to subscribe to premium"}
        className={`  flex justify-center bg-PurpleColor items-center gap-2 text-white font-Urbanist px-3.5 py-2 text-[14px] rounded-[8px]  font-[600] hover-btn hover-btn-purple ${!IsLocked ? "cursor-not-allowed " : "cursor-pointer"}`}
      >
        <span>Loan Inquiry </span>
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 "
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-7 right-6  cursor-pointer"
              >
                <X className="size-6 bg-PurpleColor p-[2px] rounded-full  text-white" />
              </button>
              <form
                onSubmit={handleSubmit(InquirySubmission)}
                className="flex flex-col gap-5 px-7 py-14"
              >
                <div>
                  <h1 className="text-[33px] font-[700] font-Inter ">
                    INQUIRY FORM
                  </h1>
                  <p className="font-Urbanist font-[500] leading-[18px] text-[14.5px]">
                    {
                      ListingType === "Both (For Sale & For Lease)" ? "Looking to acquire this property? Let us help with financing — just share your contact details, financial info, and property description." : ListingType === "For Sale" ? "Looking to acquire this property? Let us help with financing — just share your contact details, financial info, and property description." : "Need financing for this opportunity? Let us help — just share your contact details, financial info, and property description."
                    }
                  </p>
                </div>
                <span className="">
                  <Inputs
                    name={"BorrowerName"}
                    register={register("BorrowerName", {
                      required: "First name is required",
                    })}
                    labels={"Borrower Name"}
                    error={errors.BorrowerName?.message}
                    placeholder={"Enter your Name"}
                  ></Inputs>
                </span>

                <span className="">
                  <Inputs
                    name={"Email"}
                    register={register("Email", {
                      required: "Email is required",
                    })}
                    labels={"Email"}
                    placeholder={"Enter your email"}
                    error={errors.Email?.message}
                  ></Inputs>
                </span>

                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <CountrySelector
                      phone={field.value}
                      setPhone={field.onChange}
                      Style=" xl:!w-[15%]"
                      error={errors.phone?.message}
                    />
                  )}
                />
                <span className="relative">
                  <Inputs
                    name={"Company"}
                    register={register("Company", {
                      required: false,
                    })}
                    labels={"Company"}
                    type="text"
                    placeholder={"Enter Your Company Name"}
                    error={errors.Company?.message}
                  ></Inputs>
                </span>
                <div className="grid grid-cols-2 gap-5">
                  <span>
                    <NumberInputs
                      name={"LoanAmount"}
                      register={register("LoanAmount", {
                        required: "Loan Amount is required",
                      })}
                      labels={"Loan Amount"}
                      type="text"
                      placeholder={"Enter Your Loan Amount"}
                      error={errors.LoanAmount?.message}
                    ></NumberInputs>
                  </span>
                  <span>
                    <NumberInputs
                      name={"AvailableCash"}
                      register={register("AvailableCash", {
                        required: false,
                      })}
                      labels={"Available Cash on Hand"}
                      type="text"
                      placeholder={"Enter Available Cash on Hand"}
                      error={errors.AvailableCash?.message}
                    ></NumberInputs>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span>
                    <Inputs
                      name={"PaymentMethod"}
                      register={register("PaymentMethod", {
                        required: false,
                      })}
                      labels={"Payment Method"}
                      type="text"
                      placeholder={"Enter Your Payment Method"}
                      error={errors.PaymentMethod?.message}
                    ></Inputs>
                  </span>
                  <span>
                    <Inputs
                      name={"Timeline"}
                      register={register("Timeline", {
                        required: false,
                      })}
                      labels={"Timeline"}
                      type="text"
                      placeholder={"Enter Timeline"}
                      error={errors.Timeline?.message}
                    ></Inputs>
                  </span>
                </div>
                <span className="relative">
                  <span>
                    <div className="block mb-1 font-[700] text-PurpleColor w-full max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px] ">
                      Property Address
                    </div>
                    <div className="bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-full px-4 rounded-[6px] h-12 flex items-center cursor-not-allowed">
                      {propertyAddress}
                    </div>
                  </span>
                </span>
                <span>
                  <TextAreas
                    label={"Message"}
                    placeholder={
                      "Type of loan (short-term/bridge or long-term), preferred loan terms, credit score, real estate experience, and any additional notes."
                    }
                    register={register("Message", {
                      required: false,
                    })}
                    error={errors.Message?.message}
                  ></TextAreas>
                </span>
                {/* Sign Up Button */}
                <div className="mt-1">
                  <button
                    type="submit"
                    disabled={Loading}
                    className={`bg-PurpleColor w-full h-11 cursor-pointer mt-3 text-white font-Urbanist rounded-[6px] font-[700] ${Loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {Loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default InquiryForm;
