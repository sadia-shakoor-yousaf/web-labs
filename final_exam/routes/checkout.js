const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET checkout page
router.get('/', (req, res) => {
  const cart = req.session.cart || {};
  const user = req.session.user;

  if(!user){
    const items = Object.entries(cart).map(([id, item]) => ({
      ...item,
      id
    }));

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.render('site/checkout', { items, total });
  } else {
    req.flash("info", "Your cart is empty. Add something to the cart first.");
    res.redirect('/')
  }

});

// POST - Pay Later
router.post('/', async (req, res) => {
  const cart = req.session.cart || {};
  const user = req.session.user;

  if (!user) {
    req.flash("danger", "You must be logged in to place an order.");
    return res.redirect('/login');
  }

  if (Object.keys(cart).length === 0) {
    req.flash("danger", "Your cart is empty.");
    return res.redirect('/cart');
  }

  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Save the order details 
  const order = new Order({
    userId: user.id,
    items: items.map(item => ({
      productName: item.title,
      quantity: item.quantity,
      price: item.price
    })),
    totalAmount: total,
    status: 'Pending'
  });

  await order.save();

  req.session.cart = {}; // Clear cart after placing order

  res.render('site/thankyou', { user: user.name });
});

module.exports = router;
