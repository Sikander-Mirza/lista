import { Switch } from "@headlessui/react";
import React from "react";

const Switches = ({ value, onChange , checked  , onBlur , onClick }) => {
  return (
    <Switch
    onClick={onClick}
      checked={value}
      onChange={onChange}
      className={`${
        value || checked ? "bg-PurpleColor" : "bg-gray-200"
      } group inline-flex h-6 w-10 lg:h-6.5 lg:w-12 items-center rounded-full transition outline-none`}
    >
      <span
        className={`size-4 rounded-full bg-white transition ${
          value ? "translate-x-5 lg:translate-x-6" : "translate-x-1"
        }`}
      />
    </Switch>
  );
};

export default Switches;
