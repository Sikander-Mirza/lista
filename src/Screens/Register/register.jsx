import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
// COMPONENTS
import CountrySelector from "../../Components/RegisterCountrySelector/CountrySelection";
import Inputs from "../../Components/InputFields/Inputs";
// IMAGES
import Image from "../../assets/Banners/LoginPage.jpg";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm();

  const [PolicyConfirm, setPolicyComfirm] = useState(false)

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const ApiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  // STATES
  const [Loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAgreed, setModalAgreed] = useState(false);
  const [tempFormData, setTempFormData] = useState(null);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const RegisterForm = async (Data) => {
    setTempFormData(Data);
    setShowModal(true);
  };


  const GoogleLogin = async (e) => {
    const idToken = e.credential;
    const userData = decodeJwt(idToken);

    setGoogleUserData(userData);
    setIsGoogleLogin(true);
    setShowModal(true);
  };


  const submitAfterAgreement = async (Data) => {
    setShowModal(false);

    if (isGoogleLogin && googleUserData) {
      try {
        setLoading(true);
        const Response = await axios.post(
          `${ApiKey}/social-login`,
          {
            email: googleUserData.email,
            first_name: googleUserData.given_name,
            last_name: googleUserData.family_name,
            profile_photo: googleUserData.picture,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const response = Response.data;
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "status",
          response.subscription?.status || "inactive"
        );
        localStorage.setItem("User", JSON.stringify(response.user));
        if (response.profile_complete) {
          localStorage.setItem("ProfileComplete", JSON.stringify(response.profile_complete));
          navigate("/admin");
        } else {
          navigate("/admin/account-setting");
        }

      } catch (error) {
        alert(error?.response?.data?.errors?.[0]?.msg || "Google sign-in failed.");
      } finally {
        setLoading(false);
        setIsGoogleLogin(false);
        setGoogleUserData(null);
      }

      return;
    }
  
    if (Data.Password.length < 8) {
      setError("Password", {
        type: "manual",
        message: "Password must be 8 characters long",
      });
      return;
    }
    if (Data.Password !== Data.ConfirmPassword) {
      setError("ConfirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    if (!/[!@#$%^&*()<>,."]/.test(Data.Password)) {
      setError("Password", {
        type: "manual",
        message: "Password must contain any special character (!@#$%^&*_+-=?) ",
      });
      return;
    }
    if (!/[A-Z]/.test(Data.Password)) {
      setError("Password", {
        type: "manual",
        message: "Password must contain any capital letter",
      });
      return;
    }

    try {
      setLoading(true);
      const Response = await axios.post(
        `${ApiKey}/register`,
        {
          first_name: Data.FirstName,
          last_name: Data.LastName,
          email: Data.Email,
          phone: Data.phone,
          password: Data.Password,
        },
        {
          contenttype: "application/json",
        }
      );
      const UserEmail = Response.data.user.email;
      localStorage.setItem("UserEmail", UserEmail);
      navigate("/verify-otp");
      reset();
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message?.toLowerCase().includes("email")) {
        setError("Email", {
          type: "manual",
          message: "Email already exists",
        });
      } else {
        alert(message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }

    setErrorMessage("");
  };


  // DECODE JWT CODE
  // BCZ GOOGLE DOES NOT PROVIDE DIRECT DATA
  function decodeJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  }


  // GOOGLE LOGIN
  const GooglesubmitAfterAgreement = async (e) => {
    const idToken = e.credential;
    const userData = decodeJwt(idToken);
    try {
      setLoading(true);
      const Response = await axios.post(
        `${ApiKey}/social-login`,
        {
          email: userData.email,
          first_name: userData.given_name,
          last_name: userData.family_name,
          profile_photo: userData.picture,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = Response.data;
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "status",
        response.subscription?.status || "inactive"
      );
      localStorage.setItem("User", JSON.stringify(Response.data.user));
      if (Response.data.profile_complete) {
        localStorage.setItem(
          "ProfileComplete",
          JSON.stringify(Response.data.profile_complete)
        );
        navigate("/admin");
      } else {
        navigate("/admin/account-setting");
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.errors[0].msg);
    } finally {
      setLoading(false);
    }
  };



  // CHECK GOOGLE API AND RENDER BUTTON
  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: GoogleLogin,
          });

          window.google.accounts.id.renderButton(
            document.getElementById("google-login-button"),
            {
              theme: "outline",
              size: "large",
              shape: "pill",
            }
          );
        }
      };
      document.body.appendChild(script);
    };

    // Check if script already loaded
    if (!window.google || !window.google.accounts) {
      loadGoogleScript();
    } else {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: GoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        {
          theme: "outline",
          size: "large",
          shape: "pill",
        }
      );
    }
  }, []);


  return (
    <>
 <Helmet>
        <title>Register for Newlista’s Investor Network | Off‑Market Deals</title>
        <meta
          name="description"
          content="Create your Newlista investor account to access an investor‑only real‑estate network, off‑market commercial listings and capital partnership opportunities."
        />
        <link rel="canonical" href="https://www.newlista.com/register" />
      </Helmet>

    <Navbar></Navbar>
      <div className=" md:flex ">
        {/* IMAGE SECTION  */}
        <div className="md:w-[30%] min-[900px]:!w-[45%] lg:!w-[43%] xl:!w-[48%]">
          <img
            className="w-[100%] object-cover h-[20vh] sm:h-[30vh] md:h-full"
            src={Image}
            alt="Newlista"
          />
        </div>

        {/* LOGIN FOR SECTION  */}
        <div className="flex flex-col justify-center gap-7 py-10 max-[380px]:px-6 px-8 sm:px-16 md:py-20 md:w-[70%] lg:w-[55%] lg:px-20 lg:py-20 xl:py-24 xl:px-24  2xl:px-32">
          {/* Heading Info  */}
          <div>
            <h1 className="font-Poppins font-[700] text-[32px] max-[380px]:text-[28px] sm:text-[35px] md:text-[38px] lg:text-[34px]">
              Join the Investor‑Only Real Estate Network
            </h1>
            <p className="font-Urbanist text-Paracolor font-[600] max-[380px]:text-[12px] text-[13px] sm:text-[13.5px] lg:text-[15px] lg:pl-2">
              Sign up to list properties, connect with top investors, and
              explore off-market deals.
            </p>
          </div>

          {/* Important Notice for Investors */}

          <form
            onSubmit={handleSubmit(RegisterForm)}
            className="flex flex-col gap-4"
          >
            {/* Name  */}
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

            {/* Email  */}
            <div className="flex flex-col gap-4">
              <span className="">
                <Inputs
                  name={"Email"}
                  register={register("Email", {
                    required: "Email is required",
                  })}
                  labels={"Email"}
                  placeholder={"Enter your email"}
                  error={errors.Email?.message}
                ></Inputs>
              </span>

              {/* Phone Number*/}
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
              {/* PASSOWRD  */}
              <span className="relative">
                <Inputs
                  name={"Password"}
                  register={register("Password", {
                    required: "Password is required",
                  })}
                  labels={"Password"}
                  type={showPassword ? "text" : "password"}
                  placeholder={"Create a strong password"}
                  error={errors.Password?.message}
                ></Inputs>
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-6 text-[#747474] top-[50px] transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
              {/* CONFIRM PASSWORD  */}
              <span className="relative">
                <Inputs
                  name={"ConfirmPassword"}
                  register={register("ConfirmPassword", {
                    required: "Please confirm your password",
                  })}
                  labels={"ConfirmPassword"}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={"Re-enter your password"}
                  error={errors.ConfirmPassword?.message}
                ></Inputs>
                <button
                  type="button"
                  onClick={() => {
                    setshowConfirmPassword((prev) => !prev);
                  }}
                  className="absolute right-6 text-[#747474] top-[50px] transform -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </span>
            </div>
            {/* Sign Up Button */}
            <div className="mt-1">
              <button
                type="submit"
                disabled={Loading}
                className={`bg-PurpleColor w-full h-11 cursor-pointer mt-3 text-white font-Urbanist rounded-[6px] font-[700] ${Loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {Loading ? "Signing Up..." : "Sign Up"}
              </button>
              <p className="font-Urbanist text-Paracolor font-[600] max-[380px]:text-[12.5px] text-[13.5px] sm:text-[14.5px] lg:text-[15px] text-center mt-3">
                Already have an account?{" "}
                <Link to={"/login"} className="font-bold">
                  Sign in now
                </Link>
              </p>
            </div>

            {/* Other Info */}
            <div className="flex justify-center items-center gap-3 mt-2">
              <div className="bg-[#a5a5a5] h-0.5 max-[380px]:w-[70px]  w-[80px] sm:w-[90px]"></div>
              <p className="font-Urbanist text-Paracolor font-[600] max-[380px]:text-[13px] text-[15px] sm:text-[16px] text-center">
                or continue with{" "}
              </p>
              <div className="bg-[#a5a5a5] h-0.5 max-[380px]:w-[70px] w-[80px] sm:w-[90px]"></div>
            </div>
          </form>
          <div className="flex justify-center gap-2">
            <div id="google-login-button"></div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Disclaimer: Newlista is a networking platform for real estate
            investors. We do not broker deals, provide investment advice, or vet
            listings or users. All users are responsible for their own due
            diligence. Use of this platform is at your own risk.
          </p>
        </div>
      </div>

      {/* Agreement Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm max-[400px]:p-0 sm:p-4 p-8 rounded-"
          onClick={() => {
            setShowModal(false);
            setGoogleUserData(null);
            setModalAgreed(false);
          }}
        >
          {/* Panel */}
          <div
            className={`
        relative w-full max-w-full sm:w-[92%] sm:max-w-lg md:max-w-2xl lg:max-w-lg xl:max-w-2xl min-[1780px]:!max-w-3xl
        bg-white shadow-2xl ring-1 ring-black/5
        animate-[pop_180ms_cubic-bezier(0.2,0.7,0.3,1)_both]
        h-[90dvh] sm:h-auto sm:max-h-[90vh] 2xl:max-h-[300vh]
        rounded-2xl
        flex flex-col
      `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="
        sticky top-0 z-10
       bg-[#703bf7]
        text-white px-4 py-4 sm:px-6 sm:py-5 min-[1780px]:!py-7
        rounded-t-2xl
      ">
              <div className="flex items-start gap-3">
                <div className=" shrink-0 grid h-12 w-12 place-items-center rounded-full bg-white/20">
                  {/* Shield/Alert icon */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="12" cy="15.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 id="agreement-title" className="font-Urbanist max-[400px]:text-[22px] text-[19.5px] leading-[26px] sm:text-2xl min-[1780px]:!text-3xl min-[1780px]:!leading-[40px] font-semibold sm:leading-7 2">
                    Important Notice for Investorss
                  </h2>
                  <p className="font-Urbanist mt-0.5 text-xs min-[1780px]:!text-[17px] sm:text-sm/5 text-white/80">
                    Please review and accept the terms below to continue.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 overflow-y-auto
                      max-h-[calc(100dvh-160px)] sm:max-h-none">
              <div
                id="agreement-desc"
                className="rounded-xl border border-red-500 bg-red-50/70 p-4"
              >
                <p className="font-Inter text-[13px] min-[1780px]:!text-[18px] font-[500] sm:text-[15px] text-red-700">
                  <span className="font-semibold">Newlista</span> is exclusively for bona fide real-estate investors.
                </p>
                <ul className="mt-3 list-disc font-[500] min-[1780px]:!text-[18px] space-y-1.5 pl-5 font-Inter text-[12.5px] sm:text-[14px] text-red-700/90">
                  <li>No soliciting, wholesaling, or marketing to other users.</li>
                  <li>We do not facilitate syndications.</li>
                  <li>Investors must comply with all SEC rules and regulations.</li>
                  <li>Misuse of the platform may result in suspension or a ban without refund.</li>
                  <li>By signing up, you agree to these terms.</li>
                </ul>
              </div>

              {/* Checkbox */}
              <label className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={modalAgreed}
                  onChange={(e) => setModalAgreed(e.target.checked)}
                  className="
              mt-0.5 w-4 h-4 sm:h-5 sm:w-5 shrink-0 cursor-pointer 
             
            "
                  aria-describedby="agreement-desc"
                />
                <span className="font-Inter text-[12.5px] min-[1780px]:!text-[18px] sm:text-[14px] font-[500] text-black">
                  I have read and agree to the Important Notice above, as well as the{" "}
                  <Link to="/terms-of-use" className="text-PurpleColor underline underline-offset-2 hover:opacity-90">
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-PurpleColor underline underline-offset-2 hover:opacity-90">
                    Privacy Policy
                  </Link>.
                </span>
              </label>
            </div>

            {/* Footer actions (sticky) */}
            <div className=" bottom-0 sm:mt-2 flex items-center justify-end gap-3
                      border-t border-[#e1dede] bg-slate-50/70 px-4 sm:px-6 py-3 sm:py-4
                      rounded-b-2xl">
              <button
                onClick={() => {
                  setShowModal(false);
                  setGoogleUserData(null);
                  setModalAgreed(false);
                }}
                className="
            font-Urbanist text-[13px] sm:text-[14px] min-[1780px]:!text-[18px] font-semibold
            inline-flex items-center justify-center rounded-lg border border-slate-300
            bg-white px-4 py-2.5 text-slate-700 hover:bg-slate-50
            focus:outline-none focus:ring-2 focus:ring-slate-200
          "
              >
                Cancel
              </button>

              <button
                disabled={!modalAgreed || Loading}
                onClick={() => submitAfterAgreement(tempFormData)}
                className="
            font-Urbanist text-[13px] min-[1780px]:!text-[18px] sm:text-[14px] font-semibold
            inline-flex items-center justify-center rounded-lg
             bg-[#703bf7] px-4 py-2.5 text-white
            hover:opacity-95
            disabled:cursor-not-allowed disabled:opacity-60
            focus:outline-none focus:ring-2 focus:ring-violet-300
          "
              >
                {Loading ? "Processing..." : "Agree & Continue"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
  @keyframes pop {
    0% { opacity: 0; transform: scale(.98) translateY(6px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
`}</style>



    </>
  );
};

export default Register;