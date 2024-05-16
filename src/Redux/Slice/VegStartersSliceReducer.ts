import { createSlice } from "@reduxjs/toolkit";
import { GetVegItems } from "../Action/CartAction";

const initialState = {
    isLoading: false,
    data: null,
    isError: false
  }
  export const VegStartersSliceReducer = createSlice({
    name: 'veg_items',
    initialState,
    reducers: {},
    extraReducers: ((builder: any) => {
      builder.addCase(GetVegItems.pending, (state: any, action: any) => {
        state.isLoading = true;
      });
      builder.addCase(GetVegItems.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.data = action.payload
      });
      builder.addCase(GetVegItems.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
      });
    }),
  });

  export default VegStartersSliceReducer.reducer;
  
