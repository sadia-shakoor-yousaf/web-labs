const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
// Fetch Products
router.get('/', async (req, res) => {
  const products = await Product.find();
  // console.log(products);
  res.render('site/index', { products });
});

module.exports = router;
