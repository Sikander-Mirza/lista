import { Zap } from "lucide-react";
import React from "react";

const defaultConfig = {
  fields: [
    { label: "Currency", key: "Currency" },
    { label: "Monthly Rental", key: "MonthlyRental" },
    { label: "Building Levels", key: "BuildingLevels" },
    { label: "Tenancy", key: "Tenancy" },
    { label: "Parking Space", key: "ParkingSpace" },
    { label: "CAM", key: "CAM" },
    { label: "Number Of Units", key: "NumberOfUnits" },
    { label: "Building Class", key: "BuildingClass" },
    { label: "Percentage Leased", key: "PercentageLeased" },
    { label: "Parking", key: "Parking" },
    { label: "HVAC", key: "HVAC" },
    { label: "Sprinkler System", key: "SprinklerSystem" },
    { label: "Security System", key: "SecuritySystem" },
    { label: "High Speed Internet", key: "HighSpeedInternet" },
    { label: "ADACompliant", key: "ADA Compliant" },
  ],
};

const fieldConfig = {
  "Vacant Land": {
    fields: [
      { label: "Currency", key: "Currency" },

      { label: "Monthly Rental", key: "MonthlyRental" },

      { label: "Fenced", key: "Fenced" },

      {
        label: "LandScape",

        key: "LandScapeCombined",

        combine: (fields) =>
          `${fields.LandScapeNumber || ""} ${fields.LandScape || ""}`.trim(),
      },

      {
        label: "LandScape Acres",

        key: "LandScapeAcresCombined",

        combine: (fields) =>
          `${fields.LandScapeNumber2 || ""} ${
            fields.LandScapeAcres || ""
          }`.trim(),
      },

      { label: "Parking", key: "Parking" },

      { label: "HVAC", key: "HVAC" },

      { label: "Sprinkler System", key: "SprinklerSystem" },

      { label: "Security System", key: "SecuritySystem" },

      { label: "High Speed Internet", key: "HighSpeedInternet" },

      { label: "ADACompliant", key: "ADA Compliant" },
    ],
  },

  Warehouse: {
    fields: [
      { label: "Currency", key: "Currency" },

      { label: "Monthly Rental", key: "MonthlyRental" },

      { label: "Ceiling Height", key: "CeilingHeight" },

      {
        label: "LandScape",

        key: "LandScapeCombined",

        combine: (fields) =>
          `${fields.LandScapeNumber || ""} ${fields.LandScape || ""}`.trim(),
      },

      {
        label: "LandScape Acres",

        key: "LandScapeAcresCombined",

        combine: (fields) =>
          `${fields.LandScapeNumber2 || ""} ${
            fields.LandScapeAcres || ""
          }`.trim(),
      },

      { label: "Over Head Doors", key: "OverheadDoors" },

      { label: "Parking Space", key: "ParkingSpace" },

      { label: "Number Of Docks", key: "NumberOfDocks" },

      { label: "Building Class", key: "BuildingClass" },

      { label: "Ground-Level-Docks", key: "GroundLevelDocks" },

      { label: "High-Level-Docks", key: "HighLevelDocks" },

      { label: "Parking", key: "Parking" },

      { label: "HVAC", key: "HVAC" },

      { label: "Sprinkler System", key: "SprinklerSystem" },

      { label: "Security System", key: "SecuritySystem" },

      { label: "High Speed Internet", key: "HighSpeedInternet" },

      { label: "ADACompliant", key: "ADA Compliant" },
    ],
  },

  "Industrial Park": {
    fields: [
      { label: "Ceiling Height", key: "CeilingHeight" },
      { label: "Over Head Doors", key: "OverheadDoors" },
      { label: "Ground-Level-Docks", key: "GroundLevelDocks" },
      { label: "High-Level-Docks", key: "HighLevelDocks" },
      { label: "Bathroom", key: "Bathroom" },
      { label: "LotSize", key: "LotSize" },
      { label: "Crane", key: "Crane" },
      { label: "Office/Meeting Room", key: "office/meetingroom" },
      { label: "Stabilized Yard", key: "stabilizedyard" },
      { label: "Fence", key: "Fence" },
      { label: "Kitchen/Break Area", key: "kitchen/breakArea" },
      { label: "120/240V", key: "120/240V" },
      { label: "120/208V", key: "120/208V" },
      { label: "120/208V", key: "120/208V" },
      { label: "240V", key: "240V" },
      { label: "277/480V", key: "277/480V" },
      { label: "Other", key: "Other" },
    ],
  },
  "Industrial Building": {
    fields: [
      { label: "Ceiling Height", key: "CeilingHeight" },
      { label: "Over Head Doors", key: "OverheadDoors" },
      { label: "Ground-Level-Docks", key: "GroundLevelDocks" },
      { label: "High-Level-Docks", key: "HighLevelDocks" },
      { label: "Bathroom", key: "Bathroom" },
      { label: "LotSize", key: "LotSize" },
      { label: "Crane", key: "Crane" },
      { label: "Office/Meeting Room", key: "office/meetingroom" },
      { label: "Stabilized Yard", key: "stabilizedyard" },
      { label: "Fence", key: "Fence" },
      { label: "Kitchen/Break Area", key: "kitchen/breakArea" },
      { label: "120/240V", key: "120/240V" },
      { label: "120/208V", key: "120/208V" },
      { label: "120/208V", key: "120/208V" },
      { label: "240V", key: "240V" },
      { label: "277/480V", key: "277/480V" },
      { label: "Other", key: "Other" },
    ],
  },

  "Retail Center": {
    fields: [
      { label: "Monthly Rental", key: "MonthlyRental" },

      { label: "Building Levels", key: "BuildingLevels" },

      { label: "Number Of Units", key: "NumberOfUnits" },

      {
        label: "LandScape",

        key: "LandScapeCombined",

        combine: (fields) =>
          `${fields.LandScapeNumber || ""} ${fields.LandScape || ""}`.trim(),
      },

      {
        label: "LandScape Acres",

        key: "LandScapeAcresCombined",

        combine: (fields) =>
          `${fields.LandScapeNumber2 || ""} ${
            fields.LandScapeAcres || ""
          }`.trim(),
      },

      { label: "Building Class", key: "BuildingClass" },

      { label: "Percentage Lease", key: "Percentage-Lease" },

      { label: "Parking Space", key: "Parking-Space" },

      { label: "Outdoor Signage", key: "Outdoor-Signage" },

      { label: "Parking", key: "Parking" },

      { label: "HVAC", key: "HVAC" },

      { label: "Sprinkler System", key: "SprinklerSystem" },

      { label: "Security System", key: "SecuritySystem" },

      { label: "High Speed Internet", key: "HighSpeedInternet" },

      { label: "ADACompliant", key: "ADA Compliant" },
    ],
  },
};

