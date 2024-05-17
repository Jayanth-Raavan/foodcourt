import { createSlice } from "@reduxjs/toolkit";
import {
  AddUserCart,
  DeleteItem,
  DeleteItembyId,
  EmptyCart,
  GetUserCart,
  UpdateUserCart,
} from "../Action/CartAction";

interface CartItem {
  itemName: string;
  imgURL: number;
  price: number;
  itemId: number;
  cartSize: number;
  userId: any;
}

interface CartState {
  isLoading: boolean;
  cartData: Record<string, CartItem>;
  isError: boolean;
  cartSize: number;
  userCart: any;
  addressId: any
}

const initialState: CartState = {
  isLoading: false,
  cartData: {},
  isError: false,
  cartSize: 0,
  userCart: null,
  addressId: null
};

export const CartSliceReducer = createSlice({
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
    },
    EMPTY_CART: (state) => {
      return {
        ...state,
        cartData: {},
        cartSize: 0,
        userCart: null,
      };
    },
  },
  extraReducers: (builder: any) => {
    // ============= [ ADD TO CART ]================
    builder.addCase(AddUserCart.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(AddUserCart.fulfilled, (state: any, action: any) => {
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
    });
    builder.addCase(AddUserCart.rejected, (state: any) => {
      state.isError = true;
    });
    // ============= [ UPDATE USER CART ] ==================
    builder.addCase(UpdateUserCart.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateUserCart.fulfilled, (state: any, action: any) => {
      console.log("ACTIONS__________", action)
    });
    builder.addCase(UpdateUserCart.rejected, (state: any) => {
      state.isError = true;
    });
    // ============= [ GET CART ]================
    builder.addCase(GetUserCart.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(GetUserCart.fulfilled, (state: any, action: any) => {
      if (action?.payload?.length > 0) {
        const data = action?.payload;
        data?.map((item: any) => {
          const { itemName } = item;
          if (state.cartData[itemName]) {
            state.cartData[itemName].cartSize += 1;
          } else {
            state.cartData[itemName] = {
              ...item,
              cartSize: 1,
            };
          }
          state.cartSize += 1;
        });
      }
    });
    builder.addCase(GetUserCart.rejected, (state: any) => {
      state.isError = true;
    });
    // ============= [ DELETE ITEM FROM CART ]================
    builder.addCase(DeleteItembyId.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteItembyId.fulfilled, (state: any, action: any) => {
      const { itemName } = action.payload;
      if (state.cartData[itemName]) {
        state.cartData[itemName].cartSize -= 1;
        if (state.cartData[itemName].cartSize === 0) {
          delete state.cartData[itemName];
        }
        state.cartSize -= 1;
      }
    });
    builder.addCase(DeleteItembyId.rejected, (state: any) => {
      state.isError = true;
    });
    // ============= [ DELETE ITEM BY ID FROM CART ]================
    builder.addCase(DeleteItem.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteItem.fulfilled, (state: any, action: any) => {
      const { itemName } = action.payload;
      if (state.cartData[itemName]) {
        state.cartSize -= state.cartData[itemName].cartSize;
        delete state.cartData[itemName];
      }
    });
    builder.addCase(DeleteItem.rejected, (state: any) => {
      state.isError = true;
    });
    // ================[ EMPTY CART ] ====================
    builder.addCase(EmptyCart.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(EmptyCart.fulfilled, (state: any) => {
      state.cartData={};
      state.cartSize=0;
      state.userCart=null;
    });
    builder.addCase(EmptyCart.rejected, (state: any) => {
      state.isError = true;
    });
  },
});

export const { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM, EMPTY_CART } =
  CartSliceReducer.actions;

export default CartSliceReducer.reducer;
