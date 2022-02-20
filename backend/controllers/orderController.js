const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Order = require('../models/orderModel');

// @desc  Get user orders
// @route GET /api/orders
// @access Private
const getOrders = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found');
  }

  const orders = await Order.find({ user: req.user.id });

  res.status(200).json(orders);
})

// @desc  Get user order
// @route GET /api/orders/:id
// @access Private
const getOrder = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found');
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404)
    throw new Error('Order not found');
  }

  if (order.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized');
  }

  res.status(200).json(order);
})

// @desc  Create new order
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const {product, description, nro_orden} = req.body

  if (!description) {
    res.status(400)
    throw new Error('La descripcion es obligatoria');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found');
  }

  const order = await Order.create({
    product,
    description,
    nro_orden,
    user: req.user.id,
    status: 'new'
  });

  res.status(201).json(order);
})

// @desc  Delete order
// @route DELETE /api/orders/:id
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found');
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404)
    throw new Error('Order not found');
  }

  if (order.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized');
  }

  await order.remove();

  res.status(200).json({ success: true });
})

// @desc  Update user order
// @route PUT /api/orders/:id
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found');
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404)
    throw new Error('Order not found');
  }

  if (order.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized');
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedOrder);
})

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder
}