const KeyFeatures = ({ SingleProperty }) => {
  const property_type = SingleProperty?.property_type;
  const custom_fields = SingleProperty?.custom_fields || {};

  const config = fieldConfig[property_type] || defaultConfig;

  const computedFields = config.fields
    .map(({ key, label, combine }) => {
      let rawValue = combine ? combine(custom_fields) : custom_fields[key];

      // Handle booleans or "true"/"false" strings
      if (typeof rawValue === "boolean") {
        rawValue = rawValue ? "Yes" : "No";
      } else if (typeof rawValue === "string") {
        const lowerVal = rawValue.toLowerCase();
        if (lowerVal === "true") rawValue = "Yes";
        else if (lowerVal === "false") rawValue = "No";
      }

      return { key, label, value: rawValue };
    })
    .filter(
      ({ value }) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        String(value).toLowerCase() !== "none"
    );

  if (computedFields.length === 0) {
    return <span className="font-Urbanist font-semibold">Not Found!</span>;
  }

  return (
    <div className="flex flex-wrap sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-5">
      {computedFields.map(({ key, label, value }, index) => (
        <div
          key={`${key}-${index}`}
          className={`bg-[#F1F1F1] rounded-lg px-4 py-3 flex items-center text-start gap-2 ${
            index % 5 === 4 ? "w-full" : "w-[47.5%]"
          }`}
        >
          <Zap size={16} className="fill-black" />
          <span className="font-semibold text-[#000000]">
            {label}: {label === "Monthly Rental" ? "$" + value : value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default KeyFeatures;
