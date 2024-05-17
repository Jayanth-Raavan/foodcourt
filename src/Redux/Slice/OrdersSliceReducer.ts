import { createSlice } from "@reduxjs/toolkit";
import { AddOrder, GetOrders, UpdateOrder } from "../Action/OrdersAction";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
};
export const OrdersSliceReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    //=============== [ ADD ORDERS IN MANAGE ORDERS ] =========================
    builder.addCase(AddOrder.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(AddOrder.fulfilled, (state: any, action: any) => {
      state.isLoading = false;
      state.data = action?.payload;
    });
    builder.addCase(AddOrder.rejected, (state: any) => {
      state.isError = true;
    });
    //===============[ UPDATE ORDER ]=============================================
    builder.addCase(UpdateOrder.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateOrder.fulfilled, (state: any, action: any) => {
      state.isLoading = false;
      state.data = action?.payload;
    });
    builder.addCase(UpdateOrder.rejected, (state: any) => {
      state.isError = true;
    });
    //============= [ GET ALL ORDERS BY USERID ] ===============================
    builder.addCase(GetOrders.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(GetOrders.fulfilled, (state: any, action: any) => {
      state.isLoading = false;
      state.data = action?.payload;
    });
    builder.addCase(GetOrders.rejected, (state: any, action: any) => {
      state.isError = true;
    });
  },
});
export default OrdersSliceReducer.reducer;