import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/orders/orderSlice'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    notes: noteReducer
  },
});
