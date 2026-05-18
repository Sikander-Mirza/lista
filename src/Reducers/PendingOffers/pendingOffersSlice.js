// src/Reducers/PendingOffersCountSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingOffersCount: 0,
};

const pendingOffersSlice = createSlice({
  name: "pendingOffers",
  initialState,
  reducers: {
    setPendingOffersCount: (state, action) => {
      state.pendingOffersCount = action.payload;
    },
  },
});

export const { setPendingOffersCount } = pendingOffersSlice.actions;
export default pendingOffersSlice.reducer;
