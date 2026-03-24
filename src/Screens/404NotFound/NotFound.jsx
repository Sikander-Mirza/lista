import React from "react";
import Logo from "../../assets/NewlistaLogo.webp";

export default function NotFound() {
  return (
    <div className="min-h-screen absolute w-full top-0 left-0 flex flex-col items-center justify-center bg-black text-white text-center font-[Segoe_UI,Helvetica,Arial,sans-serif] z-50 px-4 animate-fadeIn">
      {/* Logo */}
      <img
        src={Logo}
        alt="Newlista Logo"
        className="w-[200px] h-auto mb-8"
      />

      {/* Message */}
      <h1 className="text-2xl font-semibold mb-2 font-Urbanist">
        We’re making some upgrades to improve your experience.
      </h1>
      <p className="text-[1.1rem] text-gray-400 leading-relaxed mb-10 font-Inter">
        Please check back with us soon.
      </p>

      {/* Loader Bar */}
      <div className="loader relative w-[150px] h-[12px] bg-[#2a2a2a] rounded-full overflow-hidden">
        <div className="loader-shine absolute top-0 left-[-40%] h-full w-[40%]" />
      </div>
    </div>
  );
}