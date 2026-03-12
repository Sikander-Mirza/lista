import { Checkbox } from "@headlessui/react";

function Checkboxs({ labels, value, onChange, checked, error }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 relative">
        <Checkbox
          checked={checked}
          onChange={onChange}
          className="group block size-3.5 border w-[19px] h-[17px] 2xl:w-[20px] 2xl:h-[18px] rounded-[2px] bg-white data-checked:bg-PurpleColor"
        >
          <svg
            className="stroke-white opacity-0 group-data-checked:opacity-100"
            viewBox="-2 -0.5 18 18"
            fill="none"
            width={18.5}
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
        <label className="text-[13.5px] sm:text-[15px] md:text-[14px] 2xl:text-[16px] leading-[17px] 2xl:leading-[22px] font-[600] text-[#222222]">
          {labels}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default Checkboxs;
