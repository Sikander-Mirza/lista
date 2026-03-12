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
import { AtSign, DollarSign, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function MakeOffer({ id }) {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const status = localStorage.getItem("status");
   const location = useLocation();
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const MakeOffer = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${ApiKey}/offer/submit`,
        {
          property_id: id,
          amount: data.OfferPrice,
          message: data.Message,
          action_url: `${window.location.origin}/admin/myoffers`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);
      AlertModal({
        icon: "success",
        title: "Thank you for your Offer!",
        iconColor: "#703BF7",
        text: "",
        timer: 3000
      });
    } catch (error) {
      setLoading(false);
      setOpen(false);
      AlertModal({
        icon: "error",
        title: "Sorry!",
        iconColor: "#703BF7",
        text: error.response.data.message,
        timer: 3000
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
    reset();
  };

  const handleMakeOfferClick = () => {
    if (!token) {
      navigate("/login" , { state: { from: location.pathname } });
    } else if (status === "active") {
      setOpen(true);
    } else {
      navigate("/pricing");
    }
  };


  return (
    <div>
      <button
        onClick={handleMakeOfferClick}
        className={`bg-transparent text-blue-500 border-blue-500  font-[600] cursor-pointer max-[400px]:text-[13px] text-[14px] md:text-[15px] lg:text-[16px]  pl-2.5 pr-2.5 min-[400px]:pl-3 min-[400px]:pr-4 py-2 font-Urbanist rounded-[8px] hover:border-black hover-btn hover-btn-purple`}
      >
        <span className="flex gap-1 items-center ">
          <DollarSign className="size-4 md:size-4.5 lg:size-5" /> Make an Offer
        </span>
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
                onSubmit={handleSubmit(MakeOffer)}
                className="flex flex-col gap-5 px-7 py-14"
              >
                <div>
                  <h1 className="text-[33px] font-[700] font-Inter ">
                    Make An Offer
                  </h1>
                  <p className="font-Urbanist font-[500] leading-[18px] text-[14.5px]">
                    Submit your offer directly through this form. Our team will
                    review it and get back to you promptly to discuss the next
                    steps.
                  </p>
                </div>

                <span className="relative ">
                  <label className="block mb-1 font-[700] text-PurpleColor text-[15px]">
                    {"Offer Price"}
                  </label>
                  <div className="flex items-end">
                    <span className="px-2 bg-[#F3EEFF] py-3.5 rounded-l-[5px]">
                      <DollarSign className="size-4 top-4 md:size-4.5 lg:size-5" />
                    </span>
                    <span className="w-full">
                      <NumberInputs
                        name={"OfferPrice"}
                        register={register("OfferPrice", {
                          required: "Offer Price is required",
                        })}
                        labels={""}
                        style={"!rounded-l-[0px]"}
                        type="text"
                        placeholder={"Enter Your Offer"}
                        error={errors.OfferPrice?.message}
                      ></NumberInputs>
                    </span>
                  </div>
                </span>
                <span>
                  <TextAreas
                    label={"Your Proposal / Message"}
                    placeholder={
                      "Describe the property, its features, location advantages, and any unique selling points."
                    }
                    register={register("Message", {
                      required: "Message is required",
                    })}
                    error={errors.Message?.message}
                  ></TextAreas>
                </span>
                {/* Sign Up Button */}
                <div className="mt-1">
                  <button
                    type="submit"
                    disabled={Loading}
                    className={`bg-PurpleColor w-full h-11 cursor-pointer mt-3 text-white font-Urbanist rounded-[6px] font-[700] ${
                      Loading ? "opacity-50 cursor-not-allowed" : ""
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

export default MakeOffer;
