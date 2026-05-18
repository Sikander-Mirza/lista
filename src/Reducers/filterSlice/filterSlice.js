// src/redux/slices/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listingType: "",
  propertyType: "",
  state: "",
  city: "",
  priceRange: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
