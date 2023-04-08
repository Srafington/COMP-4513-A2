const mongoose = require('mongoose');
require('dotenv').config();

//Connection setup
const connect = (dbName) => {
   const opt = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: dbName
   };
   mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_CLUSTER}`, opt);
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function callback() {
   });
};

module.exports = {
   connect
};
