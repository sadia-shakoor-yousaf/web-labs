module.exports = function (req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    res.locals.isAdmin = true;

    req.flash = function (type, message) {
      req.session.flash = { type, message };
    };

    if (req.session.flash) {
      res.locals.flash = req.session.flash;
      req.session.flash = null;
    }
    return next();
  }

  req.flash('error', "Please log in to access the admin area.")
  res.redirect("/");
};
