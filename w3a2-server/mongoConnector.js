const mongoose = require('mongoose');

//Connection setup
const connect = (dbName) => {
   const opt = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: dbName
   };
   mongoose.connect(`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_password}@${process.env.mongo_url}/${process.env.mongo_cluster}`, opt);
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function callback() {
   });
};

module.exports = {
   connect
};
