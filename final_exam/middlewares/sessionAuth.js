async function sessionAuth(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.isAdmin = false;
  
  if (req.session.user) {
    res.locals.isAdmin = Boolean(
      req.session.user.roles?.find((r) => r === "admin")
    );
  } else {
    req.session.user = null;
  }

  req.flash = function (type, message) {
    req.session.flash = { type, message };
  };

  if (req.session.flash) {
    res.locals.flash = req.session.flash;
    req.session.flash = null;
  }

  res.locals.cart = req.session.cart || {};
  res.locals.cartCount = Object.values(res.locals.cart).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  next();
}

module.exports = sessionAuth;
