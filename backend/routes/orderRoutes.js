const express = require('express');
const router = express.Router();
const {getOrders, getOrder, createOrder, deleteOrder, updateOrder} = require('../controllers/orderController');

const {protect} = require('../middleware/authMiddleware');

// Re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:orderId/notes', noteRouter);

router.route('/').get(protect, getOrders).post(protect, createOrder);

router
  .route('/:id')
  .get(protect, getOrder)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder)


module.exports = router;