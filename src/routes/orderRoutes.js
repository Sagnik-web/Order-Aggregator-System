const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place a new order
router.post('/', orderController.placeOrder);
router.patch('/status/:id',orderController.updateOrder)
router.get('/',orderController.getAllOrders)
router.get('/:id',orderController.getSingleOrder)

module.exports = router;
