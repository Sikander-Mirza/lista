import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import Logo from "../../assets/NewlistaLogo.webp";
import BgImage from "../../assets/Banners/404-bg-banner.webp";

export default function Error() {
  return (
    <div className="relative h-screen w-full overflow-hidden font-['Urbanist',sans-serif]">
      {/* Background */}
      <img
        src={BgImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a102c]/50 via-black/40 to-[#0f172a]/60" />

      {/* Blur decorations */}
      <div className="absolute -top-16 -left-10 h-52 w-52 rounded-full bg-[#7C3AED]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#A855F7]/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-[24px] border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] px-5 py-7 sm:px-8 sm:py-8 text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={Logo}
              alt="Newlista Logo"
              className="w-[95px] sm:w-[115px] h-auto"
            />
          </div>

          {/* Badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#C084FC]/30 bg-[#7C3AED]/15 px-3 py-1 text-xs sm:text-sm font-medium text-purple-200">
            <SearchX size={14} />
            Page Not Found
          </div>

          {/* 404 */}
          <h1 className="mt-4 text-[52px] sm:text-[68px] md:text-[80px] font-extrabold leading-none text-white">
            404
          </h1>

          <h2 className="mt-2 text-[20px] sm:text-[26px] md:text-[30px] font-bold text-white leading-tight">
            We couldn’t find this page
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm sm:text-[15px] leading-relaxed text-gray-200/90">
            The page you’re trying to visit may have been moved, removed, or is currently unavailable.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(124,58,237,0.35)] transition hover:scale-[1.02] hover:bg-[#6D28D9]"
            >
              <Home size={16} />
              Back to Home
            </Link>

            {/* <button
              onClick={() => window.history.back()}
              className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-white/20"
            >
              <ArrowLeft size={16} />
              Go Back
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}