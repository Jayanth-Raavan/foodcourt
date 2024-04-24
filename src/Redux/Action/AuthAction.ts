import { createAsyncThunk } from "@reduxjs/toolkit";
import { Get, Post } from "../../Service/MasterService";

//http://localhost:4000/users
export const AddUsers: any = createAsyncThunk("AddUsers",async (payload:any)=>{
   try{
    const res = await Post("users", payload);
    return res;
   }
   catch(err:any){
    console.error(err)
   }
});
export const GetUsers: any = createAsyncThunk("GetUsers",async ()=>{
    try{
     const res = await Get("users");
     return res;
    }
    catch(err:any){
     console.error(err)
    }
 });