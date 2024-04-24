import { createSlice } from "@reduxjs/toolkit";
import { AddAddress, GetAddress } from "../Action/AddressAction";

const initialState = {
  isLoading: false,
  isError: false,
  address: null,
};
export const AddressSilceReducer = createSlice({
    name:"Address_Slice",
    initialState,
    reducers:{},
    extraReducers:((builder:any)=>{
        builder.addCase(AddAddress.pending, (state:any)=>{
            state.isLoading = true;
        });
        builder.addCase(AddAddress.fulfilled, (state:any,action:any)=>{
            state.isLoading = false;
            state.address = action?.payload;
        });
        builder.addCase(AddAddress.rejected, (state:any)=>{
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(GetAddress.pending, (state:any)=>{
            state.isLoading = true;
        });
        builder.addCase(GetAddress.fulfilled, (state:any,action:any)=>{
            state.isLoading = false;
            state.address = action?.payload;
        });
        builder.addCase(GetAddress.rejected, (state:any)=>{
            state.isLoading = false;
            state.isError = true;
        });
    })
});
export default AddressSilceReducer.reducer;