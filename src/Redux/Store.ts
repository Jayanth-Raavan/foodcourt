import { configureStore } from '@reduxjs/toolkit'
import CartSliceReducer from './Slice/CartSliceReducer'
import VegSliceReducer from './Slice/VegSliceReducer'

export const Store = configureStore({
  reducer: {
    cart_reducer: CartSliceReducer,
    veg_items_reducer: VegSliceReducer
  },
})