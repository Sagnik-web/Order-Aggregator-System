const StockModel = require("../models/stockModel");

exports.getAllStock=async()=> {
    return await StockModel.getAllStock()
  }
