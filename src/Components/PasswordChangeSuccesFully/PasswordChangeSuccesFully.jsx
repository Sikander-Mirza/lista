import React from "react";
import PasswordChangeIllustration from "../../assets/Illustration/PasswordChangeIllustration.png";
import { Link } from "react-router-dom";

const PasswordChangeSuccesFully = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex items-center justify-center -mt-10">
          <img className="h-[70%] w-[70%]" src={PasswordChangeIllustration} alt="Newlista" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-Poppins font-[700] text-[50px]">
            Password changed!
          </h1>
          <p className="font-Urbanist text-Paracolor font-[500] text-[18px]">
           You’ve Successfully Completed Your Password Reset
          </p>
        </div>
        <div className="mt-10 w-[40%]">
          <button
            type="submit"
            className="bg-PurpleColor cursor-pointer w-[100%] font-[700] text-[18px]  h-12 text-white font-Urbanist rounded-[6px]"
          >
            <Link to={'/login'}>Log in Now</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordChangeSuccesFully;
