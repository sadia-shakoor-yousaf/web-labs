const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isAdmin = require('../middlewares/isAdmin'); // Ensure you have this if needed elsewhere

// Show signup form
router.get('/signup', (req, res) => {
  res.render('site/signup', { layout: false });
});

// Signup logic
router.post('/signup', async (req, res) => {
  const {name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("danger", "Passwords do not match!");
    return res.redirect('/signup');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    req.flash("danger", "Email already in use!");
    return res.redirect('/signup');
  }

  await User.create({name, email, password });
  
  req.flash("success", "Account created successfully. Please log in.");
  res.redirect('/login');
});


// Show login form
router.get('/login', (req, res) => {
  res.render('site/login', { layout: false});
});

// Login logic
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.flash("danger", "Email not found.");
    return res.redirect('/login');
  }

  const match = await user.comparePassword(password);
  if (!match) {
    console.log(password);
    req.flash("danger", "Incorrect password.");
    return res.redirect('/login');
  }

  req.session.user = { id: user._id, email: user.email, isAdmin: user.isAdmin };
  
  req.flash("success", "Logged in successfully!");
  console.log("Login successful, redirecting..." + password);
  if (user.isAdmin) {
    return res.redirect('/admin/dashboard');
  } else {
    return res.redirect('/');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
