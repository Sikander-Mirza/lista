import { createSlice } from "@reduxjs/toolkit";

const unreadSlice = createSlice({
  name: "unread",
  initialState: {
    totalUnreadCount: 0,
  },
  reducers: {
    setTotalUnreadCount: (state, action) => {
      state.totalUnreadCount = action.payload;
    },
  },
});

export const { setTotalUnreadCount } = unreadSlice.actions;
export default unreadSlice.reducer;
