import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "navSlice",
  initialState: null,
  reducers: {
    setActivePath: (state, action) => {
      return action.payload;
    },
  },
});

export default navSlice.reducer;
export const { setActivePath } = navSlice.actions;
