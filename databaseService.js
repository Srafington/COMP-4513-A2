const mongoose = require('mongoose');
const env = require('./env')


class databaseService {

  ratingsSchema = new mongoose.Schema({
    popularity: Number,
    average: Number,
    count: Number
  });
  genresSchema = new mongoose.Schema({
     id: Number, 
     name: String 
  });
  movieDetailsSchema = new mongoose.Schema({
    overview: String,
      genres: [this.genresSchema]
  });
  movieSchema = new mongoose.Schema({
    id: Number,
    tmdb_id: Number,
    imdb_id: String,
    release_date: String,
    title: String,
    runtime: Number,
    revenue: Number,
    tagline: String,
    poster: String,
    backdrop: String,
    ratings: this.ratingsSchema,
    details: this.movieDetailsSchema
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
  getMovies = async (limit, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await (limit >= 0 ? Movies.find().limit(limit) : Movies.find());
    // console.log(mongoose.connection.collections)
    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesById = async (movieId, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await Movies.find({ id: movieId });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesTMDB = async (movieId, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await Movies.find({ tmdb_id: movieId });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }

  //TODO: Figure out date to year
  getMoviesByYear = async (minYear, maxYear, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await Movies.find({ year: movieId });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesByRating = async (minRating, maxRating, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await Movies.find({ rating: { $gt: minRating, $lt: maxRating } });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesByTitle = async (searchTerm, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await Movies.find({ title: { $regex: `/.+${searchTerm}.+/` } });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesByGenre = async (genre, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await Movies.find({ title: { $regex: `/.+${searchTerm}.+/` } });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
}


module.exports = databaseService;
