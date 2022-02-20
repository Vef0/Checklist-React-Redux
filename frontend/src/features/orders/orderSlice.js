import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import orderService from './orderService'

const initialState = {
  orders: [],
  order: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create a new order
export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.createOrder(orderData, token)
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all orders
export const getOrders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.getOrders(token)
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user order
export const getOrder = createAsyncThunk(
  'orders/get',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.getOrder(orderId, token)
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Close order
export const closeOrder = createAsyncThunk(
  'orders/close',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.closeOrder(orderId, token)
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // For create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // For get all orders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // For get order
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closeOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders.map((order) =>
          order._id === action.payload._id
          ? (order.status = 'closed')
          : order
        )
      })
  }
})

export const {reset} = orderSlice.actions
export default orderSlice.reducer