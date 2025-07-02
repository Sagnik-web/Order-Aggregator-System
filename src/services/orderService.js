const db = require('../config/db');
const amqp = require('../config/rabbitmq');
const OrderModel = require('../models/orderModel');
const StockModel = require('../models/stockModel');

exports.handleOrder = async (productId, quantity) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

  
    const stock = await StockModel.getStockForUpdate(productId,client)

    if (!stock || stock.quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    await StockModel.reduceStock(productId,quantity,client)


    const order = await OrderModel.createOrder(productId,quantity)

    await amqp.sendToQueue(order);

    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};


exports.updateStatus= async(orderId, status)=> {
  return await OrderModel.updateStatus(orderId, status);
},

exports.getOrderById= async(orderId)=> {
  return await OrderModel.getOrderById(orderId);
},

exports.getAllOrders=async()=> {
  return await OrderModel.getAllOrders();
}
