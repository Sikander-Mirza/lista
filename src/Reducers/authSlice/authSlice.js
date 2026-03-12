import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch user details
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async ({ token, apiKey }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiKey}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue({ type: "unauthenticated" });
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.clear(); // Optional: also clear local storage on manual logout
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;

        if (action.payload?.type === "unauthenticated") {
          localStorage.clear();
          window.location.href = "/login"; 
        } else {
          state.error = action.payload?.message || "Something went wrong";
        }
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
