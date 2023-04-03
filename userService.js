const mongoose = require('mongoose');
const env = require('./env')
const bcrypt = require("bcrypt");
const passport = require("passport")


class userService {

  membershipSchema = new mongoose.Schema({
    date_joined: Date,
    "last-update": Date,
    likes: Number
  });
  pictureSchema = new mongoose.Schema({
    large: String,
    thumbnail: String
  });
  userDetailsSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    city: String,
    country: String
  });
  userSchema = new mongoose.Schema({
    id: Number,
    details: this.userDetailsSchema,
    picture: this.pictureSchema,
    membership: this.membershipSchema,
    email: String,
    password_bcrypt: String,
    apikey: String,
    favorites: [Number]
  });

  opt = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'Movies'
  };
  db

  constructor() {
    this.dbConnect()
  }

  dbConnect = async () => {
    await mongoose.connect(`mongodb+srv://${env.mongo.username}:${env.mongo.password}@web3cluster.tilggpf.mongodb.net/Movies`, this.opt);
    console.log('Checking Mongo connection')
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function callback() {
      console.log("connected to mongo");
    });
  }

  hashPassword = (password, password_bcrypt) => {
    //todo: bcrypt
    let res = false;
    bcrypt.compare(password, password_bcrypt).then(result => res = result);
    return res;
  }

  login = async (username, password, callback) => {
    const Users = mongoose.model('users', this.movieSchema);
    const results = await Users.find({ email: username });
    if (results.length === 0) {
      callback({ "error": "No such user" });
    } else {

      //passport?
      if (this.hashPassword(password, results[0].password_bcrypt)) {
        this.user = results[0];
        return { "success": results[0].id }
      }
    }
  }
}


module.exports = userService;
