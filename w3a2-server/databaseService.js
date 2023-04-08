const mongoose = require('mongoose');
require('dotenv').config();
dbConnector = require('./mongoConnector')

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
    release_date: Date,
    title: String,
    runtime: Number,
    revenue: Number,
    tagline: String,
    poster: String,
    backdrop: String,
    ratings: this.ratingsSchema,
    details: this.movieDetailsSchema
  });

  constructor() {
    dbConnector.connect('Movies');
  }
  getMovies = async (limit, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await (limit >= 0 ? Movies.find().limit(limit) : Movies.find());
    if (results.length === 0) {
      results.push({ "error": "No movies match the provided criteria" });
    }
    callback(results);
  }
  getMoviesById = async (movieId, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await Movies.find({ id: movieId });

    if (results.length === 0) {
      results.push({ "error": "No movies match the provided criteria" });
    }
    callback(results);
  }
  getMoviesTMDB = async (movieId, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const results = await Movies.find({ tmdb_id: movieId });

    if (results.length === 0) {
      results.push({ "error": "No movies match the provided criteria" });
    }
    callback(results);
  }

  //TODO: Figure out date to year
  getMoviesByYear = async (minYear, maxYear, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const fromDate = `${minYear}-01-01`;
    const thruDate = `${Number(maxYear) + 1}-01-01`;
    if (fromDate > thruDate) {
      callback([{ "error": "Starting year cannot exceed ending year" }])
    } else {
      const results = await Movies.find({ release_date: { $gte: fromDate, $lt: thruDate } });

      if (results.length === 0) {
        results.push({ "error": "No movies match the provided criteria" });
      }
      callback(results);
    }
  }
  getMoviesByRating = async (minRating, maxRating, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);

    if (minRating > maxRating) {
      callback([{ "error": "Minimum rating cannot exceed maximum rating" }])
    } else {
      const results = await Movies.find({ "ratings.average": { $gte: minRating, $lte: maxRating } });

      if (results.length === 0) {
        results.push({ "error": "No movies match the provided criteria" });
      }
      callback(results);
    }
  }
  getMoviesByTitle = async (searchTerm, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const searchRegEx = new RegExp(searchTerm, 'i');
    const results = await Movies.find({ title: searchRegEx });

    if (results.length === 0) {
      results.push({ "error": "No movies match the provided criteria" });
    }
    callback(results);
  }
  getMoviesByGenre = async (genre, callback) => {
    const Movies = mongoose.model('movies', this.movieSchema);
    const searchRegEx = new RegExp(genre, 'i');
    const results = await Movies.find({ "details.genres.name": searchRegEx });

    if (results.length === 0) {
      results.push({ "error": "No movies match the provided criteria" });
    }
    callback(results);
  }
}


module.exports = databaseService;
