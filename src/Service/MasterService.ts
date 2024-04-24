import axios from "axios";
import { baseUrl } from "../environment";

export const Get: any = async (endpoint: any) => {
  const res = await axios.get(baseUrl + endpoint);
  return res?.data;
};
export const GetByID: any = async (endpoint: any, id: any) => {
  const res = await axios.get(baseUrl + endpoint + id);
  return res?.data;
};
export const Post: any = async (endpoint: any, payload: any) => {
  const res = await axios.post(baseUrl + endpoint, payload);
  return res?.data;
};
export const Put: any = async (endpoint: any, payload: any) => {
  const res = await axios.put(baseUrl + endpoint + `/${payload.id}`);
  return res.data;
};
//if cartData --> deletes item by itemId (can be multiple)
//userCart", `?itemId=${itemId}
// export const Delete: any = async (endpoint: any, item: any) => {
//   const getRes = await axios.get(baseUrl + endpoint);
//   if (getRes?.data?.length > 0) {
//     const items = await getRes?.data?.filter((i: any) => item?.itemId === i?.itemId);
//     const res = await items?.map((item:any)=>  axios.delete(baseUrl + endpoint + `/${item?.id}`));
//     return res?.data;
//   }
//   // const res = await axios.delete(baseUrl + endpoint + `?itemId=${item?.itemId}`);
//   // return res?.data;

// };

export const Delete = async (endpoint: any, item: any) => {
  try {
    const getRes = await axios.get(baseUrl + endpoint);
    const items = getRes?.data?.filter((i: any) => item?.itemId === i?.itemId);

    const deleteRequests = items.map(async (item: any) => {
      const res = await axios.delete(baseUrl + endpoint + `/${item.id}`);
      if (res.status === 200) {
        return item;
      } else {
        throw new Error(`Failed to delete item with ID ${item.id}`);
      }
    });

    const deletedItems = await Promise.all(deleteRequests);
    return deletedItems.filter((item) => item !== undefined);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const Delete1Item: any = async (endpoint: any, item: any) => {
  const getRes = await axios.get(baseUrl + endpoint);
  console.log("getALL", getRes, { item: item });
  if (getRes?.data?.length > 0) {
    const items = await getRes?.data?.filter(
      (i: any) => i?.itemName === item?.itemName
    );
    const res = await items?.find((item: any) =>
      axios.delete(baseUrl + endpoint + `/${item?.id}`)
    );
    return res;
  }
};
