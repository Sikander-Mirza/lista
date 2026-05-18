import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
// COMPONENTS
import CountrySelector from "../../Components/RegisterCountrySelector/CountrySelection";
import Inputs from "../../Components/InputFields/Inputs";
// IMAGES
import Image from "../../assets/Banners/LoginPage.jpg";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import AuthScreenLayout from "../../Components/Authentication/AuthScreenLayout";
import ShowPassIcon from "../../Components/Authentication/ShowPassIcon";
import AgreementModal from "../../Components/Modals/AgreementModal";

const RegisterCopy = () => {
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
  // Modal visibility state
  const [showModal, setShowModal] = useState(false);
  // State to track if user agreed in modal
  const [modalAgreed, setModalAgreed] = useState(false);

  // Store form data temporarily until modal agreement
  const [tempFormData, setTempFormData] = useState(null);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const RegisterForm = async (Data) => {
    // Instead of submitting directly, show modal first
    setTempFormData(Data);
    setShowModal(true);
  };


  const GoogleLogin = async (e) => {
    const idToken = e.credential;
    const userData = decodeJwt(idToken);

    // Store data and show modal
    setGoogleUserData(userData);
    setIsGoogleLogin(true); // Indicate this is a Google login
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

    // ... EXISTING normal form registration (for non-Google users)
    // This is your current submitAfterAgreement logic
    // Just keep it here as it is
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
      <AuthScreenLayout
       BannerImage={Image}
       Heading={"Join Newlista"}
       Description={"Sign up to list properties, connect with top investors, and explore off-market deals."}
       Disclaimer={true}
       SocialLogin={true}
       >
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
              <ShowPassIcon ShowPass={showPassword} SetShowPass={setShowPassword}></ShowPassIcon>
             
            </span>
            {/* CONFIRM PASSWORD  */}
            <span className="relative">
              <Inputs
                name={"Confirm Password"}
                register={register("ConfirmPassword", {
                  required: "Confirm password is Required",
                })}
                labels={"Confirm Password"}
                type={showConfirmPassword ? "text" : "password"}
                placeholder={"Re-enter your password"}
                error={errors.ConfirmPassword?.message}
              ></Inputs>
              <ShowPassIcon ShowPass={showConfirmPassword} SetShowPass={setshowConfirmPassword}></ShowPassIcon>
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
          
        </form>
      </AuthScreenLayout>


      {/* Modal Section */}
      {showModal && (

      <InvestorNoticeModal
          setShowModal={setShowModal}
          setGoogleUserData={setGoogleUserData}
          setModalAgreed={setModalAgreed}
          modalAgreed={modalAgreed}
          Loading={Loading}
          submitAfterAgreement={submitAfterAgreement}
          tempFormData={tempFormData}
        />
      )}
    </>
  );
};

export default RegisterCopy;