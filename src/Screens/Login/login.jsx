import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// COMPONENTS
import Inputs from "../../Components/InputFields/Inputs";
// IMAGES
import Image from "../../assets/Banners/RegisterPage.jpg";
import { Eye, EyeOff } from "lucide-react";
import AuthScreenLayout from "../../Components/Authentication/AuthScreenLayout";
import Navbar from "../../Components/Navbar/Navbar";
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const ApiKey = import.meta.env.VITE_API_KEY;

  const [Loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Modal state for Google login
  const [showModal, setShowModal] = useState(false);
  const [modalAgreed, setModalAgreed] = useState(false);
  const [googleUserData, setGoogleUserData] = useState(null);

  const from = location.state?.from || '/';



  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm();

  // Decode JWT from Google
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

  // GOOGLE LOGIN CALLBACK
  const GoogleLogin = async (e) => {
    const idToken = e?.credential;
    if (!idToken) return;
    const userData = decodeJwt(idToken);

    // Show modal before submitting Google login
    setGoogleUserData(userData);
    setShowModal(true);
  };

  // REGULAR LOGIN FORM SUBMIT
  const LoginForm = async (Data) => {
    try {
      setLoading(true);
      const Response = await axios.post(`${ApiKey}/login`, {
        email: Data.Email,
        password: Data.Password,
      });

      const response = Response.data;
      localStorage.setItem("token", response.token);
      localStorage.setItem("status", response.subscription?.status || "inactive");
      localStorage.setItem("User", JSON.stringify(response.user));


      if (response.profile_complete) {
        localStorage.setItem("ProfileComplete", JSON.stringify(response.profile_complete));
        navigate("/admin" );
      } else {
        navigate("/admin/account-setting");
      }
      reset();
    } catch (error) {
      setError("Password", {
        type: "manual",
        message: "Invalid Email or Password",
      });
    } finally {
      setLoading(false);
    }
  };

  // SUBMIT GOOGLE LOGIN AFTER AGREEMENT
  const submitGoogleLogin = async () => {
    if (!googleUserData) return;
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
        { headers: { "Content-Type": "application/json" } }
      );

      const response = Response.data;
      localStorage.setItem("token", response.token);
      localStorage.setItem("status", response.subscription?.status || "inactive");
      localStorage.setItem("User", JSON.stringify(response.user));

      if (response.profile_complete) {
        localStorage.setItem("ProfileComplete", JSON.stringify(response.profile_complete));
         navigate('/admin')
      } else {
        navigate("/admin/account-setting");
      }
    } catch (error) {
      setError("Password", {
        type: "manual",
        message: error.response?.data?.message || "Google login failed",
      });
    } finally {
      setLoading(false);
      setShowModal(false);
      setGoogleUserData(null);
      setModalAgreed(false);
    }
  };

  // Load Google script
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
            { theme: "outline", size: "large", shape: "pill" }
          );
        }
      };
      document.body.appendChild(script);
    };

    if (!window.google || !window.google.accounts) loadGoogleScript();
    else {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: GoogleLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large", shape: "pill" }
      );
    }
  }, []);



  return (
    <>
     <Helmet>
        <title>Newlista Login | Investor Network Access to Off‑Market Deals</title>
        <meta
          name="description"
          content="Sign in to Newlista to connect with other investors, review off‑market commercial listings and manage capital partnerships on our investor‑only network."
        />
        <link rel="canonical" href="https://www.newlista.com/login" />

         <meta
          property="og:title"
          content="Investor-Only Commercial Real Estate Network | Newlista"
        />
        <meta
          property="og:description"
          content="Newlista is an online commercial real estate investor network where investors discover off-market opportunities and connect with capital partners across the United States."
        />
        <meta property="og:url" content="https://www.newlista.com/login" />
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

    <Navbar></Navbar>
      <AuthScreenLayout
        BannerImage={Image}
        Heading={"Investor Login – Access Off‑Market Real Estate Deals"}
        Description={"Log in to access exclusive real estate listings, connect with investors, and explore off-market deals."}
        SocialLogin={true}
      >
        <form
          onSubmit={handleSubmit(LoginForm)}
          className="flex flex-col gap-4"
        >
          {/* Email  */}
          <div className="flex flex-col gap-4">
            <span className="">
              <Inputs
                name={"Email"}
                register={register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email address",
                  },
                })}
                labels={"Email"}
                placeholder={"Enter your registered email"}
                error={errors.Email?.message}
              ></Inputs>
            </span>
            {/* PASSOWRD  */}
            <span className="relative">
              <Inputs
                name={"Password"}
                register={register("Password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                labels={"Password"}
                type={showPassword ? "text" : "password"}
                placeholder={"Enter your password"}
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
            <span>
              <p className="font-Urbanist text-Paracolor font-[600] text-[14px] text-end">
                <Link to={"/reset-password"}>Forgot Password?</Link>
              </p>
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
              {Loading ? "Logging in..." : "Log In"}
            </button>
            <p className="font-Urbanist text-Paracolor font-[600] max-[380px]:text-[12.5px] text-[13.5px] sm:text-[14.5px] lg:text-[15px] text-center mt-3">
              Don't have an account?{" "}
              <Link to={"/register"} className="font-bold">
                Sign Up now
              </Link>
            </p>
          </div>
        </form>
      </AuthScreenLayout>


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
                onClick={submitGoogleLogin}
                disabled={!modalAgreed || Loading}
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

export default Login;
