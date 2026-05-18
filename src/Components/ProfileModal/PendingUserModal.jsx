import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Calendar,
  CircleCheck,
  DollarSign,
  MapPin,
  Phone,
  UserRoundCheck,
  X,
} from "lucide-react";
import UnkownUser from "../../assets/fallback/UnknowUser.webp";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const PendingUserModal = ({
  isOpen,
  onClose,
  InvesImage,
  InvesUserName,
  Invessubtitle,
  onReject,
  id,
  user,
  type,
}) => {
  if (!isOpen) return null;

  const profileData = user?.user?.from_user || user?.user?.to_user || {};

  const formatJoinDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");

    return `Joined ${year}-${month}-${day}`;
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    confirmLabel: "",
    onConfirm: () => {},
  });

  // SEND CONNECTION REQUEST
  const openConfirmation = (actionType) => {
    let data = {};
    switch (actionType) {
      case "add":
        data = {
          icon: (
            <UserRoundCheck className="size-20 text-PurpleColor  bg-amber-50 PurpleColor px-3.5 py-3.5 rounded-full" />
          ),
          message: "You want to add this user to your network?",
          confirmLabel: "Add",
          style: "bg-PurpleColor",
          onConfirm: () => {
            AddtoNetwork(id);
            setOpenModal(false);
          },
        };
        break;

      case "accept":
        data = {
          icon: (
            <CircleCheck className="size-20 text-PurpleColor  bg-amber-50 PurpleColor px-3.5 py-3.5 rounded-full" />
          ),
          message: "You want to accept this request?",
          confirmLabel: "Accept",
          style: "bg-[#43B274]",
          onConfirm: () => {
            PendingRequest("accepted", id);
            setOpenModal(false);
          },
        };
        break;

      case "decline":
        data = {
          icon: (
            <X className="size-20 text-PurpleColor  bg-amber-50 PurpleColor px-3.5 py-3.5 rounded-full" />
          ),
          message: "You want to decline this request?",
          confirmLabel: "Decline",
          style: "bg-[#F61418]",
          onConfirm: () => {
            PendingRequest("declined", id);
            setOpenModal(false);
          },
        };
        break;
      default:
        return;
    }

    setModalData(data);
    setOpenModal(true);
  };

  // const renderButtons = () => {
  //   if (user.type === "addToNetwork") {
  //     return (
  //       <>
  //         <button
  //           onClick={() => openConfirmation("add")}
  //           disabled={user.button === "pending"}
  //           className={`font-Inter text-[#fff] font-semibold text-[12px] sm:text-[12.5px] sm:px-2.5 sm:py-1.5 px-2.5 py-1.5 lg:px-3.5 lg:py-2 rounded-full border-solid border-[2px] ${
  //             user.button === "pending"
  //               ? "bg-gray-400 border-gray-400 cursor-not-allowed"
  //               : "bg-PurpleColor border-PurpleColor cursor-pointer 64AAE9"
  //           }`}
  //         >
  //           {user.button === "pending" ? "Already Sent" : "Add to Network"}
  //         </button>

  //         {/* {user.button === "pending" ? (
  //           " "
  //         ) : (
  //           <button
  //             onClick={() => onReject(id)}
  //             className="font-Inter cursor-pointer text-[#fff] font-semibold text-[12px] px-4 py-1.5 sm:text-[12.5px] sm:px-2.5 sm:py-1 lg:px-3.5 rounded-full border-solid border-[2px] border-[#F61418] bg-[#F61418]"
  //           >
  //             Reject
  //           </button>
  //         )} */}
  //       </>
  //     );
  //   }
  //   if (user.type === "myNetwork") {
  //     return (
  //       <button className="font-Inter text-[#fff] font-semibold text-[15px] px-7 py-1.5 rounded-full border-solid border-[2px] border-[#43B274] bg-[#43B274] cursor-pointer">
  //         Message
  //       </button>
  //     );
  //   }
  //   if (user.type === "pending") {
  //     return (
  //       <>
  //         <button
  //           onClick={() => openConfirmation("accept")}
  //           className="font-Inter text-[#fff] font-semibold text-[15px] px-6 py-1.5 rounded-full border-solid border-[2px] border-[#43B274] bg-[#43B274] cursor-pointer"
  //         >
  //           Accept
  //         </button>
  //         <button
  //           onClick={() => openConfirmation("decline")}
  //           className="font-Inter cursor-pointer text-[#fff] font-semibold text-[12px]  px-6 py-1.5  sm:text-[14.5px] sm:px-2.5 sm:py-1 lg:px-5 lg:py-1.5 rounded-full border-solid border-[2px] border-[#F61418] bg-[#F61418]"
  //         >
  //           Decline
  //         </button>
  //       </>
  //     );
  //   }
  //   return null;
  // };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-[#0000009a] bg-opacity-50" />
        <div className="fixed inset-0 z-50 flex items-start justify-center min-[380px]:p-4 min-[380px]:my-[0.5%]  overflow-y-auto  min-[380px]:rounded-lg ">
          <DialogPanel className="bg-white shadow-xl sm:max-w-md  md:max-w-lg overflow-y-auto 2xl:max-w-xl w-full relative  min-[380px]:rounded-lg ">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[14px] font-semibold cursor-pointer text-black z-50 hover:text-black bg-[#f0f0f0] rounded-full px-1.5 py-0.5"
            >
              ✕
            </button>

            {/* Header Image Area */}
            <div className="bg-gray-100 h-36 flex justify-center items-center relative rounded-t-[10px] cursor-pointer ">
              <div className="absolute left-6 bottom-[-40px] w-[105px] h-[105px] bg-gray-300 rounded-full border-4 border-PurpleColor shadow-md overflow-hidden">
                <img
                  className="rounded-full w-full h-[120%] object-cover absolute -mt-1.5"
                  src={
                    profileData.headshot
                      ? import.meta.env.VITE_IMAGE_KEY + profileData.headshot
                      : UnkownUser
                  }
                  alt="Newlista"
                />
              </div>
              {profileData.banner ? (
                <div className="overflow-hidden h-36">
                  <img
                    className="object-cover"
                    src={import.meta.env.VITE_IMAGE_KEY + profileData.banner}
                    alt="Newlista"
                  />
                </div>
              ) : (
                <div className="text-gray-400">📷</div>
              )}
            </div>

            {/* Content */}
            <div className="px-6 pt-16 pb-6">
              {" "}
              {/* increased top padding here */}
              {/* Heading */}
              <h1 className="font-Urbanist text-[23px] mb-3 font-semibold">
                Profile Details
              </h1>
              {/* Basic Info */}
              <h2 className="text-2xl font-bold font-Urbanist">
                {profileData.first_name + " " + profileData.last_name}
              </h2>
              <p className="text-gray-600 font-Urbanist font-[500]">
                {profileData.title}
              </p>
              {/* Info Grid */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {/* <div className="flex items-center gap-2">
                  <Phone className="size-5 text-PurpleColor" />
                  <span className="font-Urbanist font-semibold text-[16px] text-Paracolor">
                    {profileData.phone}
                  </span>
                </div> */}
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-PurpleColor" />
                  <span className="font-Urbanist font-semibold text-[16px] text-Paracolor">
                    {formatJoinDate(profileData.created_at)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-PurpleColor" />
                  <span className="font-Urbanist font-semibold text-[16px] text-Paracolor">
                    {profileData.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-5 text-PurpleColor" />
                  <span className="font-Urbanist font-semibold text-[16px] text-Paracolor">
                    {profileData.preferred_investment_range}
                  </span>
                </div>
              </div>
              {/* About */}
              <div className="mt-4 pt-4 border-t border-[#dfdfdf]">
                <h3 className="text-[20px] font-bold font-Urbanist">
                  About Us
                </h3>
                <p className="text-Paracolor font-Urbanist font-[500] text-[15px] mt-1">
                  {profileData.bio}
                </p>
              </div>
              {/* Property Interests */}
              <div>
                <h3 className="text-[18px] font-bold mt-3 font-Urbanist">
                  Property Interests
                </h3>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {profileData.property_interests.map((items) => {
                    return (
                      <span className="bg-[#E3E3E3] text-Paracolor font-semibold font-Inter px-3 py-1 text-[12.5px] rounded-full w-max">
                        {items}
                      </span>
                    );
                  })}

                  {/* <span className="bg-[#E3E3E3] text-Paracolor font-semibold font-Inter px-3 py-1 text-[12.5px] rounded-full w-max">
                  Office Space
                </span> */}
                </div>
              </div>
              {/* Message Button */}
              {/* <div className="mt-7 flex gap-2">{renderButtons(user)}</div> */}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <ConfirmationModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        style={modalData.style}
        message={modalData.message}
        confirmLabel={modalData.confirmLabel}
        onConfirm={modalData.onConfirm}
        icon={modalData.icon}
      />
    </>
  );
};

export default PendingUserModal;
