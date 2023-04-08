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


userSchema.methods.isValidPassword = async function (formPassword) {
  const user = this;
  const hash = user.password_bcrypt;
  const compare = await bcrypt.compare(formPassword, hash);
  return compare;
}
userSchema.methods.getName = async function () {
  const user = this;
  const name = `${user.details.firstname} ${user.details.lastname}`;
  return name;
}

module.exports = mongoose.model('User', userSchema, 'users');
