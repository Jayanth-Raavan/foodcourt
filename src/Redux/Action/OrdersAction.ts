import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetByID, Post, Put } from "../../Service/MasterService";

//================ [MANAGE ORDERS] ===========================//
export const AddOrder: any = createAsyncThunk(
  "AddOrder",
  async (payload: any) => {
    console.log("PAYLOAD_________", payload)
    const response = await Post("orders_history", payload);
    return response;
  }
);

export const UpdateOrder: any = createAsyncThunk(
  "UpdateOrder",
  async (payload: any) => {
    const response = await Put("orders_history", payload);
    console.log("RES________ put ", response)
    return response;
  }
);
export const GetOrders: any = createAsyncThunk(
  "GetOrders",
  async (userId: any) => {
    const response = await GetByID("orders_history", `?userID=${userId}`);
    return response;
  }
);
