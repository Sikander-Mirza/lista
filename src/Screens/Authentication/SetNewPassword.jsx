import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

// COMPONENTS
import Inputs from "../../Components/InputFields/Inputs";
import Spinner from "../../Components/Spinner/Spinner";
import PasswordChangeSuccesFully from "../../Components/PasswordChangeSuccesFully/PasswordChangeSuccesFully";

// IMAGE
import Image from "../../assets/Banners/SetNewPassword.jpg";
import { Eye, EyeOff } from "lucide-react";
import AuthScreenLayout from "../../Components/Authentication/AuthScreenLayout";

const SetNewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const email = localStorage.getItem("ForgetUser");
  const [showPassword, setShowPassword] = useState(false);
  const ApiKey = import.meta.env.VITE_API_KEY;
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();

  const SetNewPassword = async (data) => {





    setLoading(true);
    clearErrors(); // clear old errors

    // Front-end validations
    if (data.NewPassword.length < 8 || data.ReEnterNewPassword.length < 8) {
      setError("NewPassword", {
        message: "Password must be at least 8 characters long",
      });
      setLoading(false);
      return;
    }

    if (!/[!@#$%^&*()<>,."]/.test(data.NewPassword)) {
      setError("NewPassword", {
        message: "Password must contain a special character (!@#$%^&*_+-=?)",
      });
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(data.NewPassword)) {
      setError("NewPassword", {
        message: "Password must include at least one capital letter",
      });
      setLoading(false);
      return;
    }

    if (data.NewPassword !== data.ReEnterNewPassword) {
      setError("ReEnterNewPassword", {
        message: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    // API Call
    try {
      const response = await axios.post(
        `${ApiKey}/reset-password`,
        {
          email,
          password: data.NewPassword,
        }
      );


      if (response.data.message === "Password reset successful") {
        localStorage.removeItem("ForgetUser");
        setShowSuccess(true);
        reset();
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      setError("NewPassword", { message: errorMsg });


      

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isSuccess = localStorage.getItem("passwordResetSuccess") === "true";
    if (isSuccess) setShowSuccess(true);
  }, []);

  return (
    <>
      {!showSuccess ? (
        <>
          <AuthScreenLayout
            BannerImage={Image}
            Heading={"Set a password"}
            Description={"Your previous password has been reset. Please set a new password."}
            Style={true}
          >
            <form
              onSubmit={handleSubmit(SetNewPassword)}
              className="flex flex-col gap-5"
            >
              <span className="relative">
                <Inputs
                  name={"NewPassword"}
                  register={register("NewPassword", {
                    required: "New password is required",
                  })}
                  labels={"Create New Password"}
                  type={showPassword ? "text" : "password"}
                  placeholder={"Enter new password"}
                  error={errors.NewPassword?.message}
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

              <span className="relative">
                <Inputs
                  name={"ReEnterNewPassword"}
                  register={register("ReEnterNewPassword", {
                    required: "Please re-enter your password",
                  })}
                  labels={"Re-enter New Password"}
                  type={showPassword ? "text" : "password"}
                  placeholder={"Enter new password"}
                  error={errors.ReEnterNewPassword?.message}
                ></Inputs>
                <button
                  type="button"
                  onClick={() => {
                    setshowConfirmPassword((prev) => !prev);
                  }}
                  className="absolute right-6 text-[#747474] top-[50px] transform -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>


              <button
                type="submit"
                className="bg-PurpleColor font-bold text-white h-11 w-full rounded-[6px] font-Urbanist"
              >
                {loading ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  "Save new password"
                )}
              </button>
            </form>
          </AuthScreenLayout>
        </>
      ) : (
        <div className="transition-opacity duration-700 ease-in-out">
          <PasswordChangeSuccesFully />
        </div>
      )}
    </>
  );
};

export default SetNewPassword;
