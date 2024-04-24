import { createSlice } from "@reduxjs/toolkit";
import { GetNonVegItems } from "../Action/CartAction";

const initialState = {
    isLoading: false,
    data: null,
    isError: false
  }
  export const NonVegStartersSliceReducer = createSlice({
    name: 'veg_items',
    initialState,
    reducers: {},
    extraReducers: ((builder: any) => {
      builder.addCase(GetNonVegItems.pending, (state: any, action: any) => {
        state.isLoading = true;
      });
      builder.addCase(GetNonVegItems.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.data = action.payload
      });
      builder.addCase(GetNonVegItems.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        console.log("Error", action.payload)
      })
    }),
  });

  export default NonVegStartersSliceReducer.reducer;
  
