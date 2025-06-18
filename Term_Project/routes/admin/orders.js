const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isAdmin, async (req, res) => {
  const orders = await Order.find().populate('userId', 'name');
  
  res.render('admin/orders', { orders });
});

module.exports = router;
