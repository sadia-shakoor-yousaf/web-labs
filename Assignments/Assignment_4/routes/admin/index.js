const express = require('express');
const router = express.Router();

const ordersRoutes = require('./orders');
const productsRoutes = require('./products');
const dashboardRoute = require('./dashboard');

router.use('/orders', ordersRoutes);
router.use('/products', productsRoutes);
router.use('/dashboard', dashboardRoute);

module.exports = router;
