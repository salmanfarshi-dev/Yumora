import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousvalue: "",
  currentvalue: "",
  previouspath: "",
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumb: (state, action) => {
      state.previousvalue = action.payload.previous;
      state.currentvalue = action.payload.current;
      state.previouspath = action.payload.previouspath;
    },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
