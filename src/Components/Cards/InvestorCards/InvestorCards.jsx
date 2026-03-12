// IMAGES
import InvestorIcon1 from "../../../assets/Icons/InvestorIcon1.png";
import InvestorIcon2 from "../../../assets/Icons/InvestorIcon2.png";
import InvestorIcon3 from "../../../assets/Icons/InvestorIcon3.png";


import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const InvestorCards = ({
  InvesImage,
  InvesUserName,
  InvesDesc,
  onConnectClick,
  onMessageClick,
  state,
  PropertyInterest,
  year,
  id,
  button
}) => {
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="border-[1px] border-solid border-[#BBBBBB] px-7 py-7 rounded-[8px] w-[94%] sm:w-[280px] md:w-[270px] min-[950px]:w-[280px] lg:w-[280px] h-[360px] flex flex-col justify-between ">
        {/* IMAGES AND USERNAME  */}
        <div className="flex justify-start items-center gap-3 border-b-[1px] border-solid border-Paracolor pb-7">
          <span>
            <img
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] object-cover rounded-full"
              src={InvesImage}
              alt=""
            />
          </span>
          <span>
            <h4 className="font-Inter font-bold text-[19.5px] sm:text-[22px] leading-[25px]">
              {InvesUserName}
            </h4>
            <h6 className="font-Inter text-[15px] font-[500]">{InvesDesc}</h6>
          </span>
        </div>
        <div className="pt-7 flex flex-col justify-end">
          {/* FEATURES  */}
          <ul className="flex justify-start items-start flex-col gap-3">
            <li className="flex gap-3 justify-center items-center">
              <img className="w-5 h-5 " src={InvestorIcon1} alt="" />
              <p className="font-Inter text-[15px] text-Paracolor font-[600]">
                {state || "Not Provided "}
              </p>
            </li>
            <li className="flex gap-3 justify-center items-center">
              <img className="w-5 h-5 " src={InvestorIcon2} alt="" />
              <p className="font-Inter text-[15px] text-Paracolor font-[600]">
                {PropertyInterest}
              </p>
            </li>
            <li className="flex gap-3 justify-center items-center">
              <img className="w-5 h-5 " src={InvestorIcon3} alt="" />
              <p className="font-Inter text-[15px] text-Paracolor font-[600]">
                Member {year}
              </p>
            </li>
          </ul>
          {/* BUTTONS  */}
          <div className=" swiper-no-swiping flex gap-4 pt-7">
            <button
              onClick={(e) => {
                onConnectClick(id);
              }}
              disabled={button === "pending"}
              className={`font-Inter swiper-no-swiping font-semibold text-[15px]  py-1.5 rounded-full border-solid border-[2px] hover-btn ${
                button === "pending"
                  ? "bg-gray-400 border-gray-400  text-white cursor-not-allowed"
                  : "hover-btn hover-btn-green cursor-pointer 64AAE9 pl-4 pr-6 sm:px-6"
              }`}
            >
              <span>{button === "pending" ? "Sent" : "Connect"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestorCards;
