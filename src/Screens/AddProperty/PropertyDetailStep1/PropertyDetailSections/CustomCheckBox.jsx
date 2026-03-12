import React from "react";
import { Controller } from "react-hook-form";
import Checkboxs from "../../../../Components/InputFields/Checkboxs";
import propertyFeatureMap from "../../../../CustomHook/CheckBoxes/CheckBoxes.js"


const CustomCheckBox = ({ control, errors, propertyType }) => {

  const checkboxes = propertyFeatureMap[propertyType];
  if (!checkboxes) return null;

  return (
    <>
      <h1 className="font-Urbanist font-[500] mb-2 text-[#242424] text-[17px]">
        Features
      </h1>
      <Controller
        name="custom_fields"
        control={control}
        render={({ field }) => (
          <div className="grid max-[400px]:grid-cols-1 grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4 md:gap-3">
            {checkboxes.map((opt) => (
              <Checkboxs
                key={opt.name}
                name={opt.name}
                labels={opt.label}
                checked={String(field.value?.[opt.name]) === "true"}
                onChange={(checked) =>
                  field.onChange({
                    ...field.value,
                    [opt.name]: checked,
                  })
                }
              />
            ))}
          </div>
        )}
      />
     
    </>
  );
};

export default CustomCheckBox;
