 const propertyFeatureMap = {
  "Apartments / Multifamily": [
    { name: "LaundryFacilities", label: "Laundry Facilities" },
    { name: "ParkingSpaces", label: "Parking Spaces" },
    { name: "SwimmingPool", label: "Swimming Pool" },
    { name: "FitnessCenter", label: "Fitness Center" },
    { name: "Playground", label: "Playground" },
    { name: "PetFriendly", label: "Pet-Friendly" },
    { name: "SecurityGatedAccess", label: "Security / Gated Access" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "HighSpeedInternet", label: "High-Speed Internet" },
  ],

  "Automotive Property": [
    { name: "ServiceBays", label: "Service Bays" },
    { name: "Showroom", label: "Showroom" },
    { name: "PartsStorageArea", label: "Parts / Storage Area" },
    { name: "CustomerWaitingArea", label: "Customer Waiting Area" },
    { name: "OfficeSpace", label: "Office Space" },
    { name: "ParkingLot", label: "Parking Lot" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
  ],

  "Church": [
    { name: "SanctuaryWorshipArea", label: "Sanctuary / Worship Area" },
    { name: "FellowshipHall", label: "Fellowship / Gathering Hall" },
    { name: "ClassroomsMeetingRooms", label: "Classrooms / Meeting Rooms" },
    { name: "ParkingLot", label: "Parking Lot" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "KitchenFacilities", label: "Kitchen Facilities" },
  ],

  "Gas Station": [
    { name: "FuelPumps", label: "Fuel Pumps" },
    { name: "ConvenienceStore", label: "Convenience Store" },
    { name: "Restrooms", label: "Restrooms" },
    { name: "CarWash", label: "Car Wash" },
    { name: "Parking", label: "Parking" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
  ],

  "Healthcare Facility": [
    { name: "PatientRooms", label: "Patient Rooms" },
    { name: "WaitingReceptionArea", label: "Waiting / Reception Area" },
    { name: "MedicalLabSpace", label: "Medical Equipment / Lab Space" },
    { name: "Parking", label: "Parking" },
    { name: "SecurityAccessControl", label: "Security / Access Control" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "HVACSystems", label: "HVAC Systems" },
  ],

  "Hospitality (Hotel / Motel)": [
    { name: "GuestRooms", label: "Guest Rooms" },
    { name: "SwimmingPool", label: "Swimming Pool" },
    { name: "RestaurantBar", label: "Restaurant / Bar" },
    { name: "FitnessCenter", label: "Fitness Center" },
    { name: "ParkingTransportation", label: "Parking / Transportation" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
  ],

  "Industrial Building": [
    { name: "ClearCeilingHeight", label: "Clear Ceiling Height" },
    { name: "LoadingDocks", label: "Loading Docks" },
    { name: "GradeLevelDoors", label: "Grade-Level Doors" },
    { name: "OfficeSpace", label: "Office Space" },
    { name: "FireSuppression", label: "Sprinkler / Fire Suppression" },
    { name: "HighCapacityUtilities", label: "High Capacity Utilities" },
    { name: "Fence", label: "Fence" },
    { name: "StabilizedYard", label: "Stabilized Yard" },
    { name: "SecuritySystem", label: "Security System" },
  ],

  "Industrial Park": [
    { name: "MultipleBuildings", label: "Multiple Industrial Buildings" },
    { name: "SharedLoadingParking", label: "Shared Loading / Parking" },
    { name: "SecurityGatedAccess", label: "Security / Gated Access" },
    { name: "TruckAccess", label: "Roadway / Truck Access" },
    { name: "CentralManagement", label: "Central Management" },
    { name: "HighCapacityUtilities", label: "High-Capacity Utilities" },
  ],

  "Mixed Use Property": [
    { name: "RetailUnits", label: "Retail Units" },
    { name: "OfficeUnits", label: "Office Units" },
    { name: "ResidentialUnits", label: "Residential Units" },
    { name: "Parking", label: "Parking" },
    { name: "SecurityAccessControl", label: "Security / Access Control" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "HighSpeedInternet", label: "High-Speed Internet" },
  ],

  "Office Building": [
    { name: "LobbyReception", label: "Lobby / Reception" },
    { name: "ConferenceRooms", label: "Conference Rooms" },
    { name: "PrivateOffices", label: "Private Offices" },
    { name: "Parking", label: "Parking" },
    { name: "Cafe", label: "Café" },
    { name: "OnsiteManagement", label: "Onsite Management" },
    { name: "SecurityAccessControl", label: "Security / Access Control" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "HighSpeedInternet", label: "High-Speed Internet" },
  ],

  "Recreation Center": [
    { name: "GymnasiumCourts", label: "Gymnasium / Courts" },
    { name: "FitnessFacilities", label: "Fitness Facilities" },
    { name: "SwimmingPool", label: "Swimming Pool" },
    { name: "LockerRooms", label: "Locker Rooms" },
    { name: "CommunityRooms", label: "Community Rooms" },
    { name: "Parking", label: "Parking" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
  ],

  "Retail Center": [
    { name: "OpenSalesFloor", label: "Open Sales Floor" },
    { name: "StorageBackRoom", label: "Storage / Back Room" },
    { name: "Parking", label: "Parking" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "SignageOpportunities", label: "Signage Opportunities" },
  ],

  "School Building": [
    { name: "Classrooms", label: "Classrooms" },
    { name: "AdministrativeOffices", label: "Administrative Offices" },
    { name: "Gymnasium", label: "Gymnasium" },
    { name: "Parking", label: "Parking" },
    { name: "SecurityAccessControl", label: "Security / Access Control" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "Playground", label: "Playground" },
  ],

  "Self-Storage Facility": [
    { name: "ClimateControlledUnits", label: "Climate-Controlled Units" },
    { name: "DriveUpUnits", label: "Drive-Up Units" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "GatedAccess", label: "Gated Access" },
    { name: "ParkingLoading", label: "Parking / Loading" },
    { name: "OnsiteManagement", label: "Onsite Management" },
  ],

  "Senior Living Facility": [
    { name: "LivingUnits", label: "Private / Semi-Private Living Units" },
    { name: "DiningFacilities", label: "Dining Facilities" },
    { name: "CommonAreas", label: "Common Areas" },
    { name: "HealthcareRooms", label: "Medical / Healthcare Rooms" },
    { name: "SecurityEmergencyCall", label: "Security / Emergency Call" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "Transportation", label: "Transportation" },
  ],

  "Shopping Center": [
    { name: "AnchorTenant", label: "Anchor Tenant" },
    { name: "InlineRetail", label: "Inline Retail" },
    { name: "FoodCourtRestaurants", label: "Food Court / Restaurants" },
    { name: "Parking", label: "Parking" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
  ],

  "Single-Tenant Retail Building": [
    { name: "OpenSalesFloor", label: "Open Sales Floor" },
    { name: "StorageBackRoom", label: "Storage / Back Room" },
    { name: "Parking", label: "Parking" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "HighVisibilitySignage", label: "High-Visibility Signage" },
  ],

  "Strip Center": [
    { name: "MultipleRetailUnits", label: "Multiple Retail Units" },
    { name: "SharedParking", label: "Shared Parking" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "SignageOpportunities", label: "Signage Opportunities" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "HighFootTraffic", label: "High Foot Traffic" },
  ],

  "Vacant Land": [
    { name: "ZoningRequired", label: "Zoning Required" },
    { name: "DeedRestrictions", label: "Deed Restrictions" },
    { name: "Fence", label: "Fence" },
    { name: "SepticSystem", label: "Septic System" },
    { name: "Well", label: "Well" },
    { name: "UtilityConnections", label: "County or City Utility Connections" },
    { name: "RoadAccess", label: "Road Access" },
    { name: "MineralRights", label: "Mineral Rights" },
    { name: "EnvironmentalClearances", label: "Environmental Clearances" },
    { name: "StormwaterManagement", label: "Drainage / Stormwater Management" },
  ],

  "Other": [
    { name: "FlexibleSpace", label: "Flexible Space" },
    { name: "Parking", label: "Parking" },
    { name: "SecuritySystem", label: "Security System" },
    { name: "AccessibilityFeatures", label: "Accessibility Features" },
    { name: "HVACSystems", label: "HVAC Systems" },
    { name: "HighSpeedInternet", label: "High-Speed Internet" },
  ],
};


export default propertyFeatureMap