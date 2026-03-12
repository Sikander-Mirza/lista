import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// COMPONETS
import AdminNavbar from "../Navbar/AdminNavbar";
// IMAGES
import BlackLogo from "../../assets/NewListaBlackLogo.png";
import Dashboardicon1_1 from "../../assets/Icons/AdminIcon1.1.png";
import Dashboardicon1_3 from "../../assets/Icons/AdminIcon1.3.png";
import Dashboardicon1_11 from "../../assets/Icons/AdminIcon1.1.1.png";
import Dashboardicon1_31 from "../../assets/Icons/Dashboardicon1.3.1.png";
import {
  CreditCard,
  Headset,
  Info,
  Lock,
  MessageCircleWarning,
  UserRoundSearch,
  UserSearch,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useUnreadMessageCount from "../../CustomHook/InquiriesCount/InquiriesCount";
import { fetchUser } from "../../Reducers/authSlice/authSlice";

const AdminSidebar = ({ screen }) => {
  const location = useLocation();
  const status = localStorage.getItem("status");
  const token = localStorage.getItem("token");
  const ProfileComplete = localStorage.getItem("ProfileComplete");
  const ApiKey = import.meta.env.VITE_API_KEY;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchUser({ token, apiKey: ApiKey }));
    }
  }, [dispatch, token, ApiKey]);


  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const isLocked = !token || status !== "active";
  const ProfileIsLocked = !token;

  const toggleDrawer = () => setIsMobileDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsMobileDrawerOpen(false);

  const unreadMessages = useUnreadMessageCount();

  const totalUnreadCount = useSelector(
    (state) => state.unread.totalUnreadCount
  );

  const pendingOffersCount = useSelector(
    (state) => state.pendingOffers.pendingOffersCount
  );

  // useEffect(() => {
  //   if (!token || status !== "active") {
  //     setisLocked(true);
  //   }
  // }, []);


  console.log(location.pathname);
  

  return (
    <>
      <div className="bg-[#F9F7FF]  flex flex-col min-[890px]:flex-row gap-10 pt-6 min-[890px]:pt-6.5 justify-end ">
        {/* MOBILE SCREEN BUTTON */}
        <button
          type="button"
          onClick={toggleDrawer}
          className="absolute inline-flex w-max top-9 sm:top-8.5 left-3 sm:ml-4 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg min-[890px]:hidden sm:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className=" w-5 h-5 min-[420px]:w-6 min-[420px]:h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {/* SIDE BAR MENU  */}
        <aside
          id="logo-sidebar"
          className={` overflow-y-auto  fixed top-0 left-0 z-40 w-[100%] h-full py-6 sm:py-0 min-[890px]:!py-5 min-[890px]:top-6.5  sm:w-[50%] md:w-[43%] min-[890px]:!w-[30%] lg:!w-[30%] xl:!w-[24%]  flex justify-center lg:justify-start flex-col transition-transform bg-white  min-[890px]:rounded-r-[20px]
              min-[890px]:translate-x-0
            ${isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
            } min-[890px]:fixed `}
          aria-label="Sidebar"
        >
          {/* CLOSE BUTTON - ONLY ON MOBILE */}
          <button
            type="button"
            onClick={closeDrawer}
            className="absolute top-5 right-3 inline-flex items-center p-2  text-gray-500 rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-200 min-[890px]:hidden"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-5 h-5 sm:w-7 sm:h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="h-full pb-10 sm:py-7 lg:pt-9 overflow-y-auto bg-white rounded-r-[20px] no-scrollbar">
            <Link
              to={"/"}
              className="flex items-center px-7 pt-10 pb-8 sm:pb-7 min-[890px]:py-0 min-[890px]:justify-center min-[890px]:ps-2.5 min-[890px]:mb-"
            >
              <img
                src={BlackLogo}
                className="h-[50px] sm:h-[60px] 2xl:h-[80px] me-3 md:h-16"
                alt="Newlista Logo"
              />
            </Link>
            <ul className="space-y-0.5 sm:space-y-1 font-medium ">
              <li className="relative">
                <Link
                  to={ProfileIsLocked ? "#" : "/admin"}
                  state={{ from: location.pathname }}
                  onClick={
                    ProfileIsLocked
                      ? (e) => e.preventDefault()
                      : () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin" && !ProfileIsLocked
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    } ${ProfileIsLocked ? "cursor-not-allowed opacity-60" : ""}`}
                  title={ProfileIsLocked ? "Complete your profile to view Dashboard" : ""}
                >
                  {ProfileIsLocked && (
                    <Info
                      strokeWidth={3}
                      className="absolute text-red-600 size-3 right-7  sm:size-4 -mt-1 sm:mt-0 "
                    />
                  )}
                  {location.pathname === "/admin" ? (
                    <img
                      className="h-4.5 w-4.5 sm:h-4.5 sm:w-5 2xl:w-6 2xl:h-6"
                      src={Dashboardicon1_1}
                      alt=""
                    />
                  ) : (
                    <img
                      className="h-4.5 w-4.5 sm:h-4.5 sm:w-5 2xl:w-6 2xl:h-6"
                      src={Dashboardicon1_11}
                      alt=""
                    />
                  )}
                  <h1 className="font-Urbanist font-[500] text-[15px] sm:mt-1 sm:text-[16px] 2xl:text-[19px]">
                    Dashboard
                  </h1>
                </Link>
              </li>
              <li className="relative">
                <Link
                  to={ProfileIsLocked ? "#" : "/admin/listing"}
                   state={{ from: location.pathname }}
                  onClick={
                    ProfileIsLocked
                      ? (e) => e.preventDefault()
                      : () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin/listing" && !ProfileIsLocked
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    } ${ProfileIsLocked ? "cursor-not-allowed opacity-60" : ""}`}
                  title={ProfileIsLocked ? "Complete your profile to view Listings" : ""}
                >
                  {ProfileIsLocked && (
                    <Info
                      strokeWidth={3}
                      className="absolute text-red-600 size-3 right-7  sm:size-4 -mt-1 sm:mt-0 "
                    />
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>

                  <h1 className="font-Urbanist font-[500] text-[15px] sm:mt-1 sm:text-[16px] 2xl:text-[18.5px]">
                    My Listings
                  </h1>
                </Link>
              </li>

              <li className="relative">
                <Link
                  to={"/admin/network"}
                  state={{ from: location.pathname }}
                  onClick={
                    () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin/network"
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    }`}
                  title={isLocked ? "Upgrade Your Plan to access Network" : ""}
                >
                  {/* {isLocked && (
                    <Lock
                      strokeWidth={3}
                      className="absolute text-red-600 size-3 right-7  sm:size-4 -mt-1 sm:mt-0 "
                    />
                  )} */}
                  {location.pathname === "/admin/network" ? (
                    <img
                      className="h-4.5 w-4.5 sm:h-4.5 sm:w-5 2xl:w-6 2xl:h-6"
                      src={Dashboardicon1_31}
                      alt=""
                    />
                  ) : (
                    <img
                      className="h-4.5 w-4.5 sm:h-4.5 sm:w-5 2xl:w-6 2xl:h-6"
                      src={Dashboardicon1_3}
                      alt=""
                    />
                  )}
                  <h1 className="font-Urbanist font-[500] text-[15px] sm:mt-1 sm:text-[16px] 2xl:text-[18px]">
                    My Network
                  </h1>
                </Link>
              </li>
              <li className="relative">
                <Link
                  to={"/admin/inbox"}
                  state={{ from: location.pathname }}
                  onClick={
                    () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin/inbox"
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    } `}
                  title={isLocked ? "Upgrade Your Plan to access Inbox" : ""}
                >
                  {/* {isLocked && (
                    <Lock
                      strokeWidth={3}
                      className="absolute text-red-600 size-3 right-7  sm:size-4 -mt-1 sm:mt-0 "
                    />
                  )} */}
                  {!isLocked && totalUnreadCount > 0 && (
                    <div className="absolute text-red-600 size-3 right-10 top-2.5">
                      <span
                        className={`text-white text-[13.5px] font-Urbanist px-2 py-[2px] rounded-full flex items-center justify-center font-semibold min-w-[22px] h-[22px] ${location.pathname === "/admin/inbox" && !isLocked
                          ? "bg-black"
                          : "bg-green-500 text-[#666666]"
                          }`}
                        style={{ paddingTop: "2px" }} // Optional for vertical centering tweak
                      >
                        {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
                      </span>
                    </div>
                  )}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <h1 className="font-Urbanist font-[500] text-[15px] sm:mt-1 sm:text-[16px] 2xl:text-[18px]">
                    Inbox
                  </h1>
                </Link>
              </li>
              <li className="relative">

                <Link
                  to={ProfileIsLocked ? "#" : "/admin/inquiry"}
                  onClick={
                    ProfileIsLocked
                      ? (e) => e.preventDefault()
                      : () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin/inquiry" && !ProfileIsLocked
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    } ${ProfileIsLocked ? "cursor-not-allowed opacity-60" : ""}`}
                  title={ProfileIsLocked ? "Complete your profile to view inquiries" : ""}
                >
                  {ProfileIsLocked && (
                    <Info
                      strokeWidth={3}
                      className="absolute text-red-600 size-3 right-7  sm:size-4 -mt-1 sm:mt-0 "
                    />
                  )}

                  <MessageCircleWarning className="size-6" />
                  <h1 className="font-Urbanist font-[500] text-[15px] sm:mt-1 sm:text-[16px] 2xl:text-[18.5px]">
                    Inquiries
                  </h1>
                  {totalUnreadCount > 0 && (
                    <div className="absolute text-red-600 size-3 right-10 top-2.5">
                      <span
                        className={`text-white text-[13.5px] font-Urbanist px-2 py-[2px] rounded-full flex items-center justify-center font-semibold min-w-[22px] h-[22px] ${location.pathname === "/admin/inquiry"
                          ? "bg-black"
                          : "bg-green-500 text-[#666666]"
                          }`}
                        style={{ paddingTop: "2px" }} // Optional for vertical centering tweak
                      >
                        {unreadMessages > 99 ? "99+" : unreadMessages}
                      </span>
                    </div>
                  )}
                </Link>
              </li>

              <li className="relative">
                <Link
                  to={"/admin/myoffers"}
                  state={{ from: location.pathname }}
                  onClick={
                    () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin/myoffers"
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    } `}
                  title={isLocked ? "Upgrade Your Plan to access Offers" : ""}
                >
                  {/* {isLocked && (
                    <Lock
                      strokeWidth={3}
                      className="absolute text-red-600 size-3 right-7  sm:size-4 -mt-1 sm:mt-0 "
                    />
                  )} */}
                  {!isLocked && pendingOffersCount > 0 && (
                    <div className="absolute text-red-600 size-3 right-10 top-2.5">
                      <span
                        className={`text-white text-[13.5px] font-Urbanist px-2 py-[2px] rounded-full flex items-center justify-center font-semibold min-w-[22px] h-[22px] ${location.pathname === "/admin/myoffers" && !isLocked
                          ? "bg-black"
                          : "bg-green-500 text-[#666666]"
                          }`}
                        style={{ paddingTop: "2px" }} // Optional for vertical centering tweak
                      >
                        {pendingOffersCount > 99 ? "99+" : pendingOffersCount}
                      </span>
                    </div>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>
                  <h1 className="font-Urbanist font-[500] text-[15px] sm:mt-1 sm:text-[16px] 2xl:text-[18px]">
                    My Offers
                  </h1>
                </Link>
              </li>
              <li className="relative">
                <Link
                  to={"/admin/analytics"}
                  state={{ from: location.pathname }}
                  onClick={
                    () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin/analytics"
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    } `}
                  title={isLocked ? "Upgrade Your Plan to access Analytics/Insights" : ""}
                >
                  {/* {isLocked && (
                    <Lock
                      strokeWidth={3}
                      className="absolute text-red-600 size-3 right-7  sm:size-4 -mt-1 sm:mt-0 "
                    />
                  )} */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  </svg>
                  <h1 className="font-Urbanist font-[500] text-[15px] sm:mt-1 sm:text-[16px] 2xl:text-[18px]">
                    Analytics/Insights
                  </h1>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/account-setting"}
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                  }}
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg  group gap-4  ${location.pathname === "/admin/account-setting"
                    ? "bg-PurpleColor text-white"
                    : ""
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <h1 className="font-Urbanist font-[500] sm:mt-1 text-[15px] sm:text-[16px] 2xl:text-[18px]">
                    Profile Settings
                  </h1>
                </Link>
              </li>
              <li className="relative">

                <Link
                  to={user && user.profile_complete === 0 ? "#" : "/admin/subscription"}
                  onClick={
                    user && user.profile_complete === 0
                      ? (e) => e.preventDefault()
                      : () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin/subscription" && !ProfileIsLocked
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    } ${user && user.profile_complete === 0 ? "cursor-not-allowed opacity-60" : ""}`}
                  title={user && user.profile_complete === 0 ? "Complete your profile to view subscription setting" : ""}
                >
                  {user && user.profile_complete === 0 && (
                    <Info
                      strokeWidth={3}
                      className="absolute text-red-600 size-3 right-7  sm:size-4 -mt-1 sm:mt-0 "
                    />
                  )}

                  <CreditCard size={20} className="sm:size-[21px]" />
                  <h1 className="font-Urbanist font-[500] sm:mt-1 text-[15px] sm:text-[16px] 2xl:text-[18px]">
                    Subscription Settings
                  </h1>
                </Link>
              </li>
              <li className="relative">
                <Link
                  to={"/admin/customer-support"}
                  state={{ from: location.pathname }}
                  onClick={
                    () => setIsMobileDrawerOpen(false)
                  }
                  className={`flex items-center p-2 px-6 sm:px-7 text-gray-900 rounded-r-lg group gap-4 ${location.pathname === "/admin/customer-support"
                    ? "bg-PurpleColor text-white"
                    : "text-[#666666]"
                    } `}
                  title={isLocked ? "Upgrade Your Plan to access Help and Support" : ""}
                >

                  <Headset className="size-[19px] sm:size-[21px]" />
                  <h1 className="font-Urbanist font-[500] text-[15px] sm:mt-1 sm:text-[16px] 2xl:text-[18px]">
                    Help/Support
                  </h1>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* ADMIN SCREEN  */}
        <div className="px-4 flex flex-col gap-2 min-[890px]:!w-[70%] xl:!w-[75%] h-[100%] min-h-screen pb-5">
          <div>
            <AdminNavbar></AdminNavbar>
          </div>
          <div>{screen}</div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
