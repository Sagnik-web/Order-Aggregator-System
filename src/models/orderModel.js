const db = require('../config/db');

const OrderModel = {
  // Create a new order
  async createOrder(productId, quantity, status = 'PENDING') {
    const result = await db.query(
      'INSERT INTO orders (product_id, quantity, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [productId, quantity, status]
    );
    return result.rows[0];
  },

  // Update the status of an order
  async updateStatus(orderId, status) {
    const result = await db.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, orderId]
    );
    return result.rows[0];
  },

  // Get an order by ID
  async getOrderById(orderId) {
    const result = await db.query(
      'SELECT * FROM orders WHERE id = $1',
      [orderId]
    );
    return result.rows[0];
  },

  // List all orders
  async getAllOrders() {
    const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    return result.rows;
  }
};

module.exports = OrderModel;
