const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/lib-B14ixrnL.js","assets/vendor-core-Cfy86vm1.js","assets/vendor-optional-BrmgVPMo.js"])))=>i.map(i=>d[i]);
import{_ as a}from"./index-jlTSnoxE.js";import{j as t}from"./vendor-ui-6lrfi3qi.js";import{a as r}from"./vendor-core-Cfy86vm1.js";const p=r.lazy(()=>a(()=>import("./lib-B14ixrnL.js").then(o=>o.l),__vite__mapDeps([0,1,2]))),l=({setPhone:o,phone:e,error:n})=>t.jsxs("div",{className:"w-full",children:[t.jsx("label",{htmlFor:"phone",className:"block mb-2 font-[700] text-PurpleColor text-[16px]",children:"Phone Number"}),t.jsx(r.Suspense,{fallback:t.jsx("div",{className:"w-full h-12 rounded-md bg-[#F3EEFF] animate-pulse"}),children:t.jsx("div",{className:"phone-input-wrapper",children:t.jsx(p,{country:"us",value:e||"",onChange:o,onlyCountries:["us"],enableSearch:!1,disableSearchIcon:!0,placeholder:"Enter Your Phone Number",containerClass:"phone-container",inputClass:`phone-input ${n?"phone-input-error":""}`,buttonClass:"phone-button",dropdownClass:"phone-dropdown"})})}),n&&t.jsx("p",{className:"text-red-500 font-[500] text-[14px] pt-1 font-Urbanist tracking-wide",children:n}),t.jsx("style",{children:`
        .phone-input-wrapper {
          width: 100%;
        }

        .phone-container {
          width: 100% !important;
          position: relative;
        }

        .phone-container .form-control {
          width: 100% !important;
          height: 48px !important;
          padding-left: 58px !important;
          border-radius: 8px !important;
          border: 1px solid #F3EEFF !important;
          background-color: #F3EEFF !important;
          color: #1d1d1d !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          font-family: Urbanist, sans-serif !important;
          box-shadow: none !important;
        }

        .phone-container .form-control:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: #7c3aed !important;
        }

        .phone-container .flag-dropdown {
          border: none !important;
          background: transparent !important;
          width: 52px !important;
          border-radius: 8px 0 0 8px !important;
        }

        .phone-container .selected-flag {
          width: 52px !important;
          padding-left: 14px !important;
          background: transparent !important;
          border-radius: 8px 0 0 8px !important;
        }

        .phone-container .selected-flag:hover {
          background: transparent !important;
        }

        .phone-container .flag-dropdown.open .selected-flag {
          background: transparent !important;
        }

        .phone-container .country-list {
          width: 300px !important;
          border-radius: 10px !important;
          box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important;
        }

        .phone-input-error {
          border: 1px solid #ef4444 !important;
        }
      `})]});export{l as C};
