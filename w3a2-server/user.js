const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// define a schema that maps to the structure of the data in MongoDB
const membershipSchema = new mongoose.Schema({
  date_joined: Date,
  "last-update": Date,
  likes: Number
});
const pictureSchema = new mongoose.Schema({
  large: String,
  thumbnail: String
});
const userDetailsSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  city: String,
  country: String
});
const userSchema = new mongoose.Schema({
  id: Number,
  details: userDetailsSchema,
  picture: pictureSchema,
  membership: membershipSchema,
  email: String,
  password_bcrypt: String,
  apikey: String,
  favorites: [Number]
});

module.exports = mongoose.model('User', userSchema, 'users');

userSchema.methods.isValidPassword = async function (formPassword) {
  const user = this;
  const hash = user.password;
  // Hashes the password sent by the user for login and checks if the 
  // digest stored in the database matches the one sent. Returns true 
  // if it does else false.
  const compare = await bcrypt.compare(formPassword, hash);
  return compare;
} 


