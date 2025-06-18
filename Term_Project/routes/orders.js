const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middlewares/authMiddleware'); // same one you use for home

// Show orders of logged-in user
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const orders = await Order.find({ userId });

    res.render('site/myOrders', {
      orders,
    });
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    req.flash("danger", "Something went wrong.");
    res.redirect('/');
  }
});

module.exports = router;
