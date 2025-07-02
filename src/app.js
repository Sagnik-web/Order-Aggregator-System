const express = require('express');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
const stockRoutes = require('./routes/stockRouters');
const rabbit = require('./config/rabbitmq');
const VendorService = require('./services/vendorService');

dotenv.config();

const app = express();
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('✅ Distributed Order Aggregator API is running.');
});

// Routes
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/stock', stockRoutes);

// Start server
const PORT = process.env.PORT ;

(async () => {
  try {
    // Connect to RabbitMQ
    await rabbit.connect();
    console.log('Connected to RabbitMQ');

    // Optionally sync vendor stock at startup
    await VendorService.fetchAndSyncAllVendorStock();
    console.log('Vendor stock synced on startup');

    await rabbit.getFromQueue('orders');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start application:', err.message);
    process.exit(1);
  }
})();
