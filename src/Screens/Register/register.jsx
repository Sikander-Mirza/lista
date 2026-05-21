// Register.jsx - Complete Refactored Version

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import CountrySelector from "../../Components/RegisterCountrySelector/CountrySelection";
import Inputs from "../../Components/InputFields/Inputs";
import Image from "../../assets/Banners/LoginPage.jpg";
import { Eye, EyeOff, CheckCircle, Clock } from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";
import { Helmet } from "react-helmet-async";

// ─────────────────────────────────────────────
// Small reusable sub-components (keep in same
// file or extract – your call)
// ─────────────────────────────────────────────

/**
 * AgreementModal
 * Shown BEFORE the free account is created.
 * Replaces the old "subscribe immediately" flow.
 */
const AgreementModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
  isGoogleFlow,
}) => {
  const [agreed, setAgreed] = useState(false);

  // Reset checkbox every time modal opens
 useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/50 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg md:max-w-2xl bg-white shadow-2xl
                    ring-1 ring-black/5 rounded-2xl flex flex-col
                    animate-[pop_180ms_cubic-bezier(0.2,0.7,0.3,1)_both]
                    max-h-[90dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="bg-[#703bf7] text-white px-5 py-5 sm:px-6 rounded-t-2xl">
          <div className="flex items-start gap-3">
            <div className="shrink-0 grid h-11 w-11 place-items-center rounded-full bg-white/20">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
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
              <h2 className="font-Urbanist text-xl sm:text-2xl font-semibold leading-7">
                Important Notice for Investors
              </h2>
              <p className="font-Urbanist mt-0.5 text-xs sm:text-sm text-white/80">
                Please review and accept the terms below to continue.
              </p>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-5 sm:px-6 pt-5 pb-3 overflow-y-auto">
          <div className="rounded-xl border border-red-400 bg-red-50 p-4">
            <p className="font-Inter text-sm sm:text-[15px] font-semibold text-red-700">
              Newlista is exclusively for bona fide real-estate investors.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 font-Inter text-xs sm:text-sm text-red-700/90 font-medium">
              <li>No soliciting, wholesaling, or marketing to other users.</li>
              <li>We do not facilitate syndications.</li>
              <li>Investors must comply with all SEC rules and regulations.</li>
              <li>
                Misuse of the platform may result in suspension or a ban
                without refund.
              </li>
              <li>By signing up, you agree to these terms.</li>
            </ul>
          </div>

          {/* What happens next – sets correct expectations
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="font-Inter text-xs sm:text-sm font-semibold text-blue-800">
              📋 What happens after you sign up?
            </p>
            <ul className="mt-2 space-y-1 pl-1 font-Inter text-xs sm:text-[13px] text-blue-700 font-medium">
              <li>✅ A free account will be created for you instantly.</li>
              <li>
                ✅ You can request access to the Investor Network from your
                dashboard.
              </li>
              <li>
                🔒 Founding Investor Access is granted by admin approval only.
              </li>
            </ul>
          </div> */}

          {/* Checkbox */}
          <label className="mt-5 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 sm:h-5 sm:w-5 shrink-0 cursor-pointer"
            />
            <span className="font-Inter text-xs sm:text-sm font-medium text-gray-800">
              I have read and agree to the Important Notice above, as well as
              the{" "}
              <Link
                to="/terms-of-use"
                className="text-[#703bf7] underline underline-offset-2"
                target="_blank"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-[#703bf7] underline underline-offset-2"
                target="_blank"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        {/* ── Footer ── */}
        <div
          className="mt-2 flex items-center justify-end gap-3
                      border-t border-gray-200 bg-slate-50 px-5 sm:px-6 py-4
                      rounded-b-2xl"
        >
          <button
            onClick={onClose}
            className="font-Urbanist text-sm font-semibold inline-flex items-center
                       justify-center rounded-lg border border-slate-300 bg-white
                       px-4 py-2.5 text-slate-700 hover:bg-slate-50
                       focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Cancel
          </button>

          <button
            disabled={!agreed || loading}
            onClick={onConfirm}
            className="font-Urbanist text-sm font-semibold inline-flex items-center
                       justify-center rounded-lg bg-[#703bf7] px-4 py-2.5 text-white
                       hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60
                       focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            {loading ? "Processing…" : "Agree & Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// RequestAccessModal
// Shown when a LOGGED-IN user clicks
// "Founding Investor Access" on the Pricing page.
// ─────────────────────────────────────────────
export const RequestAccessModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ApiKey = import.meta.env.VITE_API_KEY;

  const handleRequest = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // POST to your backend – create a pending access request
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
      // If already requested, treat as success (idempotent UX)
      const status = error?.response?.status;
      if (status === 409) {
        setSubmitted(true); // already requested
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

  // Reset state when modal closes
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
        {submitted ? (
          // ── Success state ──
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
              <span className="font-semibold text-gray-800">1–3 business days</span>.
            </p>
            <div className="mt-1 flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
              <Clock size={16} className="text-amber-600 shrink-0" />
              <p className="font-Inter text-xs text-amber-700 font-medium text-left">
                No action needed on your end. We'll email you once access is
                approved.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-2 w-full font-Urbanist text-sm font-semibold
                         rounded-lg bg-[#703bf7] px-4 py-2.5 text-white
                         hover:opacity-90 focus:outline-none"
            >
              Got it, thanks!
            </button>
          </div>
        ) : (
          // ── Default state ──
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 grid h-11 w-11 place-items-center rounded-full bg-violet-100">
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

            <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
              <p className="font-Inter text-xs sm:text-sm font-semibold text-violet-800">
                🔒 This tier is by invitation / approval only.
              </p>
              <ul className="mt-2 space-y-1.5 pl-1 font-Inter text-xs sm:text-[13px] text-violet-700 font-medium">
                <li>✅ Free access to the investor network</li>
                <li>✅ Off-market deal discovery</li>
                <li>✅ Connect with capital partners</li>
                <li>⏳ Access granted after admin review</li>
              </ul>
            </div>

            <p className="font-Inter text-xs sm:text-sm text-gray-600 leading-5">
              Click below to submit your access request. Our team will review
              your profile and reach out within{" "}
              <span className="font-semibold">1–3 business days</span>.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 font-Urbanist text-sm font-semibold rounded-lg
                           border border-gray-300 bg-white px-4 py-2.5 text-gray-700
                           hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                disabled={loading}
                className="flex-1 font-Urbanist text-sm font-semibold rounded-lg
                           bg-[#703bf7] px-4 py-2.5 text-white hover:opacity-90
                           disabled:opacity-60 disabled:cursor-not-allowed
                           focus:outline-none"
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

// ─────────────────────────────────────────────
// Main Register Page
// ─────────────────────────────────────────────
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const ApiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Holds pending form data while modal is open
  const [pendingFormData, setPendingFormData] = useState(null);
  const [pendingGoogleData, setPendingGoogleData] = useState(null);

  // ── Guard: redirect if already logged in ──────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // User is already authenticated – send them home
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  // ─────────────────────────────────────────────────────────
  // STEP 1: Form submit → open agreement modal
  // ─────────────────────────────────────────────────────────
  const onFormSubmit = (data) => {
    setPendingFormData(data);
    setPendingGoogleData(null);
    setShowModal(true);
  };

  // ─────────────────────────────────────────────────────────
  // STEP 2a: Google button callback → open agreement modal
  // ─────────────────────────────────────────────────────────
  const onGoogleCredential = (response) => {
    const userData = decodeJwt(response.credential);
    setPendingGoogleData(userData);
    setPendingFormData(null);
    setShowModal(true);
  };

  // ─────────────────────────────────────────────────────────
  // STEP 3: User agreed → run the actual API call
  // ─────────────────────────────────────────────────────────
  const handleAgreedSubmit = async () => {
    setShowModal(false);

    if (pendingGoogleData) {
      await registerWithGoogle(pendingGoogleData);
    } else if (pendingFormData) {
      await registerWithEmail(pendingFormData);
    }
  };

  // ── Email registration ────────────────────────────────────
  const registerWithEmail = async (data) => {
    // Client-side password validation
    const passwordErrors = validatePassword(data.Password, data.ConfirmPassword);
    if (passwordErrors) {
      setError(passwordErrors.field, {
        type: "manual",
        message: passwordErrors.message,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${ApiKey}/register`,
        {
          first_name: data.FirstName,
          last_name: data.LastName,
          email: data.Email,
          phone: data.phone,
          password: data.Password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("UserEmail", response.data.user.email);
      reset();
      navigate("/verify-otp");
    } catch (error) {
      const message = error?.response?.data?.message ?? "";

      if (message.toLowerCase().includes("email")) {
        setError("Email", {
          type: "manual",
          message:
            "This email is already registered. Please sign in instead.",
        });
      } else {
        alert(message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Google registration / login ───────────────────────────
  const registerWithGoogle = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${ApiKey}/social-login`,
        {
          email: userData.email,
          first_name: userData.given_name,
          last_name: userData.family_name,
          profile_photo: userData.picture,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, subscription, user, profile_complete } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("status", subscription?.status || "inactive");
      localStorage.setItem("User", JSON.stringify(user));

      if (profile_complete) {
        localStorage.setItem("ProfileComplete", JSON.stringify(profile_complete));
        navigate("/admin");
      } else {
        navigate("/admin/account-setting");
      }
    } catch (error) {
      alert(
        error?.response?.data?.errors?.[0]?.msg ||
          error?.response?.data?.message ||
          "Google sign-in failed. Please try again."
      );
    } finally {
      setLoading(false);
      setPendingGoogleData(null);
    }
  };

  // ── Password validation helper ────────────────────────────
  const validatePassword = (password, confirmPassword) => {
    if (password.length < 8)
      return { field: "Password", message: "Password must be at least 8 characters long." };
    if (password !== confirmPassword)
      return { field: "ConfirmPassword", message: "Passwords do not match." };
    if (!/[!@#$%^&*()<>,."]/.test(password))
      return {
        field: "Password",
        message: "Password must contain at least one special character (!@#$%^&*…).",
      };
    if (!/[A-Z]/.test(password))
      return {
        field: "Password",
        message: "Password must contain at least one uppercase letter.",
      };
    return null; // all good
  };

  // ── JWT decode (Google) ───────────────────────────────────
  const decodeJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  // ── Modal close ───────────────────────────────────────────
  const handleModalClose = () => {
    setShowModal(false);
    setPendingFormData(null);
    setPendingGoogleData(null);
  };

  // ── Google button init ────────────────────────────────────
  useEffect(() => {
    const initGoogle = () => {
      if (!window.google?.accounts) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: onGoogleCredential,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large", shape: "pill" }
      );
    };

    if (window.google?.accounts) {
      initGoogle();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGoogle;
      document.body.appendChild(script);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Register for Newlista's Investor Network | Off‑Market Deals</title>
        <meta
          name="description"
          content="Create your Newlista investor account to access an investor‑only real‑estate network, off‑market commercial listings and capital partnership opportunities."
        />
        <link rel="canonical" href="https://www.newlista.com/register" />
        <meta property="og:title" content="Investor-Only Commercial Real Estate Network | Newlista" />
        <meta
          property="og:description"
          content="Newlista is an online commercial real estate investor network where investors discover off-market opportunities and connect with capital partners across the United States."
        />
        <meta property="og:url" content="https://www.newlista.com/register" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.newlista.com/bg-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Investor-Only Commercial Real Estate Network | Newlista" />
        <meta
          name="twitter:description"
          content="Newlista is an online commercial real estate investor network where investors discover off-market opportunities and connect with capital partners across the United States."
        />
        <meta name="twitter:image" content="https://www.newlista.com/bg-image.jpg" />
      </Helmet>

      <Navbar />

      <div className="md:flex">
        {/* ── Image panel ── */}
        <div className="md:w-[30%] min-[900px]:!w-[45%] lg:!w-[43%] xl:!w-[48%]">
          <img
            className="w-full object-cover h-[20vh] sm:h-[30vh] md:h-full"
            src={Image}
            alt="Newlista investor network"
          />
        </div>

        {/* ── Form panel ── */}
        <div
          className="flex flex-col justify-center gap-7 py-10
                      max-[380px]:px-6 px-8 sm:px-16
                      md:py-20 md:w-[70%]
                      lg:w-[55%] lg:px-20 lg:py-20
                      xl:py-24 xl:px-24 2xl:px-32"
        >
          {/* Heading */}
          <div>
            <h1 className="font-Poppins font-bold text-[32px] max-[380px]:text-[28px] sm:text-[35px] md:text-[38px] lg:text-[34px]">
              Join the Investor‑Only Real Estate Network
            </h1>
            <p className="font-Urbanist text-Paracolor font-semibold text-[13px] sm:text-[13.5px] lg:text-[15px] lg:pl-2">
              Sign up to list properties, connect with top investors, and explore
              off-market deals.
            </p>
          </div>

          {/* ── What you get banner ── */}
          {/* 
            This small banner sets expectations BEFORE the user types anything.
            It reduces confusion about "what is Founding Investor Access?"
          */}
          <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 flex items-start gap-3">
            <span className="text-[#703bf7] text-lg shrink-0 mt-0.5">🔒</span>
            <div>
              <p className="font-Inter text-xs sm:text-sm font-semibold text-violet-800">
                Already have an account? Please do not create a second account.
              </p>
              <p className="font-Inter text-[11px] sm:text-xs text-violet-600 mt-0.5 font-medium">
                 To access the investor network, contact us and we will help activate Founding Investor Access for your existing account.
              </p>
            </div>
          </div>

          {/* ── Registration form ── */}
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="flex flex-col gap-4"
          >
                    <div className="grid  min-[400px]:grid-cols-2 gap-5 w-[100%]">
          <span className="">
            <Inputs
              name={"FirstName"}
              register={register("FirstName", {
                required: "First name is required",
              })}
              labels={"First Name"}
              error={errors.FirstName?.message}
              placeholder={"Enter your first name"}
            ></Inputs>
          </span>
          <span className="">
            <Inputs
              name={"LastName"}
              register={register("LastName", {
                required: "Last name is required",
              })}
              labels={"Last Name"}
              error={errors.LastName?.message}
              placeholder={"Enter your last name"}
            ></Inputs>
          </span>
        </div>

            {/* Email */}
            <Inputs
              name="Email"
              register={register("Email", { required: "Email is required" })}
              labels="Email"
              placeholder="Enter your email"
              error={errors.Email?.message}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <CountrySelector
                  phone={field.value}
                  setPhone={field.onChange}
                  error={errors.phone?.message}
                />
              )}
            />

            {/* Password */}
            <span className="relative">
              <Inputs
                name="Password"
                register={register("Password", {
                  required: "Password is required",
                })}
                labels="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                error={errors.Password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 text-[#747474] top-[46px] -translate-y-1/2 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>

            {/* Confirm Password */}
            <span className="relative">
              <Inputs
                name="ConfirmPassword"
                register={register("ConfirmPassword", {
                  required: "Please confirm your password",
                })}
                labels="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                error={errors.ConfirmPassword?.message}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-4 text-[#747474] top-[46px] -translate-y-1/2 cursor-pointer"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>

            {/* Submit */}
            <div className="mt-1">
              <button
                type="submit"
                disabled={loading}
                className={`bg-PurpleColor w-full h-11 cursor-pointer mt-3 text-white
                            font-Urbanist rounded-[6px] font-bold
                            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Creating Account…" : "Create Free Account"}
              </button>

              <p className="font-Urbanist text-Paracolor font-semibold text-[13.5px] sm:text-[14.5px] lg:text-[15px] text-center mt-3">
                Already have an account?{" "}
                <Link to="/login" className="font-bold">
                  Sign in now
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="flex justify-center items-center gap-3 mt-2">
              <div className="bg-[#a5a5a5] h-0.5 w-[80px] sm:w-[90px]" />
              <p className="font-Urbanist text-Paracolor font-semibold text-[15px] sm:text-[16px] text-center whitespace-nowrap">
                or continue with
              </p>
              <div className="bg-[#a5a5a5] h-0.5 w-[80px] sm:w-[90px]" />
            </div>
          </form>

          {/* Google button */}
          <div className="flex justify-center">
            <div id="google-login-button" />
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-2 leading-5">
            <span className="font-semibold">Disclaimer:</span> Newlista is a
            networking platform for real estate investors. We do not broker deals,
            provide investment advice, or vet listings or users. All users are
            responsible for their own due diligence. Use of this platform is at
            your own risk.
          </p>
        </div>
      </div>

      {/* ── Agreement modal (unified for email + Google) ── */}
      <AgreementModal
        isOpen={showModal}
        loading={loading}
        onClose={handleModalClose}
        onConfirm={handleAgreedSubmit}
        isGoogleFlow={!!pendingGoogleData}
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

export default Register;