const mongoose = require('mongoose');

const Order = mongoose.model('Order');

exports.get = async (data) => {
  const res = await Order.find({}, 'number status customer items')
    .populate('customer')
    .populate('items.product');
  return res;
};

exports.create = async (data) => {
  const order = new Order(data);
  await order.save();
};
