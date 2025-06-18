const express = require('express');
const router = express.Router();
// Fetch Products
router.get('/about', async (req, res) => {
  res.render('site/about');
});

module.exports = router;
