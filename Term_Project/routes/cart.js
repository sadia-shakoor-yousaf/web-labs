const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/cart", (req, res) => {
  const cart = req.session.cart || {};
  const items = Object.entries(cart).map(([id, item]) => ({
    ...item,
    id, // ← include ID for remove/update
  }));

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  res.render("site/cart", {
    items,
    total,
  });
});

router.post("/add-to-cart/:id", async (req, res) => {
  const productId = req.params.id;
  const cart = req.session.cart || {};

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("Product not found");

    if (!cart[productId]) {
      cart[productId] = {
        title: product.title,
        price: product.price,
        quantity: 1,
      };
    } else {
      cart[productId].quantity += 1;
    }

    req.session.cart = cart;
    req.flash("success", "Item added to cart");
    res.redirect("/cart"); // or to /cart
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

router.post("/cart/update", (req, res) => {
  const updatedQuantities = req.body.quantities;
  const cart = req.session.cart;

  if (!cart) return res.redirect("/cart");

  for (let productId in updatedQuantities) {
    const quantity = parseInt(updatedQuantities[productId]);
    if (quantity > 0) {
      cart[productId].quantity = quantity;
    }
  }

  req.session.cart = cart;
  res.redirect("/cart");
});

router.get("/cart/remove/:id", (req, res) => {
  const productId = req.params.id;
  if (req.session.cart && req.session.cart[productId]) {
    delete req.session.cart[productId];
  }
  res.redirect("/cart");
});

module.exports = router;
