import { Switch } from "@headlessui/react";
import { AlertCircle, CreditCard, UserRoundCheck } from "lucide-react";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Switches from "../../../../Components/InputFields/Switch";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../../Components/ConfirmationModal/ConfirmationModal";
import { useConfirmation } from "../../../Admin/AccountSetting/Fields/Confirmation";

const ListingVisibilitySwitches = ({ register, setValue, watch, controls, PropertyRadio, defaultValues }) => {
  const status = localStorage.getItem("status");
  const navigate = useNavigate();
  const [showUpgradeConfirm, setShowUpgradeConfirm] = useState(false);

  const [ShowError, setShowError] = useState(false);
  const { isOpen, confirm, handleConfirm, handleCancel } = useConfirmation();

  return (
    <>
      <div className="flex flex-col py-5 gap-3 sm:gap-2">
        <div>
          <h1 className="font-Urbanist font-[600] text-[15px] sm:text-[16px] lg:text-[17px] text-PurpleColor  ">
            Listing Visibility Options
          </h1>
        </div>
        <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center gap-3 min-[380px]:!gap-4 sm:!gap-3">
          <div className=" max-[400px]:w-[13%] relative">
            <Controller
              name="FeaturedListing"
              control={controls}
              defaultValue={false}
              render={({ field }) => (
                <Switches
                  checked={field.value}
                  onChange={async () => {
                    if (!field.value) {
                      if (status === "active") {
                        field.onChange(true);
                        setValue("OffTheMarketListing", false);
                      } else if (defaultValues.OneTime) {
                        field.onChange(true);
                      } else {
                        const confirmed = await confirm();
                        if (confirmed) {
                          field.onChange(true);
                        }
                      }
                    } else {
                      field.onChange(false);
                    }
                  }}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              )}
            />

          </div>
          <div className="flex flex-col max-[400px]:w-[100%] gap-1">
            <span className="flex gap-3">
              <h1 className="block font-Urbanist text-[14.5px] sm:text-[15px] lg:text-[17px] font-[500] text-[#000000]">
                Featured Listing
              </h1>
              <div className="border-PurpleColor border  font-[600]  text-[12px] sm:text-[13px] w-max px-3 flex justify-center items-center text-PurpleColor font-Urbanist rounded-[14px] text-center">
                Premium
              </div>
              <div className="border-PurpleColor border  font-[600]  text-[12px] sm:text-[13px] w-max px-3 flex justify-center items-center text-white bg-PurpleColor font-Urbanist rounded-[14px] text-center">
                Pay 10$
              </div>
            </span>
            <p className="block font-Urbanist text-[12.5px] sm:w-[70%] leading-[16px] sm:text-[14px] lg:text-[14.5px] font-[400] text-[#222222]">
              Get top placement and more visibility with Featured Listings—$10 for free users, included for paid members.
            </p>
          </div>
        </div>
        {PropertyRadio === "For Sale" && <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center gap-3 min-[380px]:!gap-4 sm:!gap-3">
          <div className="max-[400px]:w-[13%]">
            <Controller
              name="OffTheMarketListing"
              control={controls}
              defaultValue={false}
              render={({ field }) => (
                <Switches
                  value={field.value}
                  onChange={() => {
                    if (status === "active") {
                      setValue("FeaturedListing", false); // Turn off Featured
                      field.onChange(!field.value); // Toggle current
                    } else {
                      setShowError(true);
                    }
                  }}
                  onBlur={field.onBlur}
                />
              )}
            />

          </div>
          <div className="flex flex-col max-[400px]:w-[100%] gap-0.5">
            <span className="flex gap-4">
              <h1 className="font-Urbanist text-[14.5px] sm:text-[15px] lg:text-[17px] font-[500]">
                Off‑the‑Market Listing
              </h1>
              <button
                type="button"
                className={`border border-PurpleColor text-PurpleColor font-[600] text-[13px] px-3 flex justify-center items-center rounded-[14px] font-Urbanist`}
              >
                Premium
              </button>
            </span>
            <p className="font-Urbanist text-[12.5px] sm:text-[14px] lg:text-[14.5px] font-[400] text-[#222]">
              Only visible to Professional users. Free users will see a blurred
              version.
            </p>
          </div>
        </div>}

        <div className="flex  items-center gap-3">
          <Controller
            name="OwnerFinancing"
            control={controls}
            defaultValue={false}
            render={({ field }) => <Switches {...field} />}
          />

          <div className="flex flex-co items-center gap-0.5">
            <span className="flex gap-4">
              <h1 className="block font-Urbanist text-[15px] lg:text-[17px] font-[500] text-[#000000]">
                Owner Financing
              </h1>
            </span>
            <button
              type="button"
              className="border-PurpleColor ml-2 border  font-[600]  text-[13px] w-max px-3 flex justify-center items-center text-PurpleColor font-Urbanist rounded-[14px] text-center"
            >
              Free
            </button>
          </div>
        </div>
      </div>

      {/* Contact Visibility  */}
      <div className="flex flex-col gap-3 mb-7">
        <div>
          <h1 className="font-Urbanist font-[600] text-[16px] lg:text-[17px] text-PurpleColor  ">
            Contact Visibility
          </h1>
        </div>
        <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center gap-3">
          <div>
            <Controller
              name="ShowNumber"
              control={controls}
              defaultValue={false} // Ensure this is set
              render={({ field }) => (
                <Switches
                  value={status === "active" ? field.value : setShowError(true)}
                  onChange={status === "active" ? field.onChange : setShowError(true)}
                  checked={status === "active" ? field.value : setShowError(true)} // Use field.value for checked
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>

          <div className="flex flex-co items-center gap-0.5">
            <span className="flex gap-4">
              <h1 className="block font-Urbanist text-[14.5px] leading-[18px] sm:text-[15px] lg:text-[17px] font-[500] text-[#000000]">
                Show my phone number on this listing
              </h1>
            </span>
            <button
              type="button"
              className="border-PurpleColor ml-2 border  font-[600] text-[13px] w-max px-3 flex justify-center items-center text-PurpleColor font-Urbanist rounded-[14px] text-center"
            >
              Premium
            </button>
          </div>
        </div>
        <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center gap-3">
          <div>
            <Controller
              name="ShowEmail"
              control={controls}
              defaultValue={false} // Ensure this is set
              render={({ field }) => (
                <Switches
                  value={status === "active" ? field.value : setShowError(true)}
                  onChange={status === "active" ? field.onChange : setShowError(true)}
                  checked={status === "active" ? field.value : setShowError(true)} // Use field.value for checked
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>

          <div className="flex flex-co items-center gap-0.5">
            <span className="flex gap-4">
              <h1 className="block font-Urbanist text-[14.5px] leading-[18px] sm:text-[15px] lg:text-[17px] font-[500] text-[#000000]">
                Show my email address on this listing
              </h1>
            </span>
            <button
              type="button"
              className="border-PurpleColor ml-2 border  font-[600] text-[13px] w-max px-3 flex justify-center items-center text-PurpleColor font-Urbanist rounded-[14px] text-center"
            >
              Premium
            </button>
          </div>
        </div>
      </div>

      {/* WARNING DIV */}
      {ShowError ? (
        <div className="">
          <div
            variant="outline"
            className="bg-amber-50 border border-amber-200  py-4 px-4 pl-5 sm:pr-8 sm:py-6 sm:w-[80%] md:w-max rounded-[8px] flex flex-col sm:flex-row gap-2 "
          >
            <AlertCircle className=" size-6 sm:size-9 md:size-0 md:h-5 md:w-5 mt-1" />

            <div className="flex flex-col ">
              <h1 className="block font-Urbanist text-[17px] leading-[24px] sm:text-[15.5px] lg:text-[19px] font-[500] text-amber-800">
                Premium features require a subscription
              </h1>
              <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row font-Urbanist mt-1.5 sm:mt-0 text-[13.5px] md:text-[14px] lg:text-[15px] font-[500] text-amber-800">
                Upgrade to a premium subscription to access featured and
                off-the-market listings.


                <button
                  onClick={() => setShowUpgradeConfirm(true)}
                  variant="outline"
                  size="sm"
                  type="button"
                  className="lg:ml-2 text-[12.5px] md:text-[13px] w-max text-black bg-amber-100 hover:bg-amber-200 border-amber-300 border px-4 rounded-[8px] py-2 hover-btn hover-btn-yellow"
                >
                  <span>Upgrade Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}


      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title="Activate Premium Feature"
        message="Activating the Featured Listing costs $10. Do you want to proceed?"
        confirmLabel="Yes, Pay $10"
        icon={
          <CreditCard className="size-20 text-PurpleColor  bg-amber-50 PurpleColor px-3.5 py-3.5 rounded-full" />
        }
        cancel={'Not now'}
        style="bg-PurpleColor"
      />

      <ConfirmationModal
        isOpen={showUpgradeConfirm}
        onClose={() => setShowUpgradeConfirm(false)}
        onConfirm={() => {
          setShowUpgradeConfirm(false);
          navigate("/pricing");
        }}
        title="You have unsaved changes"
        message="Are you sure you want to leave this page?"
        confirmLabel="Yes"
        cancel="Cancel"
        icon={
          <UserRoundCheck className="size-20 text-PurpleColor bg-amber-50 px-3.5 py-3.5 rounded-full" />
        }
        style="bg-PurpleColor"
      />

    </>
  );
};

export default ListingVisibilitySwitches;
