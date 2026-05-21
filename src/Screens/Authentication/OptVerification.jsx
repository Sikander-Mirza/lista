import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Image from "../../assets/Banners/OptVerificationImage.jpg";
import OtpInput from "../../Components/OtpSender/OtpSender";
import Spinner from "../../Components/Spinner/Spinner";
import { ArrowRight, CheckCircle, Clock, Mail } from "lucide-react";
import { createPortal } from "react-dom";
// ─────────────────────────────────────────────────────────────
// FoundingInvestorWelcomeModal
// Shown AFTER successful OTP verification.
// Explains Founding Investor Access approval process.
// Has a Contact Us button so user can request approval.
// User must actively dismiss — no accidental backdrop close.
// ─────────────────────────────────────────────────────────────

const FoundingInvestorWelcomeModal = ({ isOpen, onContinue, redirectPath }) => {

  // ── Lock html + body scroll while open ──
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflowY: "auto",
      }}
      // Intentionally NO onClick on backdrop
      // User must read and click a button to proceed
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl
                   ring-1 ring-black/5 overflow-hidden
                   animate-[pop_200ms_cubic-bezier(0.2,0.7,0.3,1)_both]"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* ── Purple top accent bar ── */}
        <div className="h-2 w-full bg-[#703bf7]" />

        <div className="px-6 py-6 sm:px-8 sm:py-7 flex flex-col gap-5">

          {/* ── Icon + Title ── */}
          <div className="flex flex-col items-center text-center gap-3">
            <div
              className="grid h-16 w-16 place-items-center rounded-full
                          bg-green-100 ring-4 ring-green-50"
            >
              <CheckCircle size={36} className="text-green-600" />
            </div>

            <div>
              <h2 className="font-Urbanist text-xl sm:text-2xl font-bold text-gray-900">
                Account Verified! 🎉
              </h2>
              <p className="font-Inter text-sm text-gray-500 mt-1">
                Your free Newlista account is now active.
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="h-px w-full bg-gray-100" />

          {/* ── Founding Investor Access explanation ── */}
          <div className="flex flex-col gap-3">
            <p className="font-Inter text-sm font-semibold text-gray-800">
              Want Founding Investor Access?
            </p>

            {/* Key info box */}
            <div
              className="rounded-xl border border-violet-200 bg-violet-50
                          px-4 py-4 flex flex-col gap-2"
            >
              <p className="font-Inter text-xs sm:text-sm text-violet-800 font-semibold">
                🔒 Free · But approval is required
              </p>
              <p
                className="font-Inter text-xs sm:text-[13px] text-violet-700
                            font-medium leading-5"
              >
                Founding Investor Access unlocks private messaging, direct
                investor-to-investor communication, and early access to
                off-market deals — completely free during our launch period.
              </p>
            </div>

            {/* ── 3-step process ── */}
            <div className="flex flex-col gap-2.5 mt-1">

              {/* Step 1 — done */}
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 grid h-6 w-6 place-items-center
                              rounded-full bg-green-100 mt-0.5"
                >
                  <CheckCircle size={13} className="text-green-600" />
                </div>
                <p className="font-Inter text-xs sm:text-sm text-gray-700 font-medium">
                  <span className="font-semibold">Step 1 done —</span>{" "}
                  Free account created & verified.
                </p>
              </div>

              {/* Step 2 — contact us */}
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 grid h-6 w-6 place-items-center
                              rounded-full bg-violet-100 mt-0.5"
                >
                  <Mail size={13} className="text-[#703bf7]" />
                </div>
                <p className="font-Inter text-xs sm:text-sm text-gray-700 font-medium">
                  <span className="font-semibold">Step 2 —</span>{" "}
                  Contact us to request Founding Investor Access.
                </p>
              </div>

              {/* Step 3 — we review */}
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 grid h-6 w-6 place-items-center
                              rounded-full bg-amber-100 mt-0.5"
                >
                  <Clock size={13} className="text-amber-600" />
                </div>
                <p className="font-Inter text-xs sm:text-sm text-gray-700 font-medium">
                  <span className="font-semibold">Step 3 —</span>{" "}
                  We review your profile and email you 
                </p>
              </div>

            </div>

            {/* ── Warning: don't make a second account ── */}
            <div
              className="rounded-xl border border-amber-200 bg-amber-50
                          px-4 py-3 flex items-start gap-2 mt-1"
            >
              <span className="text-amber-500 shrink-0 mt-0.5 text-sm">
                ⚠️
              </span>
              <p
                className="font-Inter text-[11px] sm:text-xs text-amber-700
                            font-medium leading-5"
              >
                <span className="font-semibold">
                  Do not create another account.
                </span>{" "}
                Contact us and we'll upgrade your existing account once
                approved.
              </p>
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex flex-col gap-3 mt-1">

            {/* Primary: Contact Us to request access */}
            <Link
              to="/contact-us"
              className="w-full font-Urbanist text-sm sm:text-[15px] font-bold
                         rounded-xl bg-[#703bf7] px-4 py-3 text-white
                         hover:opacity-90 focus:outline-none
                         focus:ring-2 focus:ring-violet-300
                         flex items-center justify-center gap-2"
              onClick={onContinue}
            >
              <Mail size={16} />
              Request Founding Investor Access
            </Link>

            {/* Secondary: Skip and go to dashboard */}
            <button
              onClick={onContinue}
              className="w-full font-Urbanist text-sm font-semibold
                         rounded-xl border border-gray-300 bg-white
                         px-4 py-2.5 text-gray-600 hover:bg-gray-50
                         focus:outline-none flex items-center
                         justify-center gap-2 cursor-pointer"
            >
              Go to Dashboard
              <ArrowRight size={15} />
            </button>

          </div>

          <p className="font-Inter text-[11px] text-gray-400 text-center -mt-2">
            You can always request access later from your dashboard.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ─────────────────────────────────────────────────────────────
// Main OTP Verification Page
// ─────────────────────────────────────────────────────────────

const OptVerification = () => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const [Loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [otpSendMsg, setOtpSendMsg] = useState("");
  const storedEmail = localStorage.getItem("UserEmail");
  const navigate = useNavigate();

  // ── Welcome modal state ──
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState("/admin/account-setting");

  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm();

  // ── Resend OTP ────────────────────────────────────────────
  const resendOtp = async () => {
    if (!storedEmail) {
      setGeneralError("Email not found. Please try again.");
      return;
    }

    setLoading(true);
    setGeneralError("");
    setOtpSendMsg("");

    try {
      const res = await axios.post(`${ApiKey}/forgot-password`, {
        email: storedEmail,
      });

      setOtpSendMsg("OTP sent successfully");
    } catch (err) {
      setGeneralError(
        err?.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Verify OTP ────────────────────────────────────────────
  const verifyOtp = async (data) => {
    if (!storedEmail) {
      setGeneralError("Email not found. Please start from the beginning.");
      return;
    }

    setLoading(true);
    setGeneralError("");

    try {
      const res = await axios.post(`${ApiKey}/verify-otp`, {
        email: storedEmail,
        otp: data.otp,
      });

      // Store auth data
      localStorage.removeItem("UserEmail");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("User", JSON.stringify(res.data.user));
      localStorage.setItem(
        "ProfileComplete",
        JSON.stringify(res.data.profile_complete)
      );

      reset();

      // Determine where to redirect after modal is dismissed
      const redirectTo = res.data.profile_complete
        ? "/admin"
        : "/admin/account-setting";

      setPendingRedirect(redirectTo);

      // ── Show welcome modal instead of navigating directly ──
      // This is the KEY change: user sees the Founding Investor
      // Access explanation before being sent to the dashboard.
      setShowWelcomeModal(true);

    } catch (err) {
      const msg =
        err?.response?.data?.message || "Something went wrong.";

      if (msg.toLowerCase().includes("otp")) {
        setError("otp", { type: "manual", message: msg });
      } else {
        setGeneralError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Handle modal dismiss ──────────────────────────────────
  // Called when user clicks either button inside the modal.
  // "Contact Us" button also calls this via onClick on the Link.
  // "Go to Dashboard" calls this directly.
  const handleModalContinue = () => {
    setShowWelcomeModal(false);
    navigate(pendingRedirect);
  };

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <>
      <div className="min-h-screen md:flex">

        {/* ── Image panel ── */}
        <div className="md:w-[40%] min-[900px]:w-[48%] lg:w-[43%] xl:w-[42%] 2xl:w-[48%]">
          <img
            src={Image}
            alt="OTP Verification"
            className="w-full object-cover h-[20vh] sm:h-[30vh] md:h-full"
          />
        </div>

        {/* ── OTP form panel ── */}
        <div
          className="flex flex-col justify-center gap-7 px-8 sm:px-16
                      lg:px-20 xl:px-28 2xl:px-32 py-20
                      md:w-[50%] lg:w-[55%]"
        >
          <div>
            <h1
              className="font-Poppins font-bold text-[32px] sm:text-[38px]
                          lg:text-[44px] 2xl:text-[48px]"
            >
              Verify code
            </h1>
            <p
              className="font-Urbanist text-Paracolor font-semibold
                          text-[13px] sm:text-[14px] lg:text-[15px]"
            >
              An authentication code has been sent to your email.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(verifyOtp)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "OTP must be 6 digits",
                },
              }}
              render={({ field }) => (
                <OtpInput
                  length={6}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={errors.otp}
                />
              )}
            />

            {/* Success message */}
            {otpSendMsg && (
              <p className="text-green-600 text-[13px] font-Poppins">
                {otpSendMsg}
              </p>
            )}

            {/* OTP error */}
            {errors.otp && (
              <p className="text-red-600 text-[13.5px] font-Urbanist pt-1">
                {errors.otp.message}
              </p>
            )}

            {/* General error */}
            {generalError && (
              <p className="text-red-600 font-Poppins text-[13px]">
                {generalError}
              </p>
            )}

            {/* Resend */}
            <p className="font-Urbanist text-[13px]">
              Didn't receive a code?{" "}
              <button
                type="button"
                onClick={resendOtp}
                disabled={Loading}
                className="text-[#FF8682] font-bold hover:underline cursor-pointer"
              >
                Resend
              </button>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={Loading}
              className={`bg-PurpleColor h-11 w-full 2xl:w-[80%] text-white
                          rounded-[6px] font-Urbanist font-bold mt-3
                          cursor-pointer
                          ${Loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {Loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>

      {/* ── Founding Investor Welcome Modal ──
           Fires AFTER successful OTP verification.
           Blocks navigation until user clicks a button.
           Has two options:
           1. "Request Founding Investor Access" → /contact-us
           2. "Go to Dashboard" → /admin or /admin/account-setting  */}
      <FoundingInvestorWelcomeModal
        isOpen={showWelcomeModal}
        onContinue={handleModalContinue}
        redirectPath={pendingRedirect}
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

export default OptVerification;