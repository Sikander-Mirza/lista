import React from "react";
import { Controller } from "react-hook-form";

export default function CapRate({
  control,
  errors,
  trigger,
  capRateMin,
  capRateMax,
  getValues
}) {
  const min = 0;
  const max = 30;

  return (
    <div className="w-full lg:max-w-md  mx-auto text-white font-Urbanist">
      <div className="flex items-center justify-between sm:justify-start lg:justify-center gap-2 mb-6">
        {/* Min Input */}
        <div className="flex gap-2 items-center">
          <label className="text-[#616362] font-Inter text-[15px] font-[700]">
            Min
          </label>
          <Controller
            name="capRateMin"
            control={control}
            // rules={{
            //   required: "Min is required",
            //   min: { value: 0, message: "Min must be ≥ 0" },
            //   validate: (value) => {
            //     const max = getValues("capRateMax");
            //     return value < max || "Min must be less than Max";
            //   },
            // }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                min={0}
                value={field.value} // fallback here
                className={`bg-[#F3EEFF] border ${
                  errors.capRateMin ? "border-red-500" : "border-[#F3EEFF]"
                } text-Paracolor font-[600] text-[14px] w-20 h-8 rounded-[6px] px-1 outline-none`}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  val = Math.max(0, Math.min(val, max)); // clamp between 0 and max
                  field.onChange(val);
                  trigger(["capRateMin", "capRateMax"]);
                }}
              />
            )}
          />
        </div>

        {/* Dual Range Slider */}
        <Controller
          name="capRateMin"
          control={control}
          render={({ field: minField }) => (
            <Controller
              name="capRateMax"
              control={control}
              render={({ field: maxField }) => {
                const minVal = minField.value ?? 0;
                const maxVal = maxField.value ?? 0;
                const minPercent = ((minVal - min) / (max - min)) * 100;
                const maxPercent = ((maxVal - min) / (max - min)) * minVal;
                return (
                  <div className="relative hidden sm:flex w-full">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 rounded -translate-y-1/2" />
                    <div
                      className="absolute top-1/2 h-1 bg-[#0075ff] rounded -translate-y-1/2"
                      style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                      }}
                    />
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={minVal}
                      onChange={(e) => {
                        const val = Math.min(
                          Number(e.target.value),
                          maxVal - 1
                        );
                        minField.onChange(val);
                        trigger(["capRateMin", "capRateMax"]);
                      }}
                      className="absolute top-1/2 w-full h-10 -translate-y-1/2 appearance-none bg-transparent z-20"
                    />
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={maxVal}
                      onChange={(e) => {
                        const val = Math.max(
                          Number(e.target.value),
                          minVal + 1
                        );
                        maxField.onChange(val);
                        trigger(["capRateMin", "capRateMax"]);
                      }}
                      className="absolute top-1/2 w-full h-10 -translate-y-1/2 appearance-none bg-transparent z-30 cursor-pointer"
                    />
                  </div>
                );
              }}
            />
          )}
        />

        {/* Max Input */}
        <div className="flex gap-2 items-center">
          <label className="text-[#616362] font-Inter text-[15px] font-[700]">
            Max
          </label>
          <Controller
            name="capRateMax"
            control={control}
            // rules={{
            //   required: "Max is required",
            //   min: { value: 0, message: "Max must be ≥ 0" },
            //   max: { value: 30, message: "Max must be ≤ 30" },
            //   validate: (value) => {
            //     const min = getValues("capRateMin");
            //     return value > min || "Max must be greater than Min";
            //   },
            // }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                value={field.value} // fallback here
                className={`bg-[#F3EEFF] border ${
                  errors.capRateMax ? "border-red-500" : "border-[#F3EEFF]"
                } text-Paracolor font-[600] text-[14px] w-20 h-8 rounded-[6px] px-1 outline-none`}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  val = Math.max(min, Math.min(val, max));
                  field.onChange(val);
                  trigger(["capRateMin", "capRateMax"]);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
