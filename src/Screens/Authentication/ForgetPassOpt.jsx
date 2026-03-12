import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// IMAGES
import Image from "../../assets/Banners/OptVerificationImage.jpg";
import ListingRightArrow from "../../assets/Icons/ListingRightSideArrow.png";
import OtpInput from "../../Components/OtpSender/OtpSender";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AuthScreenLayout from "../../Components/Authentication/AuthScreenLayout";

const ForgetPassOtp = () => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const [Loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [loading, setloading] = useState(false);
  const [OtpSendMess, setOtpSendMess] = useState("");
  const storedEmail = localStorage.getItem("ForgetUser");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm();

  const ResendCode = async () => {
    setloading(true);
    setErrorMessage("");
    try {
      const Response = await axios.post(
        `${ApiKey}/api/forgot-password`,
        {
          email: storedEmail,
        }
      );
      localStorage.setItem("email", storedEmail);
      setOtpSendMess("Otp Send SuccessFully");
      setloading(false);
    } catch (error) {
      setloading(false);
      const ErrorMessa = error.response.data.message;
      setErrorMessage(ErrorMessa);
    }
  };

  const VerifyOtp = async (data) => {
    if (!storedEmail) {
      setErrorMessage("Email not found. Please try again from the start.");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(`${ApiKey}/verify-reset-otp`, {
        otp: data.otp,
        email: storedEmail,
      });
      navigate("/set-new-password")
      //   if (response.data.profile_complete) {
      //     navigate("/admin");
      //     reset();
      //   } else {
      //     localStorage.setItem("token", response.data.token);
      //     localStorage.setItem("User", JSON.stringify(response.data.user));
      //     localStorage.setItem(
      //       "ProfileComplete",
      //       JSON.stringify(response.data.profile_complete)
      //     );
      //     navigate("/admin/account-setting");
      //   }
      reset();
    } catch (error) {
      setLoading(false);
      const msg =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      if (msg.toLowerCase().includes("otp")) {
        setError("otp", { type: "manual", message: msg });
      } else {
        setErrorMessage(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <AuthScreenLayout
        BannerImage={Image}
        Heading={"Verify code"}
        Description={"An authentication code has been sent to your email."}
        BackLogin={true}
      >


        <form
          onSubmit={handleSubmit(VerifyOtp)}
          className="flex flex-col gap-4"
        >
          {/* Name  */}
          <div>

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
            {OtpSendMess && (
              <p className="font-Poppins mb-2 font-[500] border-green-500 text-green-500  text-[13px]">
                {OtpSendMess}
              </p>
            )}
            {errors.otp && (
              <p className="text-red-500 font-[500] text-[13.5px] pt-1  font-Urbanist tracking-wide">
                {errors.otp.message}
              </p>
            )}

            {ErrorMessage && (
              <p className="font-Poppins mt-2 font-[500] border-red-500 text-red-600  text-[13px]">
                {ErrorMessage}
              </p>
            )}
            <p onClick={ResendCode} className="font-Urbanist text-Paracolor mt-3 font-[700] text-[12.5px] min-[410px]:text-[14px]">
              Didn’t receive a code?{" "}
              <Link className="text-[#FF8682]">Resend</Link>
            </p>
          </div>
          {/* Sign Up Button */}
          <div className="mt-1">
            <button
              type="submit"
              disabled={Loading}
              className={`bg-PurpleColor w-[100%] 2xl:w-[80%] h-11 cursor-pointer mt-3 text-white font-Urbanist rounded-[6px] font-[700]  ${Loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {Loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>


      </AuthScreenLayout>
      <div className="min-h-screen md:flex ">
        {/* IMAGE SECTION  */}
        <div className="md:w-[40%] min-[900px]:!w-[48%] lg:!w-[43%] xl:!w-[42%] 2xl:!w-[48%]">
          <img
            className="w-[100%] object-cover h-[20vh] sm:h-[30vh] md:h-full"
            src={Image}
            alt=""
          />
        </div>

        {/* LOGIN FOR SECTION  */}
        <div className="flex flex-col justify-center gap-7 py-20 max-[380px]:px-6 px-8 sm:px-16 md:py-20 md:w-[50%] lg:w-[55%] lg:px-20 lg:py-20 xl:py-24 xl:px-28  2xl:px-32">
          {/* Heading Info  */}
          <div>
            <p className="font-Urbanist  text-Paracolor font-[700] text-[15px] 2xl:text-[16px]">
              <Link to={"/login"} className="flex items-center gap-1.5">
                <img className="h-3 w-2" src={ListingRightArrow} alt="" /> Back
                to login
              </Link>
            </p>
            <h1 className="font-Poppins font-[700] text-[32px] max-[380px]:text-[28px] sm:text-[35px] md:text-[38px] lg:text-[44px] 2xl:text-[48px]">
              Verify code
            </h1>
            <p className="font-Urbanist text-Paracolor font-[600] max-[380px]:text-[12px] text-[13px] sm:text-[13.5px] lg:text-[15px] 2xl:text-[17px] lg:pl-2">
              An authentication code has been sent to your email.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default ForgetPassOtp;
