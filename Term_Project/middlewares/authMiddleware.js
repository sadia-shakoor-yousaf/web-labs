function requireLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('danger', 'Please log in to access this page.');
    return res.redirect('/login');
  }
  next();
}

module.exports = requireLogin;
