const mongoose = require('mongoose');
const env = require('./.env')



class databaseService {

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
    ratings: { popularity: Number, average: Number, count: Number },
    details: {
      overview: String,
      genres: [{ id: Number, name: String }]
    }
  });

  constructor() {
    this.dbConnect()
  }

  dbConnect = async () => {
    await mongoose.connect(`mongodb://${env.mongo.username}:${env.mongo.password}@web3cluster.tilggpf.mongodb.net/test`);
  }
  getMovies = (limit, callback) => {
    const Movies = mongoose.model('Movies', this.movieSchema);
    const results = limit >= 0 ? Movies.find({}).all().limit(limit) : Movies.find().all();

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesById = (movieId, callback) => {
    const Movies = mongoose.model('Movies', this.movieSchema);
    const results = Movies.find({ id: movieId });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesTMDB = (movieId, callback) => {
    const Movies = mongoose.model('Movies', this.movieSchema);
    const results = Movies.find({ tmdb_id: movieId });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }

  //TODO: Figure out date to year
  getMoviesByYear = (minYear, maxYear, callback) => {
    const Movies = mongoose.model('Movies', this.movieSchema);
    const results = Movies.find({ year: movieId });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesByRating = (minRating, maxRating, callback) => {
    const Movies = mongoose.model('Movies', this.movieSchema);
    const results = Movies.find({ rating: { $gt: minRating, $lt: maxRating } });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesByTitle = (searchTerm, callback) => {
    const Movies = mongoose.model('Movies', this.movieSchema);
    const results = Movies.find({ title: { $regex: `/.+${searchTerm}.+/` } });

    if (results.length === 0) {
      results.push({ "error": "No results" });
    }
    callback(results);
  }
  getMoviesByGenre = (genre, callback) => {

  }
}


module.exports = databaseService;
