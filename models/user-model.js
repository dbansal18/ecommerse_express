const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    name: String,
    password: String,
    thumbnail: String,
    dob: String,
    gender: String,
    role: String,
    loginType: String,
    cart: [String]
},{
  usePushEach : true
});

const User = mongoose.model('user', userSchema);

module.exports = User;