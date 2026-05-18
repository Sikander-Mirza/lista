import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Award,
  Building2,
  Calendar,
  DollarSign,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import UnkownUser from "../../assets/fallback/UnknowUser.webp";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import BlockUserIcon from "../../assets/Icons/BlockUserIcon.png";
import ReportUserModal from "../ReportModal/ReportModal";

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    confirmLabel: "",
    onConfirm: () => {},
  });

  const handleClose = () => {
    if (showReportModal) {
      setShowReportModal(false);
    } else {
      onClose();
    }
  };

  const formatJoinDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `Joined ${year}-${month}-${day}`;
  };

  const renderButtons = () => {
    if (user.type === "myNetwork") {
      return (
        <>
          <button
            onClick={() => setShowReportModal(true)}
            title="Report User"
            className=""
          >
            <img className="w-7 h-7 cursor-pointer" src={BlockUserIcon} alt="Report" />
          </button>
        </>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Dialog */}
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-[#0000009a] bg-opacity-50" />
        <div className="fixed inset-0 z-40 flex items-start justify-center p-4 overflow-y-auto">
          <DialogPanel className="bg-white shadow-xl max-w-xl w-full relative rounded-lg">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-[14px] font-semibold cursor-pointer text-black z-50 hover:text-black bg-[#f0f0f0] rounded-full px-1.5 py-0.5"
            >
              ✕
            </button>

            {/* Header Image */}
            <div className="bg-gray-100 h-36 flex justify-center items-center relative rounded-t-[10px]">
              <div className="absolute left-6 bottom-[-40px] w-[105px] h-[105px] bg-gray-300 rounded-full border-4 border-PurpleColor shadow-md overflow-hidden">
                <img
                  className="rounded-full w-full h-[120%] object-cover absolute -mt-1.5"
                  src={
                    user.user.headshot
                      ? import.meta.env.VITE_IMAGE_KEY + user.user.headshot
                      : UnkownUser
                  }
                  alt="User"
                />
              </div>
              {user.user.banner ? (
                <img
                  className="object-cover h-36 w-full"
                  src={import.meta.env.VITE_IMAGE_KEY + user.user.banner}
                  alt="Banner"
                />
              ) : (
                <div className="text-gray-400">📷</div>
              )}
            </div>

            <div className="absolute right-4 mt-5 flex gap-2">
              {renderButtons(user)}
            </div>

            {/* Content */}
            <div className="px-6 pt-16 pb-6">
              <h1 className="text-2xl font-semibold mb-3">Profile Details</h1>
              <h2 className="text-xl font-bold">
                {user.user.first_name + " " + user.user.last_name}
              </h2>
              <p className="text-gray-600">{user.user.title}</p>

              {/* Info */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {/* {user.user.show_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="size-5 text-PurpleColor" />
                    <span>{user.user.phone}</span>
                  </div>
                )}
                {user.user.show_email && (
                  <div className="flex items-center gap-2">
                    <Mail className="size-5 text-PurpleColor" />
                    <span>{user.user.email}</span>
                  </div>
                )} */}
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-PurpleColor" />
                  <span>{formatJoinDate(user.user.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="size-5 text-PurpleColor" />
                  <span>{user.user.company_name || "Not Provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-PurpleColor" />
                  <span>
                    {user.user.address}, {user.user.city}, {user.user.state}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-5 text-PurpleColor" />
                  <span>{user.user.preferred_investment_range}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="size-5 text-PurpleColor" />
                  <span>
                    {user.user.years_of_experiance
                      ? `${user.user.years_of_experiance} Years`
                      : "0 Years"}
                  </span>
                </div>
              </div>

              {/* About Us */}
              <div className="mt-4 pt-4 border-t border-[#dfdfdf]">
                <h3 className="text-lg font-bold">About Us</h3>
                <p className="text-gray-700 mt-1 break-all">{user.user.bio}</p>
              </div>

              {/* Property Interests */}
              <div>
                <h3 className="text-lg font-bold mt-4">Property Interests</h3>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {user.user.property_interests.map((item, i) => (
                    <span
                      key={i}
                      className="bg-[#E3E3E3] text-gray-800 font-semibold px-3 py-1 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Move this OUTSIDE Dialog */}
      {showReportModal && (
        <ReportUserModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          userId={user.user.id}
          from="From Network:"
        />
      )}
    </>
  );
};

export default ProfileModal;
