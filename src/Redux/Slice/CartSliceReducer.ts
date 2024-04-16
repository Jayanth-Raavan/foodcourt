import { createSlice } from "@reduxjs/toolkit";
import { GetCartItems } from "../Action/CartAction";

interface CartItem {
  itemName: string;
  imgURL: number;
  price: number;
  itemId: number;
  cartSize: number;
}

interface CartState {
  isLoading: boolean;
  cartData: Record<string, CartItem>;
  isError: boolean;
  cartSize: number;
}

const initialState: CartState = {
  isLoading: false,
  cartData: {},
  isError: false,
  cartSize: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_ITEM: (state, action) => {
      const { itemName } = action.payload;
      if (state.cartData[itemName]) {
        state.cartData[itemName].cartSize += 1;
      } else {
        state.cartData[itemName] = {
          ...action.payload,
          cartSize: 1,
        };
      }
      state.cartSize += 1;
    },
    REMOVE_ITEM: (state, action) => {
      const { itemName } = action.payload;
      if (state.cartData[itemName]) {
        state.cartData[itemName].cartSize -= 1;
        if (state.cartData[itemName].cartSize === 0) {
          delete state.cartData[itemName];
        }
        state.cartSize -= 1;
      }
    },
    DELETE_ITEM: (state, action) => {
      const { itemName } = action.payload;
      if (state.cartData[itemName]) {
        state.cartSize -= state.cartData[itemName].cartSize;
        delete state.cartData[itemName];
      }
      // 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartData = action.payload;
    });
    builder.addCase(GetCartItems.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM } = cartSlice.actions;

export default cartSlice.reducer;
