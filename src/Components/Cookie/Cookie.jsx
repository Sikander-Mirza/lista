import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "cookie-consent-v1";

const Cookie = () => {
  const [visible, setVisible] = useState(false);   
  const [enter, setEnter] = useState(false);       

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        setVisible(true);
        requestAnimationFrame(() => setEnter(true));
      }
    } catch {
      setVisible(true);
      requestAnimationFrame(() => setEnter(true));
    }

    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setEnter(false);
        setTimeout(() => setVisible(false), 250);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setEnter(false);
    setTimeout(() => setVisible(false), 250);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed b z-50 bottom-0 w-full"
    >
      <div
        className={[
          "bg-[#f5f5f5] border border-black/5 shadow-xl",
          "px-6 md:px-7 py-4",
          "flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between",
          "transition-all duration-250 ease-out",
          enter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        ].join(" ")}
      >
        <div className="text-black">
          <h1 className="font-Urbanist font-[600] text-[15px] leading-[20px]">
            We use cookies to enhance your browsing experience and gather insights for performance improvements.
          </h1>
          <h4 className="font-Urbanist font-[500] text-[#353434] text-[13.5px] leading-[19px]">
            By continuing to use this site, you agree to our{" "}
            <span className="border-b border-black/40">
              <Link to="/terms-of-use" className="hover:opacity-80">Terms of Use</Link>
            </span>{" "}
            and our{" "}
            <span className="border-b border-black/40">
              <Link to="/privacy-policy" className="hover:opacity-80">Privacy Policy</Link>
            </span>.
          </h4>
        </div>

        <div className="shrink-0">
          <button
            onClick={accept}
            className="bg-black text-white font-semibold font-Urbanist px-4 py-2 text-[14px] rounded-full hover:opacity-90 transition hover-btn hover-btn-black"
          >
            <span>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cookie;
