const { getAllStock } = require("../services/stockService");


exports.getAllStocks = async (req, res) => {
  try {
    const stock = await getAllStock();
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
};
