import React from "react";
import { Link } from "react-router-dom";
// ADDITIONAL CSS
import "../../index.css";
// IMAGES
import { CheckIcon, X } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PlansTabs = ({
  ButtonText,
  features,
  featured,
  PlanName,
  Pricing,
  Duration,
  disabled,
  buttonLink,
  Onclick,
  tooltip,
  desc,
  id
}) => {
  return (
    <>
      <div
        className={classNames(
          featured
            ? "relative bg-[#0a0a0a] shadow-2xl"
            : "bg-white/60  ",
          featured
            ? "rounded-3xl "
            : "rounded-3xl",
          "rounded-3xl px-5 py-8 min-[400px]:px-8 md:px-7 min-[400px]:py-12 ring-1 ring-gray-900/10 sm:p-10"
        )}
      >
        <h3
          className={classNames(
            featured ? "text-indigo-400" : "text-PurpleColor",
            "text-[15px] sm:text-base/7 md:text-[14.5px] font-semibold"
          )}
        >
          {PlanName}
        </h3>
        <p className="mt-1 flex items-baseline gap-x-1 ">
          <span
            className={classNames(
              featured ? "text-white" : "text-gray-900",
               "text-[32px] min-[450px]:!text-[39px] sm:!text-[43px] md:!text-[40px]  font-semibold tracking-tight font-Inter leading-[49px]"
            )}
          >
            ${Pricing}USD
          </span>
          
          <span
            className={classNames(
              featured ? "text-white" : "text-gray-500",
              "text-[13.5px] min-[450px]:text-base"
            )}
          >
            {Duration}
          </span>
        </p>
        <p  className={classNames(
              featured ? "text-white" : "text-gray-900",
               "text-[12px] w-[90%] mt-2 leading-[18px]  font-[400]  font-Inter "
            )}>
          {desc}
        </p>
        <p
          className={classNames(
            featured ? "text-white" : "text-gray-600",
            "mt-6 text-base/7"
          )}
        >
          {""}
        </p>
        <ul
          role="list"
          className={classNames(
            featured ? "text-white" : "text-gray-600",
            " mt-8 space-y-2 text-[12.5px] sm:text-sm/6 md:text-[13.5px] lg:text-[13px] sm:mt-5"
          )}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex gap-x-3">
              {feature.checked ? (
                <CheckIcon
                  aria-hidden="true"
                  className={classNames(
                    featured ? "text-white" : "text-PurpleColor",
                    "h-5 w-4.5 min-[480px]:h-6 min-[480px]:w-5 flex-none"
                  )}
                />
              ) : (
                <X className={"h-5 w-4.5 min-[480px]:h-6 min-[480px]:w-5 flex-none text-red-600"} />
              )}
              {feature.label}
            </li>
          ))}
        </ul>
        <Link to={buttonLink}>
          <button
            disabled={disabled}
            onClick={()=>{Onclick(id)}}
            title={tooltip}
            className={classNames(
              featured
                ? "bg-white text-black shadow-xs"
                : "text-black ring-1 bg-white border-white ring-PurpleColor ring-inset ",
              `${
                disabled
                  ? "cursor-not-allowed !bg-[#e9e9e9]"
                  : "hover-btn-black hover-btn "
              } mt-8 block rounded-md px-3.5 py-2.5 text-center text-[13px] sm:text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10  w-full`
            )}
          >
            <span>{ButtonText}</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default PlansTabs;
