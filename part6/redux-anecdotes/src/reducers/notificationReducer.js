import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return initialState;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;

// Action Creator
export const setNotification = (message, timeLimit) => {
  return async (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => dispatch(clearNotification()), timeLimit * 1000);
  };
};

export default notificationSlice.reducer;
