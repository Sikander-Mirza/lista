import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// COMPONENTS
import Inputs from "../../Components/InputFields/Inputs";
import Spinner from "../../Components/Spinner/Spinner";
import PasswordChangeSuccesFully from "../../Components/PasswordChangeSuccesFully/PasswordChangeSuccesFully";

// IMAGE
import Image from "../../assets/Banners/SetNewPassword.jpg";
import { Eye, EyeOff } from "lucide-react";
import AlertModal from "../../Components/AlertModal/AlertModal";
import AuthScreenLayout from "../../Components/Authentication/AuthScreenLayout";

const ChangePassword = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const ApiKey = import.meta.env.VITE_API_KEY;

  const [loading, setLoading] = useState(false);
  const [Error, setErrors] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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

    // // Front-end validations
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




    try {
      const response = await axios.post(
        `${ApiKey}/update-password`,
        {
          current_password: data.oldPassword,
          new_password: data.NewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      AlertModal({
        icon: "success",
        title: "Password Updated Successfully",
        iconColor: "#703BF7",
        text: "Your password has been changed. Please use your new password the next time you log in.",
      });
      navigate('/admin/account-setting')
    } catch (error) {
      const errorMsg =
        error.response.data.message === "Current password is incorrect." && error.response.data.message;
      const ErrorMsg =
        error.response.data.message ===
        "The new password field and current password must be different." &&
        error.response.data.message;
      setError("NewPassword", { message: ErrorMsg });
      setError("oldPassword", { message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!showSuccess ? (

        <AuthScreenLayout
          BannerImage={Image}
          Heading={"Set New password"}
          Description={"Make sure your new password is strong and unique to help keep your account secure."}
          Style={true}
        >
          <form
            onSubmit={handleSubmit(SetNewPassword)}
            className="flex flex-col gap-5"
          >
            <span className="relative">
              <Inputs
                name="oldPassword"
                register={register("oldPassword", {
                  required: "Current Password is required",
                })}
                labels="Current Password"
                placeholder="Enter Current password"
                type={showOldPassword ? "text" : "password"}
                error={errors.oldPassword?.message}
              />
              <button
                type="button"
                onClick={() => {
                  setShowOldPassword((prev) => !prev);
                }}
                className="absolute right-6 text-[#747474] top-[50px] transform -translate-y-1/2 cursor-pointer"
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
            <span className="relative">
              <Inputs
                name="NewPassword"
                register={register("NewPassword", {
                  required: "New password is required",
                })}
                labels="Create New Password"
                placeholder="Enter new password"
                type={showNewPassword ? "text" : "password"}
                error={errors.NewPassword?.message}
              />
              <button
                type="button"
                onClick={() => {
                  setShowNewPassword((prev) => !prev);
                }}
                className="absolute right-6 text-[#747474] top-[50px] transform -translate-y-1/2 cursor-pointer"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>

            <span className="relative">
              <Inputs
                name="ReEnterNewPassword"
                register={register("ReEnterNewPassword", {
                  required: "Please re-enter your password",
                })}
                labels="Re-enter New Password"
                placeholder="Re-enter new password"
                type={showConfirmPassword ? "text" : "password"}
                error={errors.ReEnterNewPassword?.message}
              />
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


            <button
              type="submit"
              className="bg-PurpleColor font-bold text-white h-11 w-full text-[14.5px] sm:text-[16px] rounded-[6px] font-Urbanist cursor-pointer hover-btn hover-btn-purple"
            >
              <span>{loading ? "Saving..." : "Save New Password"}</span>
            </button>
          </form>
        </AuthScreenLayout>

      ) : (
        <div className="transition-opacity duration-700 ease-in-out">
          <PasswordChangeSuccesFully />
        </div>
      )}
    </>
  );
};

export default ChangePassword;
