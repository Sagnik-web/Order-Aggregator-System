const axios = require('axios');
const StockModel = require('../models/stockModel');

// Mocked vendor API endpoints
const vendors = [
  { name: 'VendorA', url: 'http://localhost:5001/vendorA/stock' },
  { name: 'VendorB', url: 'http://localhost:5002/vendorB/stock' }
];

const VendorService = {
  // Fetch stock from all vendors
  async fetchAndSyncAllVendorStock() {
    for (const vendor of vendors) {
      try {
        const response = await axios.get(vendor.url);
        const vendorStock = response.data;
        // console.log(vendorStock);
        for (const item of vendorStock) {
          console.log(item);
          await StockModel.upsertStock(item.productId, item.quantity);
        }

        console.log(`✅ Synced stock from ${vendor.name}`);
      } catch (err) {
        console.error(`❌ Failed To Connect Vendor ${vendor.name}, Error: `, err.message);
      }
    }
  }
};

module.exports = VendorService;
