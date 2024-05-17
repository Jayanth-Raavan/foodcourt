import { configureStore } from '@reduxjs/toolkit'
import VegStartersSliceReducer from './Slice/VegStartersSliceReducer'
import NonVegStartersSliceReducer from './Slice/NonVegStartersSliceReducer'
import AuthSliceReducer from './Slice/AuthSliceReducer'
import AddressSliceReducer from './Slice/AddressSliceReducer'
import CartSliceReducer from './Slice/CartSliceReducer'
import OrdersSliceReducer from './Slice/OrdersSliceReducer'

export const Store = configureStore({
  reducer: {
    cart_reducer: CartSliceReducer,
    veg_starters_reducer: VegStartersSliceReducer,
    non_veg_starters_reducer: NonVegStartersSliceReducer,
    auth_slice_reducer: AuthSliceReducer,
    address_slice_reducer: AddressSliceReducer,
    orders_slice_reducer: OrdersSliceReducer
  },
})