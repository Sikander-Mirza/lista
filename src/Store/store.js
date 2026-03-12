import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authSlice/authSlice.js";
import unreadReducer from "../Reducers/UnreadCount/UnreadCountSlice.js";
import pendingOffersReducer from "../Reducers/PendingOffers/pendingOffersSlice.js"; 
import filterReduce from "../Reducers/filterSlice/filterSlice.js"; 


const store = configureStore({
  reducer: {
    auth: authReducer,
    unread: unreadReducer,
    pendingOffers: pendingOffersReducer,
    filters: filterReduce,
  },
});

export default store;
