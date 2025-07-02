const express = require('express');
const app = express();

app.get('/vendorA/stock', (req, res) => {
  res.json([{ productId: 1, quantity: 50 }, { productId: 2, quantity: 100 }]);
});

app.listen(5001, () => console.log('VendorA API running on 5001'));
