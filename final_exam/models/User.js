const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (inputPwd) {
  return bcrypt.compare(inputPwd, this.password);
};

module.exports = mongoose.model('User', userSchema);
