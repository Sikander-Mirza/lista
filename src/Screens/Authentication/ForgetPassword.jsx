import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/Banners/ForgetPasswordImage.jpg";
import Spinner from "../../Components/Spinner/Spinner";
import Inputs from "../../Components/InputFields/Inputs";
import AuthScreenLayout from "../../Components/Authentication/AuthScreenLayout";



const ForgetPassword = () => {

  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_API_KEY;
  const [loading, setloading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const ForgetPass = async (data) => {
    setloading(true);
    try {
      const Response = await axios.post(
        `${ApiKey}/forgot-password`,
        {
          email: data.EmailID,
        }
      );
      localStorage.setItem("ForgetUser", data.EmailID);
      setloading(false);
      navigate("/forget-otp");

    } catch (error) {
      setloading(false);
      const ErrorMessa = error.response.data.message;
      setErrorMessage(ErrorMessa);
    }
  };



  return (
    <>
      <AuthScreenLayout
        BannerImage={Image}
        Heading={"Forgot your password?"}
        Description={"Don’t worry, happens to all of us. Enter your email below to recover your password"}
        Style={true}
        BackLogin={true}
      >
        <form
          onSubmit={handleSubmit(ForgetPass)}
          className="flex flex-col gap-8"
        >
          <div>
            <Inputs
              name={"EmailID"}
              register={register("EmailID", {
                required: "Email is required",
              })}
              labels={"Register Email"}
              placeholder={"Enter your registered email"}
              type={"email"}
              require={"true"}
              error={errors.EmailID?.message}
            ></Inputs>
            {ErrorMessage && (
              <p className="text-red-500 font-[500] text-[14px] pt-1 font-Urbanist tracking-wide">
                {typeof ErrorMessage === "string" ? ErrorMessage : ErrorMessage}
              </p>
            )}

          </div>

          <div>
            <button
              type="submit"
              className="bg-PurpleColor text-[14.5px] md:text-[16px] cursor-pointer font-[700] w-[100%] h-11 text-white font-Urbanist rounded-[6px]"
            >
              {loading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                "Send Otp"
              )}
            </button>
          </div>
        </form>
      </AuthScreenLayout>

      {/* <div className="flex">
        <div className="w-[44%] min-h-screen ">
          <img className="h-[100%]" src={Image} alt="" />
        </div>

        <div className="w-[55%] px-32 flex flex-col justify-center gap-7 ">
          <div>
            <div>
              
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-Poppins font-[700] text-[40px]">
                Forgot your password?
              </h1>
              <p className="font-Urbanist text-Paracolor font-[600] text-[14px]">
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(ForgetPass)}
            className="flex flex-col gap-8"
          >
            <div>
              <Inputs
                name={"EmailID"}
                register={register("EmailID", {
                  required: "Email is required",
                })}
                labels={"Register Email"}
                placeholder={"Enter your registered email"}
                type={"email"}
                require={"true"}
                error={errors.EmailID?.message}
              ></Inputs>
            </div>

            <div>
              <button
                type="submit"
                className="bg-PurpleColor cursor-pointer font-[700] w-[100%] h-11 text-white font-Urbanist rounded-[6px]"
              >
                {loading ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  "Send Otp"
                )}
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default ForgetPassword;
