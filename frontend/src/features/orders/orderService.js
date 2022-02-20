import axios from "axios";

const API_URL = '/api/orders/';

// Create a new order
const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// Get user orders
const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get user order
const getOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + orderId, config);
  return response.data;
};

// Close order
const closeOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(
    API_URL + orderId,
    {status: 'closed'},
    config
  );

  return response.data;
};


const ticketService = {
  createOrder,
  getOrders,
  getOrder,
  closeOrder
};

export default ticketService;
