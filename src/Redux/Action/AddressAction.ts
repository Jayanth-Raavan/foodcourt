import { createAsyncThunk } from "@reduxjs/toolkit";
import { Get, GetByID, Post } from "../../Service/MasterService";

export const AddAddress: any = createAsyncThunk(
  "AddAddress",
  async (payload: any) => {
    try {
      const res = await Post("address", payload);
      return res;
    } catch (error: any) {
      console.error(error);
    }
  }
);
export const GetAddress: any = createAsyncThunk(
  "GetAddress",
  async (userId: any) => {
    try {
      const res = await Get(`address?userID=${userId}`);
      return res;
    } catch (error: any) {
      console.error(error);
    }
  }
);
export const GetAddressById: any = createAsyncThunk(
  "GetAddressById",
  async (id: any) => {
    try {
      const res = await GetByID(`GetAddressById/${id}`);
      return res;
    } catch (error: any) {
      console.error(error);
    }
  }
);
