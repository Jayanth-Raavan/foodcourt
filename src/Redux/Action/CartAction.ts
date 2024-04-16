import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetCartItemsS, GetVegItemsS } from "../../Service/CartService";

export const GetCartItems:any = createAsyncThunk("GetCartItems", async () => {
    const response = GetCartItemsS.then((res: any) => {
        return res;
    })
    return response;
});
export const GetVegItems:any = createAsyncThunk("GetVegItems", async () => {
    const response = GetVegItemsS.then((res: any) => {
        return res;
    })
    return response;
})