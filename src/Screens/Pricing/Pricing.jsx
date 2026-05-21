import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import Spinner from "../../Components/Spinner/Spinner";
import PlansTabs from "../../Components/OurPlans/PlansTabs";

// IMAGE
import Shape from "../../assets/Illustration/Shape.png";
import Shape2 from "../../assets/Illustration/Shape2.png";
import HomeSec5_2 from "../../assets/Illustration/HomeSec5.2.png";
import PricingSec2_1 from "../../assets/Illustration/PricingSec2.1.png";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Reducers/authSlice/authSlice";
import AlertModal from "../../Components/AlertModal/UpgradeModal";
import Swal from "sweetalert2";
import showProfileIncompleteModal from "../../Components/AlertModal/showProfileIncompleteModal";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Clock, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Static plan feature data
// ─────────────────────────────────────────────────────────────

const freebenefits = [
  {
    label: "Browse all public listings ",
    checked: true,
  },
  {
    label: "Create and publish listings",
    checked: true,
  },
  {
    label: "Contact any listing owner through the Contact Property Owner / Inquiry form",
    checked: true,
  },
  {
    label: "Receive and reply to inquiries (email-based communication) ",
    checked: true,
  },
  {
    label: "No private inbox or message history",
    checked: false,
  },
  {
    label: "No investor-to-investor private dashboard messaging",
    checked: false,
  },

  // {
  //   label: "Make Direct Property Offers and Receive Instant Notifications",
  //   checked: false,
  // },
  // {
  //   label: "Exclusive Early-Access Listings",
  //   checked: false,
  // },
  // {
  //   label: "Premium Customer Support",
  //   checked: false,
  // },
];

const benefits = [
  {
    label: "Private inbox & full message history inside the dashboard",
    checked: true,
  },
  {
    label: "Direct investor-to-investor messaging (no email clutter)",
    checked: true,
  },
  {
    label: "Message any user from the dashboard inbox ",
    checked: true,
  },
  {
    label: "Faster communication workflow (in-dashboard threads)",
    checked: true,
  },
  {
    label: "Early access to premium features as they roll out",
    checked: true,
  },

  // {
  //   label: "Make Direct Property Offers and Receive Instant Notifications",
  //   checked: true,
  // },
  // {
  //   label: "Exclusive Early-Access Listings",
  //   checked: true,
  // },
  // {
  //   label: "Premium Customer Support",
  //   checked: true,
  // },
];

// ─────────────────────────────────────────────────────────────
// RequestAccessModal
// Shown when a logged-in user clicks the Founding Investor
// Access button. Replaces the old "subscribe immediately" flow.
// ─────────────────────────────────────────────────────────────

const RequestAccessModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ApiKey = import.meta.env.VITE_API_KEY;

  // Reset every time modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount — safety net
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleRequest = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // POST to backend – creates a pending investor-access request
      await axios.post(
        `${ApiKey}/request-investor-access`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitted(true);
    } catch (error) {
      const status = error?.response?.status;

      // 409 = already requested → treat as success (idempotent UX)
      if (status === 409) {
        setSubmitted(true);
      } else {
        alert(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/50 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl
                    ring-1 ring-black/5 p-6 sm:p-8
                    animate-[pop_180ms_cubic-bezier(0.2,0.7,0.3,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600
                     focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          // ── Success state ──────────────────────────────────
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-green-100">
              <CheckCircle className="text-green-600" size={36} />
            </div>

            <h3 className="font-Urbanist text-xl font-bold text-gray-900">
              Request Received!
            </h3>

            <p className="font-Inter text-sm text-gray-600 leading-6">
              Your request for{" "}
              <span className="font-semibold text-gray-800">
                Founding Investor Access
              </span>{" "}
              has been submitted. Our team will review your profile and contact
              you within{" "}
              <span className="font-semibold text-gray-800">
                1–3 business days
              </span>
              .
            </p>

            <div
              className="mt-1 flex items-center gap-2 rounded-lg
                          bg-amber-50 border border-amber-200 px-4 py-3 text-left"
            >
              <Clock size={16} className="text-amber-600 shrink-0" />
              <p className="font-Inter text-xs text-amber-700 font-medium">
                No action needed on your end. We'll email you once access is
                approved.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="mt-2 w-full font-Urbanist text-sm font-semibold
                         rounded-lg bg-[#703bf7] px-4 py-2.5 text-white
                         hover:opacity-90 focus:outline-none cursor-pointer"
            >
              Got it, thanks!
            </button>
          </div>
        ) : (
          // ── Default state ──────────────────────────────────
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div
                className="shrink-0 grid h-11 w-11 place-items-center
                            rounded-full bg-violet-100"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#703bf7]"
                >
                  <path
                    d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 8v5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="15.5" r="1" fill="currentColor" />
                </svg>
              </div>

              <div>
                <h3 className="font-Urbanist text-lg sm:text-xl font-bold text-gray-900">
                  Founding Investor Access
                </h3>
                <p className="font-Inter text-xs sm:text-sm text-gray-500 mt-0.5">
                  Free · Approval required
                </p>
              </div>
            </div>

            {/* What you get */}
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
              <p className="font-Inter text-xs sm:text-sm font-semibold text-violet-800">
                🔒 This tier is by invitation / approval only.
              </p>
              <ul
                className="mt-2 space-y-1.5 pl-1 font-Inter
                            text-xs sm:text-[13px] text-violet-700 font-medium"
              >
                <li>✅ Free access to the investor network</li>
                <li>✅ Off-market deal discovery</li>
                <li>✅ Connect with capital partners</li>
                <li>⏳ Access granted after admin review</li>
              </ul>
            </div>

            <p className="font-Inter text-xs sm:text-sm text-gray-600 leading-5">
              Click below to submit your access request. 
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 font-Urbanist text-sm font-semibold rounded-lg
                           border border-gray-300 bg-white px-4 py-2.5
                           text-gray-700 hover:bg-gray-50 focus:outline-none
                           cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleRequest}
                disabled={loading}
                className="flex-1 font-Urbanist text-sm font-semibold rounded-lg
                           bg-[#703bf7] px-4 py-2.5 text-white hover:opacity-90
                           disabled:opacity-60 disabled:cursor-not-allowed
                           focus:outline-none cursor-pointer"
              >
                {loading ? "Submitting…" : "Request Access"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Pricing Page
// ─────────────────────────────────────────────────────────────

const Pricing = () => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const ProfileComplete = localStorage.getItem("ProfileComplete");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      // navigate("/login");
    } else {
      dispatch(fetchUser({ token, apiKey: ApiKey }));
    }
  }, [dispatch, token, ApiKey]);

  // STATES
  const [PricingData, setPricingData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [checked, setchecked] = useState();
  const [AdminPay, setAdminPay] = useState(false);

  // ── New: controls the Request Access modal ──
  const [showRequestModal, setShowRequestModal] = useState(false);

  const isCurrentPlan = checked?.plan_id === PricingData?.id;
  const isActive = checked?.status === "active";

  // ─────────────────────────────────────────────
  // Premium plan button logic
  // Determines label / disabled / link / onClick
  // for the Founding Investor Access card.
  // ─────────────────────────────────────────────

  let buttonText = "Get Started Free";
  let disabled = false;
  let buttonLink = "/register";
  let onClick = null;
  let tooltip = "";

  if (token) {
    if (AdminPay === true) {
      // Admin manually granted – already active
      buttonText = "Activated";
      disabled = true;
      buttonLink = "";
      onClick = null;
    } else if (user && user.profile_complete === 0) {
      // Profile incomplete → nudge user to finish profile first
      buttonText = "Request Access";
      tooltip = "Finish your profile before requesting investor access";
      buttonLink = "";
      onClick = () => showProfileIncompleteModal();
    } else if (isCurrentPlan && isActive) {
      // Already on this plan and active
      buttonText = "Activated";
      disabled = true;
      buttonLink = "";
      onClick = null;
    } else if (!isCurrentPlan && isActive) {
      // On a different active plan → let them manage
      buttonText = "Manage";
      buttonLink = "/admin/subscription";
      onClick = null;
    } else {
      // Logged in, no active premium plan → show Request Access modal
      // This is the KEY FIX: instead of redirecting to /register
      // (which caused the "email already exists" loop), we now
      // open the RequestAccessModal so they can submit an approval request.
      buttonText = "Request Access";
      buttonLink = "";
      onClick = () => setShowRequestModal(true);
    }
  }

  // if (token) {

  //   if (AdminPay === true) {

  //     buttonText = "Get Started"
  //     buttonLink = "";
  //     onClick = () => Subscription(PricingData.id);

  //   } else if (user && user.profile_complete === 0) {
  //     buttonText = "Upgrade";
  //     tooltip = "Finish your profile to subscribe to premium"
  //     buttonLink = "";
  //     onClick = () => showProfileIncompleteModal();

  //   } else if (!checked || checked?.plan_id === null) {

  //     buttonText = "Upgrade";

  //     buttonLink = "";

  //     // onClick = () => Subscription(PricingData.id);
  //     onClick = () => navigate("/register"); // ← this caused the loop

  //   } else if (isCurrentPlan && isActive) {

  //     buttonText = "Activated";

  //     disabled = true;

  //     buttonLink = "";

  //   } else if (!isCurrentPlan && isActive) {
  //     buttonText = "Manage";
  //     buttonLink = "/admin/subscription";
  //   }
  // }

  // ─────────────────────────────────────────────
  // Data fetching
  // ─────────────────────────────────────────────

  useEffect(() => {
    const GetPricing = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ApiKey}/plans`);
        setPricingData(response.data.plans);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    GetPricing();
  }, []);

  useEffect(() => {
    const CurrentPricing = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ApiKey}/current-subscribtion`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setchecked(response.data.subscription);

        if (
          response.data.subscription.by_admin === 1 ||
          response.data.subscription.by_admin === true
        ) {
          setAdminPay(true);
        }

        localStorage.setItem(
          "status",
          response.data.subscription.status !== null &&
            response.data.subscription.status
        );
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    CurrentPricing();
  }, []);

  const Subscription = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${ApiKey}/subscribe`,
        {
          plan_id: id,
          success_url: `${window.location.origin}/pricing?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/pricing`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = response.data.checkout_url;
      CurrentPricing();
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  console.log(PricingData);

  return (
    <>
      <Helmet>
        <title>Newlista Investor Membership Pricing & Off‑Market Access</title>
        <meta
          name="description"
          content="Explore Newlista's flexible membership plans. Choose the pricing tier that fits your investing goals and access our investor‑only network for off‑market deals."
        />
        <link rel="canonical" href="https://www.newlista.com/pricing" />

        <meta
          property="og:title"
          content="Investor-Only Commercial Real Estate Network | Newlista"
        />
        <meta
          property="og:description"
          content="Newlista is an online commercial real estate investor network where investors discover off-market opportunities and connect with capital partners across the United States."
        />
        <meta property="og:url" content="https://www.newlista.com/pricing" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.newlista.com/bg-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Investor-Only Commercial Real Estate Network | Newlista"
        />
        <meta
          name="twitter:description"
          content="Newlista is an online commercial real estate investor network where investors discover off-market opportunities and connect with capital partners across the United States."
        />
        <meta
          name="twitter:image"
          content="https://www.newlista.com/bg-image.jpg"
        />
      </Helmet>

      {/* ── PRICING SECTION ── */}
      <section>
        <div
          className="relative isolate max-[350px]:px-4 px-6 py-24 sm:py-32
                      lg:px-8 flex flex-col justify-center items-center overflow-hidden"
        >
          {/* SHAPE START */}
          <div
            className="absolute left-[74%] w-[50%] inset-x-0 -top-[10%]
                        -z-10 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <img src={Shape} alt="Newlista" />
          </div>

          <div
            className="absolute -left-[15%] w-[50%] inset-x-0 top-[25%]
                        -z-10 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <img src={Shape2} alt="Newlista" />
          </div>
          {/* SHAPE END */}

          {/* HEADER SECTION */}
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="max-[350px]:text-[13.5px] text-base/7 font-semibold
                          text-PurpleColor"
            >
              Pricing
            </h2>

            <h1
              className="lg:mt-2 max-[350px]:text-[28px] max-[350px]:leading-[33px]
                          text-[33px] leading-[36px] sm:leading-[45px] sm:text-[40px]
                          font-Urbanist tracking-tight text-balance text-gray-900
                          lg:text-5xl font-[700]"
            >
              Investor Membership Pricing & Off‑Market Access
            </h1>
          </div>

          <p
            className="mx-auto mt-4 lg:mt-6 max-w-3xl text-center text-[14.5px]
                        sm:text-lg font-medium text-pretty text-gray-600
                        sm:text-md/8 font-Urbanist"
          >
            Make offers, evaluate deals, and grow your{" "}
            <Link
              className="text-PurpleColor underline"
              to={token ? "/admin/network" : "/login"}
            >
              real estate network
            </Link>
            .
          </p>
          {/* HEADER SECTION END */}

          {/* ── Approval notice banner ──
               Shown to ALL visitors so expectations are set before
               they click anything. Eliminates the "why am I on
               the Register page again?" confusion. */}
          <div
            className="mt-8 w-full max-w-2xl rounded-xl border border-violet-200
                        bg-violet-50 px-5 py-4 flex items-start gap-3"
          >
            <span className="text-[#703bf7] text-xl shrink-0 mt-0.5">🔒</span>
            <div>
              <p className="font-Inter text-sm font-semibold text-violet-800">
                Founding Investor Access is free — but approval is required.
              </p>
              <p className="font-Inter text-xs text-violet-600 mt-1 font-medium leading-5">
                {token
                  ? // Logged-in users see an action-oriented message
                    'Click "Request Access" on the Founding Investor card to submit your application. Our team reviews all requests and will contact you within 1–3 business days.'
                  : // Guest users see a clear two-step instruction
                    "Create a free account first, then request Founding Investor Access from your dashboard. We review all applications and will contact you within 1–3 business days."}
              </p>
            </div>
          </div>

          {/* PLAN CARDS */}
          {!Loading ? (
            <div
              className="md:w-[55%] min-[800px]:!w-[100%] min-[1600px]:!w-[87%]
                          min-[1780px]:!w-[79%]"
            >
              <div
                className="grid xl:flex justify-center px-1 min-[400px]:!px-6
                            mt-10 grid-cols-1 min-[800px]:!grid-cols-2
                            items-center gap-y-6 sm:gap-y-10 lg:gap-y-10
                            sm:!px-24 md:!px-2 min-[800px]:!px-8 lg:!px-28
                            xl:!px-8 2xl:!px-[6%] xl:!grid-cols-2 gap-6"
              >
                {/* ── Free Plan Card ── */}
                <div className="max-w-[400px]">
                  <PlansTabs
                    features={freebenefits}
                    desc={""}
                    featured={
                      token
                        ? !checked || checked?.plan_id === null
                          ? true
                          : false
                        : false
                    }
                    PlanName={"Free"}
                    Pricing={"0 "}
                    Duration={""}
                    ButtonText={
                      !token
                        ? "Get Started Free"
                        : !checked || checked?.plan_id === null
                        ? "Activated"
                        : checked?.status === "active"
                        ? "Downgrade"
                        : "Upgrade"
                    }
                    disabled={
                      !token
                        ? false
                        : !checked || checked?.status === "active"
                    }
                    buttonLink={
                      !token
                        ? "/register"
                        : !checked || checked?.plan_id === null
                        ? ""
                        : checked?.status === "active"
                        ? "/admin/subscription"
                        : ""
                    }
                    // Onclick={
                    //   token &&
                    //     checked?.status !== "active" &&
                    //     checked?.plan_id !== null
                    //     ? () => Subscription(freePlanId)
                    //     : undefined
                    // }
                  />
                </div>

                {/* ── Founding Investor (Premium) Plan Card ── */}
                <div className="max-w-[400px]">
                  <PlansTabs
                    key={PricingData.id}
                    features={benefits}
                    // desc={"Limited-time introductory plan. Pricing and features may change for future billing periods. "}
                    desc={
                      "For a limited time only. Approval required. Must join for free first, and we will upgrade approved investors. We review all quality applications. "
                    }
                    featured={token && isCurrentPlan && isActive}
                    PlanName={PricingData.title}
                    // Pricing={`${PricingData.price} `}
                    Pricing={"0 "}
                    Duration={`/ ${PricingData.type}`}
                    ButtonText={buttonText}
                    disabled={disabled}
                    tooltip={tooltip}
                    buttonLink={buttonLink}
                    Onclick={onClick}
                    id={PricingData?.id}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center !h-[75vh]">
              <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
            </div>
          )}
        </div>
      </section>
      {/* PRICING SECTION END */}

      {/* ── SECTION 2 START ── */}
      <section className="flex justify-center items-center">
        <div
          className="flex flex-col justify-center gap-6 px-5 pb-16 sm:py-20
                      sm:pt-12 sm:gap-10 sm:pb-9 lg:pb-20 sm:px-8 md:px-0
                      md:items-center w-[100%] xl:w-[98%] 2xl:w-[85%]
                      min-[1780px]:!w-[78%]"
        >
          <div className="md:w-[84%]">
            <h2
              className="text-center md:text-start text-[28px] leading-[38px]
                          font-[700] font-Urbanist text-[#1E1E1E] sm:text-[37px]
                          sm:leading-[48px] xl:text-[34px] xl:-mb-5 2xl:mb-0"
            >
              Unlock Your Full Real Estate Potential
            </h2>
          </div>

          <div
            className="md:w-[84%] border-solid border-[1px] border-[#BBBBBB]
                        flex flex-col items-center rounded-[10px] pb-7 pt-3
                        md:py-4 lg:py-5 xl:py-0 md:flex-row relative"
          >
            <div className="w-[55%] sm:w-[35%] md:w-[24%] sm:h-[90%] xl:-mb-2">
              <img className="" src={PricingSec2_1} alt="Newlista" />
            </div>

            <div
              className="flex flex-col justify-center items-center text-center
                          gap-2 py-2 px-5 sm:px-10 md:w-[50%] md:px-3 lg:px-5
                          xl:px-16"
            >
              <h2
                className="font-Inter font-bold text-[16.5px] leading-[22px]
                            sm:text-[24px] md:text-[20px] lg:text-[22px]
                            sm:leading-[25px] min-[1780px]:!text-[28px]
                            min-[1780px]:!leading-[32px]"
              >
                Not sure which plan is right for you? Contact Us for a
                personalized recommendation.{" "}
              </h2>

              <h3 className="font-Urbanist font-semibold text-[15px] sm:text-[17px] text-gray-800">
                Apply for Free Investor Access
              </h3>
              <p className="font-Inter text-sm text-gray-500">
                Approval required, we review all applications.
              </p>

              <Link className="w-full" to={"/contact-us"}>
                <button
                  className="hover-btn-purple hover-btn py-2 text-[15px]
                               sm:text-[16px] text-white font-Inter rounded-[8px]
                               w-full cursor-pointer min-[1780px]:!w-[90%]
                               min-[1780px]:!py-3 min-[1780px]:!text-[17px]"
                >
                  <span>Contact Us</span>
                </button>
              </Link>

              {/* ── Quick request-access shortcut for logged-in users ──
                   Saves them from scrolling back up to the plan card */}
              {token && (
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="mt-1 w-full font-Urbanist text-sm font-semibold
                             rounded-[8px] border border-[#703bf7] text-[#703bf7]
                             py-2 hover:bg-violet-50 transition-colors
                             cursor-pointer min-[1780px]:!w-[90%]
                             min-[1780px]:!py-3 min-[1780px]:!text-[17px]"
                >
                  Request Investor Access
                </button>
              )}
            </div>

            <div className="hidden md:block w-[25%] h-[90%]">
              <img className="" src={HomeSec5_2} alt="Newlista" />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2 END */}

      {/* ── Request Access Modal ──
           Only mounted when a logged-in user triggers it.
           Non-logged-in users are sent to /register via buttonLink. */}
      <RequestAccessModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />

      <style>{`
        @keyframes pop {
          0%   { opacity: 0; transform: scale(.98) translateY(6px); }
          100% { opacity: 1; transform: scale(1)   translateY(0);   }
        }
      `}</style>
    </>
  );
};

export default Pricing;