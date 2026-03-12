import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/webp.png'

export default function NotFound() {
  return (
    <div className="min-h-screen absolute w-[100%] top-0 left-0 flex flex-col items-center justify-center h-[100%] bg-black text-white text-center font-[Segoe_UI,Helvetica,Arial,sans-serif] animate-fadeIn z-50 px-4">
      {/* Logo */}
      <img
        src={Logo}
        alt="Newlista Logo"
        className="w-[200px] h-auto mb-8"
      />

      {/* Upgrade Message */}
      <h1 className="text-2xl font-semibold mb-2 font-Urbanist">
        We’re making some upgrades to improve your experience.
      </h1>
      <p className="text-[1.1rem] text-gray-400 leading-relaxed mb-10 font-Inter">
        Please check back with us soon.
      </p>

      {/* Loader Bar */}
      <div className="relative loader w-[150px] h-[10px] bg-[#222] rounded-full overflow-hidden mt-0">
      </div>
    </div>
  );
}
