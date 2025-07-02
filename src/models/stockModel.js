const db = require('../config/db');

const StockModel = {
  // Get stock for a product with row-level lock for order processing
  async getStockForUpdate(productId, client) {
    const result = await client.query(
      'SELECT * FROM stock WHERE product_id = $1 FOR UPDATE',
      [productId]
    );
    return result.rows[0];
  },

  // Reduce stock quantity
  async reduceStock(productId, quantity, client) {
    await client.query(
      'UPDATE stock SET quantity = quantity - $1 WHERE product_id = $2',
      [quantity, productId]
    );
  },

  // Upsert stock from vendor (aggregation)
  async upsertStock(productId, quantity) {
    await db.query(
      `INSERT INTO stock (product_id, quantity)
       VALUES ($1, $2)
       ON CONFLICT (product_id)
       DO UPDATE SET quantity = EXCLUDED.quantity`,
      [productId, quantity]
    );
  },

  // Get all local stock
  async getAllStock() {
    const result = await db.query('SELECT * FROM stock ORDER BY product_id');
    return result.rows;
  }
};

module.exports = StockModel;
