import React, { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useForm } from "react-hook-form";
import TextAreas from "../InputFields/TextAreas";
import axios from "axios";
import { X } from "lucide-react";
import Spinner from "../Spinner/Spinner";

const REPORT_REASONS = [
  "Spam or scam",
  "Inappropriate content",
  "Fake profile",
  "Harassment or bullying",
  "Other",
];

const ReportUserModal = ({ isOpen, onClose, userId, from }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      reasons: "",
      otherReason: "",
    },
  });

  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const selectedReason = watch("reasons");
  const otherReasonText = watch("otherReason");
  const isOtherChecked = selectedReason === "Other";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      reset();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    if (!data.reasons) {
      return;
    }
    if (data.reasons === "Other" && !data.otherReason.trim()) {
      return;
    }




    try {
      const finalReason =
        data.reasons === "Other" ? data.otherReason : data.reasons;


      setLoading(true);
      const response = await axios.post(
        `${ApiKey}/network/report-user`,
        {
          reported_user_id: userId,
          reason: from + " " + finalReason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message);
      onClose();
      reset();
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-60">
      <DialogBackdrop className="fixed inset-0 bg-[#0000009a]" />
      <div className="fixed inset-0 flex items-center justify-center px-4 py-10">
        <DialogPanel className="bg-white rounded-lg max-w-md w-full px-6 py-8 relative shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl font-bold hover:text-red-600 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X />
          </button>

          <h2 className="text-3xl font-bold font-Inter mb-4">
            {from === "From Chat:" || from === "From Network:"
              ? "Report User"
              : "Report Property"}
          </h2>

          {!loading ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="mb-4">
                <legend className="font-semibold mb-2 font-Urbanist">
                  Select a reason:
                </legend>

                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className="flex items-center mb-2 font-Urbanist text-[15px]"
                  >
                    <input
                      type="radio"
                      value={reason}
                      {...register("reasons", {
                        required: "Please select a reason.",
                      })}
                      className="mr-2"
                    />
                    {reason}
                  </label>
                ))}

                {/* Show textarea only if 'Other' is selected */}
                {isOtherChecked && (
                  <div className="mt-3">
                    <TextAreas
                      name="otherReason"
                      placeholder="Please describe your reason..."
                      register={register("otherReason", {
                        validate: (value) =>
                          isOtherChecked && !value.trim()
                            ? "Please enter a reason for 'Other'."
                            : true,
                      })}
                    />
                    {errors.otherReason && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.otherReason.message}
                      </p>
                    )}
                  </div>
                )}
                {errors.reasons && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.reasons.message}
                  </p>
                )}
              </fieldset>

              <p className="text-[13px] text-Paracolor rounded mb-4 font-medium">
                {from === "From Chat:" || from === "From Network:"
                  ? " Note: Reporting this user will remove your connection with them!"
                  : ""}
              </p>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-[15px] font-Poppins font-semibold cursor-pointer"
                >
                  Submit Report
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-center h-[45vh] items-center">
              <Spinner style={"w-10 h-16 text-PurpleColor z-50"} />
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReportUserModal;
