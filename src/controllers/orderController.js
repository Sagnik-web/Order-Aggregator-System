const orderService = require('../services/orderService');

exports.placeOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const result = await orderService.handleOrder(productId, quantity);
    res.status(200).json({ message: 'Order placed', orderId: result.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.updateOrder = async (req, res) => {
  const {id}= req.params
  const { status } = req.body;
  try {
    const result = await orderService.updateStatus(id,status);
    res.status(200).json({ message: 'Order Status Updated Successfully.'});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getSingleOrder = async (req,res)=>{
  const {id} = req.params
  try {
    const result = await orderService.getOrderById(id);
    res.status(200).json({ message: 'Order Found Successfully.', order:result});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


exports.getAllOrders = async (req,res)=>{
  try {
    const result = await orderService.getAllOrders();
    res.status(200).json({ message: 'Orders Found Successfully.', orders:result});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}