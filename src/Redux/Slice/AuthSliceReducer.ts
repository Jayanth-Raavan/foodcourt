import { createSlice } from "@reduxjs/toolkit";
import { AddUsers, GetUsers } from "../Action/AuthAction";

const initialState = {
  isLoading: false,
  isError: false,
  user: null,
  isAuthenticated: false,
};
export const AuthSliceReducer = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    // =============== [[[ ADD USER ]]] ================
    builder.addCase(AddUsers.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(AddUsers.fulfilled, (state: any, action: any) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(AddUsers.rejected, (state: any) => {
      state.isLoading = false;
      state.isError = true;
    });
    // =============== [[[ GET USER ]]] ================
    builder.addCase(GetUsers.pending, (state: any) => {
        state.isLoading = true;
      });
      builder.addCase(GetUsers.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
      });
      builder.addCase(GetUsers.rejected, (state: any) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default AuthSliceReducer.reducer;