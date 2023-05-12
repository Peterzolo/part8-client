import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
  isError: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showSuccess: (state, action) => {
      state.notification = action.payload;
      state.isError = false;
    },
    showError: (state, action) => {
      state.notification = action.payload;
      state.isError = true;
    },
    hideNotification: (state) => {
      state.notification = null;
      state.isError = false;
    },
  },
});

export const { showSuccess, showError, hideNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
