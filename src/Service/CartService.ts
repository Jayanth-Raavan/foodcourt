import axios from "axios";

export const GetCartItemsS = axios.get("http://localhost:4000/veg").then((res:any)=>{
    return res.data;
});

export const GetVegItemsS = axios.get("http://localhost:4000/veg").then((res:any)=>{
    return res.data;
})