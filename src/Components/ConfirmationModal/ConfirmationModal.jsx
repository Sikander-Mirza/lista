
import { UserRoundCheck, X } from "lucide-react";
import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmLabel,
  icon,
  style,
  title,
  cancel
}) => {
  return (
    <div
      className={`fixed inset-0 z-[9999999] flex items-center justify-center bg-[#000000c2] bg-opacity-50 transition-opacity duration-300  ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 transform transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-gray-400 cursor-pointer rounded-lg w-8 h-8 flex items-center justify-center"
        >
          <X />
        </button>

        {/* Icon & Message */}
        <div className="text-center py-4 flex flex-col gap-2">
          <div className="flex justify-center items-center text-2xl">
            {icon}
          </div>
          <h1 className="font-Inter font-[700] text-[#3d3d3d] text-[23px]">
           {title && title || "Are You Sure?"}
          </h1>
          <h3 className="font-Inter text-[16px] font-medium text-gray-700">
            {message}
          </h3>
          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={onConfirm}
              type="button"
              className={` px-4.5 py-2.5 text-white rounded-[5px] font-Inter text-[15px] cursor-pointer ${style} `}
            >
              {confirmLabel}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="bg-[#ffeded] font-[600] px-4.5 py-2.5 text-PurpleColor rounded-[5px] font-Inter text-[15px] cursor-pointer "
            >
              {cancel ? cancel : "Cancel" }
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ConfirmationModal;
