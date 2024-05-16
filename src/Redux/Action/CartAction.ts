import { createAsyncThunk } from "@reduxjs/toolkit";
import { Delete, Delete1Item, Get, GetByID, Post, Put } from "../../Service/MasterService";

export const GetVegItems: any = createAsyncThunk("GetVegItems", async () => {
  const response = await Get("starters_veg");
  return response;
});
export const GetNonVegItems: any = createAsyncThunk("GetNonVegItems", async () => {
  const response = await Get("starters_nonVeg");
  return response;
});

//========= [ USER CART ] ========================//
export const GetUserCart: any = createAsyncThunk("GetUserCart", async (userId:any) => {
  const response = await GetByID("userCart", `?userId=${userId}`);
  return response;
});
export const AddUserCart: any = createAsyncThunk("AddUserCart", async (payload:any) => {
  const response = await Post("userCart", payload);
  return response;
});
//if cartData --> deletes item by item.itemId (multiple)
export const DeleteItem: any = createAsyncThunk("DeleteItem", async (item:any) => {
  const response = await Delete("userCart", item);
  return response[0];
});
//if cartData --> deletes item by item.id (sinlgle)
export const DeleteItembyId: any = createAsyncThunk("DeleteItembyId", async (item:any) => {
  const response = await Delete1Item("userCart", item);
  return response;
});
export const UpdateUserCart: any = createAsyncThunk("UpdateUserCart", async (payload:any) => {
  const response = await Put("userCart", payload);
  return response;
});