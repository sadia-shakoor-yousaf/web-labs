const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isAdmin, async (req, res) => {
  res.render('admin/dashboard');
});

module.exports = router;
