const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin');
const Product = require('../../models/Product');

// Show add form
router.get('/add', isAdmin, (req, res) => {
  res.render('admin/addProduct');
});

// Handle add product
router.post('/add', isAdmin, async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  await Product.create({ title, price, description, imageUrl,  imageUrl});
  req.flash('success', 'Product added.');
  res.redirect('/admin/products/list');
});

// List all products
router.get('/list', isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render('admin/products', { products });
});

// Show edit form
router.get('/edit/:id', isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/editProduct', { product });
});

// Handle update
router.post('/edit/:id', isAdmin, async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    title,
    price,
    description,
    imageUrl,
  });
  req.flash('success', 'Product updated.');
  res.redirect('/admin/products/list');
});

// Handle delete
router.post('/delete/:id', isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash('success', 'Product deleted.');
  res.redirect('/admin/products/list');
});

module.exports = router;
