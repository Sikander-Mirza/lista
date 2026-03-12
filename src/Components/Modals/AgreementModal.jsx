import { Link } from "react-router-dom";

export default function AgreementModal({
  setShowModal,
  setGoogleUserData,
  setModalAgreed,
  modalAgreed,
  Loading,
  submitAfterAgreement,
  tempFormData,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm max-[400px]:p-0 sm:p-4 p-8"
      onClick={() => {
        setShowModal(false);
        setGoogleUserData(null);
        setModalAgreed(false);
      }}
      aria-modal="true"
      role="dialog"
    >
      {/* Prevent click inside modal from closing */}
      <div
        className={`
          relative w-full max-w-full sm:w-[92%] sm:max-w-lg md:max-w-2xl lg:max-w-lg xl:max-w-2xl min-[1780px]:!max-w-3xl
          bg-white shadow-2xl ring-1 ring-black/5
          animate-[pop_180ms_cubic-bezier(0.2,0.7,0.3,1)_both]
          h-[90dvh] sm:h-auto sm:max-h-[90vh] 2xl:max-h-[300vh]
          rounded-2xl
          flex flex-col
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            sticky top-0 z-10
            bg-gradient-to-r from-PurpleColor to-PurpleColor
            text-white px-4 py-4 sm:px-6 sm:py-5 min-[1780px]:!py-7
            rounded-t-2xl
          "
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 grid h-12 w-12 place-items-center rounded-full bg-white/20">
              {/* Shield/Alert icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
                aria-hidden="true"
              >
                <path
                  d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 8v5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="15.5" r="1" fill="currentColor" />
              </svg>
            </div>
            <div className="min-w-0">
              <h2
                id="agreement-title"
                className="font-Urbanist max-[400px]:text-[22px] text-[19.5px] leading-[26px] sm:text-2xl min-[1780px]:!text-3xl min-[1780px]:!leading-[40px] font-semibold sm:leading-7"
              >
                Important Notice for Investors
              </h2>
              <p className="font-Urbanist mt-0.5 text-xs min-[1780px]:!text-[17px] sm:text-sm/5 text-white/80">
                Please review and accept the terms below to continue.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 overflow-y-auto max-h-[calc(100dvh-160px)] sm:max-h-none"
          id="agreement-desc"
        >
          <div className="rounded-xl border border-red-500 bg-red-50/70 p-4">
            <p className="font-Inter text-[13px] min-[1780px]:!text-[18px] font-[500] sm:text-[15px] text-red-700">
              <span className="font-semibold">Newlista</span> is exclusively for bona fide real-estate investors.
            </p>
            <ul className="mt-3 list-disc font-[500] min-[1780px]:!text-[18px] space-y-1.5 pl-5 font-Inter text-[12.5px] sm:text-[14px] text-red-700/90">
              <li>No soliciting, wholesaling, or marketing to other users.</li>
              <li>We do not facilitate syndications.</li>
              <li>Investors must comply with all SEC rules and regulations.</li>
              <li>Misuse of the platform may result in suspension or a ban without refund.</li>
              <li>By signing up, you agree to these terms.</li>
            </ul>
          </div>

          {/* Checkbox */}
          <label className="mt-6 flex items-start gap-3">
            <input
              type="checkbox"
              checked={modalAgreed}
              onChange={(e) => setModalAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 sm:h-5 sm:w-5 shrink-0 cursor-pointer"
              aria-describedby="agreement-desc"
            />
            <span className="font-Inter text-[12.5px] min-[1780px]:!text-[18px] sm:text-[14px] font-[500] text-black">
              I have read and agree to the Important Notice above, as well as the{" "}
              <Link
                to="/terms-of-use"
                className="text-PurpleColor underline underline-offset-2 hover:opacity-90"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-PurpleColor underline underline-offset-2 hover:opacity-90"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        {/* Footer */}
        <div
          className="
            bottom-0 sm:mt-2 flex items-center justify-end gap-3
            border-t border-[#e1dede] bg-slate-50/70 px-4 sm:px-6 py-3 sm:py-4
            rounded-b-2xl
          "
        >
          <button
            onClick={() => {
              setShowModal(false);
              setGoogleUserData(null);
              setModalAgreed(false);
            }}
            className="
              font-Urbanist text-[13px] sm:text-[14px] min-[1780px]:!text-[18px] font-semibold
              inline-flex items-center justify-center rounded-lg border border-slate-300
              bg-white px-4 py-2.5 text-slate-700 hover:bg-slate-50
              focus:outline-none focus:ring-2 focus:ring-slate-200
            "
          >
            Cancel
          </button>

          <button
            disabled={!modalAgreed || Loading}
            onClick={() => submitAfterAgreement(tempFormData)}
            className="
              font-Urbanist text-[13px] min-[1780px]:!text-[18px] sm:text-[14px] font-semibold
              inline-flex items-center justify-center rounded-lg
              bg-gradient-to-r from-PurpleColor to-PurpleColor px-4 py-2.5 text-white
              hover:opacity-95
              disabled:cursor-not-allowed disabled:opacity-60
              focus:outline-none focus:ring-2 focus:ring-violet-300
            "
          >
            {Loading ? "Processing..." : "Agree & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
