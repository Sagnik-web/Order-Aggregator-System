const express = require('express');
const app = express();

// Simulated VendorB stock data
const stockData = [
  { productId: 3, quantity: 60 },
  { productId: 4, quantity: 40 }
];

// API endpoint to return VendorB stock
app.get('/vendorB/stock', (req, res) => {
  res.json(stockData);
});

// Start VendorB mock server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`VendorB mock API running at http://localhost:${PORT}/vendorB/stock`);
});
