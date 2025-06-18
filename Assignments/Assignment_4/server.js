let express = require('express');
let mongoose = require('mongoose');
let expressLayout = require("express-ejs-layouts");
let session = require("express-session");
const sessionAuth = require('./middlewares/sessionAuth');
const requireLogin = require('./middlewares/authMiddleware');

let server = express();

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(expressLayout)
server.use(express.urlencoded({ extended: true }));

// Session setup
server.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Flash middleware
server.use(sessionAuth);

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/Percival').then(() => {
    console.log('connected');
});

// Routes
const prodRoutes = require('./routes/fetchProduct');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin/index');
const aboutRoute = require('./routes/about');
const cartRoute = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');

server.use('/', authRoutes);
server.use('/', aboutRoute);

server.use(requireLogin);

server.use('/', prodRoutes);
server.use('/', orderRoutes);
server.use('/', cartRoute);
server.use('/checkout', checkoutRoutes);

server.use('/admin', adminRoutes);


server.listen(8000, () => {
    console.log('heyy!!');
});