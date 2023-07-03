import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

// Without reduxjs/toolkit
//
// action creator
// export const updateFilterText = (filterText) => {
//   return {
//     type: "FILTER",
//     payload: filterText,
//   };
// };
//
// reducer
// const filterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// With redux toolkit the reducer property is the reducer itself.
// The main difference is that rather than using switches, the action
// creators themselves are used to handle the state changes.
//
// The type property is omitted by default in the actions and are
// auto generated by concatenating the name property with the name of the
// action creator.
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilterText(state, action) {
      return action.payload;
    },
  },
});

export const { updateFilterText } = filterSlice.actions;
export default filterSlice.reducer;