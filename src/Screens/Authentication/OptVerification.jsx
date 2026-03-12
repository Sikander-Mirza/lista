import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Image from "../../assets/Banners/OptVerificationImage.jpg";
import OtpInput from "../../Components/OtpSender/OtpSender";
import Spinner from "../../Components/Spinner/Spinner";

const OptVerification = () => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const [Loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [otpSendMsg, setOtpSendMsg] = useState("");
  const storedEmail = localStorage.getItem("UserEmail");
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm();

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
        err?.response?.data?.message || "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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

      localStorage.removeItem("UserEmail");

      if (res.data.profile_complete) {
        navigate("/admin");
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        localStorage.setItem("ProfileComplete", JSON.stringify(res.data.profile_complete));
        navigate("/admin/account-setting");
      }

      reset();
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong.";

      if (msg.toLowerCase().includes("otp")) {
        setError("otp", { type: "manual", message: msg });
      } else {
        setGeneralError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:flex">
      {/* IMAGE SECTION */}
      <div className="md:w-[40%] min-[900px]:w-[48%] lg:w-[43%] xl:w-[42%] 2xl:w-[48%]">
        <img
          src={Image}
          alt="OTP Verification"
          className="w-full object-cover h-[20vh] sm:h-[30vh] md:h-full"
        />
      </div>

      {/* OTP VERIFICATION SECTION */}
      <div className="flex flex-col justify-center gap-7 px-8 sm:px-16 lg:px-20 xl:px-28 2xl:px-32 py-20 md:w-[50%] lg:w-[55%]">
        <div>
          <h1 className="font-Poppins font-bold text-[32px] sm:text-[38px] lg:text-[44px] 2xl:text-[48px]">
            Verify code
          </h1>
          <p className="font-Urbanist text-Paracolor font-semibold text-[13px] sm:text-[14px] lg:text-[15px]">
            An authentication code has been sent to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit(verifyOtp)} className="flex flex-col gap-4">
         

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
           {otpSendMsg && (
            <p className="text-green-600 text-[13px] font-Poppins">{otpSendMsg}</p>
          )}
          {errors.otp && (
            <p className="text-red-600 text-[13.5px] font-Urbanist pt-1">
              {errors.otp.message}
            </p>
          )}
          {generalError && (
            <p className="text-red-600 font-Poppins text-[13px]">{generalError}</p>
          )}

          <p className="font-Urbanist text-[13px]">
            Didn’t receive a code?{" "}
            <button
              type="button"
              onClick={resendOtp}
              disabled={Loading}
              className="text-[#FF8682] font-bold hover:underline cursor-pointer"
            >
              Resend
            </button>
          </p>

          <button
            type="submit"
            disabled={Loading}
            className={`bg-PurpleColor h-11 w-full 2xl:w-[80%] text-white rounded-[6px] font-Urbanist font-bold mt-3 cursor-pointer ${
              Loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {Loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OptVerification;
