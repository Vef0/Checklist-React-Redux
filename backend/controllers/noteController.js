const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Order = require('../models/orderModel');

// @desc    Get all notes for a order
// @route   GET /api/orders/:orderId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found');
  }

  const order = await Order.findById(req.params.orderId);

  if (order.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuario no autorizado');
  }

  const notes = await Note.find({ order: req.params.orderId });

  res.status(200).json(notes);
})

// @desc    Create note for an order
// @route   POST /api/orders/:orderId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401)
    throw new Error('User not found');
  }

  const order = await Order.findById(req.params.orderId);

  if (order.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuario no autorizado');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    order: req.params.orderId,
    user: req.user.id
  });

  res.status(200).json(note);
})

module.exports = {
  getNotes,
  addNote
}