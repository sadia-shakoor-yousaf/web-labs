const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Percival')
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error("DB connection error", err));

// Clear existing data (optional)
async function seedProducts() {
  await Product.deleteMany({});

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const products = Array.from({ length: 15 }).map(() => ({
    title: faker.commerce.productName(),
    collab: faker.company.name(),
    price: faker.number.int({ min: 15000, max: 65000 }),
    imageDefault: '/images/default-image.avif',  // Placeholder; use your actual image path
    imageHover: '/images/hover-image.avif',      // Placeholder; use your actual image path
    sizes: faker.helpers.arrayElements(sizes, faker.number.int({ min: 3, max: 6 }))
  }));

  await Product.insertMany(products);
  console.log("15 fake products inserted.");
  mongoose.connection.close();
}

seedProducts();
