import { useState } from "react";
import {
  Award,
  Building,
  Building2,
  Calendar,
  CircleCheck,
  DollarSign,
  Mail,
  MessageSquareDot,
  Navigation,
  Phone,
  User,
  UserRoundCheck,
  WalletCards,
  X,
} from "lucide-react";

// IMAGES
import UnkownUser from "../../../assets/fallback/UnknowUser.webp";

// COMPONENTS
import TruncatedText from "../../TruncatedText/TruncatedText";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";

const AddToNetwork = ({
  id,
  InvesImage,
  InvesUserName,
  InvesDesc,
  location,
  propertyTypes,
  onViewProfile,
  type,
  AddtoNetwork,
  PendingRequest,
  button,
  year,
  range,
  companyname,
  RemoveNetwork
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    confirmLabel: "",
    onConfirm: () => {},
  });
  const navigate = useNavigate();

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
      case "remove":
        data = {
          icon: (
            <X className="size-20 text-red-500  bg-amber-50 PurpleColor px-3.5 py-3.5 rounded-full" />
          ),
          message: "You want to Remove this request?",
          confirmLabel: "Remove",
          style: "bg-[#F61418]",
          onConfirm: () => {
            RemoveNetwork("remove", id);
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

  // INFO ITEMS
  const renderInfoItem = (title , icon, text, maxLength = null) => (
    <li  className="flex gap-3 justify-center items-center">
      {<span title={title} className="text-[13px] cursor-pointer">{icon}</span>}
      {/* {<img className="w-5 h-5" src={icon} alt="" />} */}
      <p className="font-Inter text-[15px] text-Paracolor font-[600]">
        {maxLength ? <TruncatedText text={text} maxLength={maxLength} /> : text}
      </p>
    </li>
  );

  // RENDER BUTTONS
  const renderButtons = () => {
    if (type === "addToNetwork") {
      return (
        <>
          <button
            onClick={() => openConfirmation("add")}
            disabled={button === "pending"}
            className={`font-Inter text-[#fff] font-semibold text-[12px] sm:text-[12.5px] sm:px-2.5 sm:py-1.5 px-2.5 py-1.5 lg:px-3.5 lg:py-2 rounded-full border-solid border-[2px] ${
              button === "pending"
                ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                : "bg-PurpleColor border-PurpleColor cursor-pointer 64AAE9"
            }`}
          >
            {button === "pending" ? "Pending" : "Add to Network"}
          </button>
        </>
      );
    }
    if (type === "myNetwork") {
      return (
        <>
          <button
            onClick={() => {
              navigate("/admin/inbox", {
                state: {
                  userId: id,
                  userName: `${InvesUserName}`,
                },
              });
            }}
            className="font-Inter text-[#fff] font-semibold text-[13px] sm:text-[15px] px-7 py-1.5 rounded-full border-solid border-[2px] border-[#43B274] bg-[#43B274] cursor-pointer"
          >
            Message
          </button>
          <button
            onClick={() => openConfirmation("remove")}
            className="font-Inter cursor-pointer text-[#fff] font-semibold text-[13px] px-4 py-1.5 sm:text-[12.5px] sm:px-2.5 sm:py-1 lg:px-3.5 rounded-full border-solid border-[2px] border-[#F61418] bg-[#F61418]"
          >
            Remove
          </button>
        </>
      );
    }
    if (type === "pending") {
      return (
        <>
          <button
            onClick={() => openConfirmation("accept")}
            className="font-Inter text-[#fff] font-semibold text-[15px] px-6 py-1.5 rounded-full border-solid border-[2px] border-[#43B274] bg-[#43B274] cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={() => openConfirmation("decline")}
            className="font-Inter cursor-pointer text-[#fff] font-semibold text-[12px]  px-6 py-1.5  sm:text-[14.5px] sm:px-2.5 sm:py-1 lg:px-5 lg:py-1.5 rounded-full border-solid border-[2px] border-[#F61418] bg-[#F61418]"
          >
            Decline
          </button>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className="max-[400px]:w-[280px]  w-[305px] border-[1px] border-solid border-[#BBBBBB] px-7 py-7 rounded-[8px] sm:w-[290px] md:w-[280px]  lg:w-[300px] xl:w-[290px] 2xl:w-[310px]">
        {/* IMAGES AND USERNAME  */}
        <div
          onClick={() => onViewProfile?.()}
          className="flex justify-start items-center gap-3 border-b-[1px] border-solid border-Paracolor pb-7 cursor-pointer"
        >
          <span>
            <img
              className="w-[68px] h-[70px] object-cover rounded-full"
              src={
                InvesImage
                  ? `${import.meta.env.VITE_IMAGE_KEY}${InvesImage}`
                  : UnkownUser
              }
              alt="Investor Profile"
            />
          </span>
          <span>
            <h4 className="font-Inter font-bold text-[20px]">
              <TruncatedText text={InvesUserName} maxLength={11} />
            </h4>
            <h6 className="font-Inter text-[14px] leading-[15px] font-[500]">
              <TruncatedText text={`${InvesDesc}`} maxLength={19} />
            </h6>
          </span>
        </div>
        <div className="pt-7">
          {/* FEATURES  */}
          <ul className="flex justify-start items-start flex-col gap-3">
            {renderInfoItem(
              "Company Name",
              <Building2
                strokeWidth={2.5}
                className="size-5.5 text-PurpleColor font-[900]"
              />,
              `${companyname || "Not Provide"}`
            )}
            {renderInfoItem(
              "Location",
              <Navigation
                strokeWidth={3}
                className="size-5.5 text-PurpleColor font-[900]"
              />,
              location,
              20
            )}

            {renderInfoItem(
              "Property Type",
              <Building
                strokeWidth={2.5}
                className="size-5.5 text-PurpleColor font-[900]"
              />,
              propertyTypes?.join(" - "),
              20
            )}

            {renderInfoItem(
              "Investment Range",
              <DollarSign
                strokeWidth={2}
                className="size-5.5 text-PurpleColor font-[900]"
              />,
              range,
              15
            )}
            {renderInfoItem(
              "Years Of Experience",
              <Award
                strokeWidth={2}
                className="size-5.5 text-PurpleColor font-[900]"
              />,
              year ? year + " Years" : "0 Years",
              15
            )}
          </ul>
          {/* BUTTONS  */}
          <div className="flex gap-1 sm:gap-3 pt-5">{renderButtons()}</div>
        </div>
      </div>

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

export default AddToNetwork;
