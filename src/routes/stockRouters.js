const express = require('express');
const { getAllStocks } = require('../controllers/stockController');
const router = express.Router();

router.get('/', getAllStocks);

module.exports = router;
