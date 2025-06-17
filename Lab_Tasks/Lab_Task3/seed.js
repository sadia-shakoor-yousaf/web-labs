const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Percival')
  .then(async () => {
    console.log('Connected to DB');

    // Clear previous data
    await User.deleteMany({});
    await Order.deleteMany({});

    const usersData = [
      { email: "alice@example.com", password: "alice123" },
      { email: "bob@example.com", password: "bob12345" },
      { email: "charlie@example.com", password: "charlie789" }
    ];

    const productNames = [
      "Vintage Denim Jacket",
      "Slim Fit Chinos",
      "Cotton Graphic T-Shirt",
      "Hooded Sweatshirt",
      "Linen Summer Shirt",
      "Classic Leather Belt",
      "Casual Sneakers",
      "Woolen Overcoat",
      "Corduroy Pants"
    ];

    let productIndex = 0;

    for (let userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        email: userData.email,
        password: hashedPassword
      });

      for (let i = 0; i < 3; i++) {
        const item = {
          productName: productNames[productIndex % productNames.length],
          quantity: 1 + i,
          price: 1000 * (i + 1)
        };
        const totalAmount = item.price * item.quantity;

        await Order.create({
          userId: user._id,
          items: [item],
          totalAmount,
          status: 'Processing'
        });

        productIndex++;
      }

      // console.log(`User: ${user.email}, Password: ${userData.password}`);
    }

    console.log("Seeding complete ✅");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("DB Connection error:", err);
  });
