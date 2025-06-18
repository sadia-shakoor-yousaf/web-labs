const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const isAdmin = require('../middlewares/isAdmin'); 

router.get('/my-complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.session.user.id }).sort({ submittedAt: -1 });
    res.render('site/my-complaints', { complaints });
  } catch (err) {
    console.error(err);
    req.flash("danger", "Unable to fetch complaints.");
    res.redirect('/');
  }
});

// ADMIN VIEW: See all complaints
router.get('/admin/complaints', isAdmin, async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('userId', 'name email') 
      .sort({ submittedAt: -1 });
    res.render('admin/complaints', { complaints });
  } catch (err) {
    console.error(err);
    req.flash("danger", "Unable to fetch complaints.");
    res.redirect('/');
  }
});

router.get('/contact', (req, res) => {
  res.render('site/contact'); // layout is optional if global layout is used
});

router.post('/contact', async (req, res) => {
  const { orderId, message } = req.body;

  if (!orderId || !message) {
    req.flash("danger", "All fields are required.");
    return res.redirect('/contact');
  }

  try {
    await Complaint.create({
      userId: req.session.user.id,
      orderId,
      message
    });

    req.flash("success", "Your complaint has been submitted.");
    res.redirect('/contact');
  } catch (err) {
    console.error(err);
    req.flash("danger", "Something went wrong. Please try again.");
    res.redirect('/contact');
  }
});

module.exports = router;

