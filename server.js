const express = require('express');
const cors = require('cors');
const databaseService = require('./w3a2-server/databaseService');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const passport = require('passport');
const helper = require('./w3a2-server/helper');

const app = express();

// Express setup
app.use(cookieParser('oreos'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set up EJS views location and set EJS as the view engine
app.set('views', './w3a2-client'); 
app.set('view engine', 'ejs');

// Link authentication resources
require('./w3a2-server/auth.js');

// Database object, because that's how I did it. It works and I'm not changing it
const dbs = new databaseService();

// We need to use this or the login form won't be readable in express
app.use(express.urlencoded({
    extended: true
}));

// enabling CORS for all requests
app.use(cors());

// API access methods
app.get('/api/movies/', helper.ensureAuthenticated, (req, res) => {
    dbs.getMovies(-1, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/limit/:limit', helper.ensureAuthenticated, (req, res) => {
    const limit = req.params.limit;
    dbs.getMovies(limit, function (data) {
        res.send(data);
    },)
});
// No paintings here, but I can get you a movie
app.get('/api/movies/:id', helper.ensureAuthenticated, (req, res) => {
    const movieId = req.params.id;
    dbs.getMoviesById(movieId, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/tmdb/:id', helper.ensureAuthenticated, (req, res) => {
    const movieId = req.params.id;
    dbs.getMoviesTMDB(movieId, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/year/:minYear/:maxYear', helper.ensureAuthenticated, (req, res) => {
    const minYear = req.params.minYear;
    const maxYear = req.params.maxYear;
    dbs.getMoviesByYear(minYear, maxYear, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/ratings/:minRating/:maxRating', helper.ensureAuthenticated, (req, res) => {
    const minRating = req.params.minRating;
    const maxRating = req.params.maxRating;
    dbs.getMoviesByRating(minRating, maxRating, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/title/:text', helper.ensureAuthenticated, (req, res) => {
    const searchTerm = req.params.text;
    dbs.getMoviesByTitle(searchTerm, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/genre/:name', helper.ensureAuthenticated, (req, res) => {
    const genre = req.params.name;
    dbs.getMoviesByGenre(genre, function (data) {
        res.send(data);
    })
});

// User session management endpoints
app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('error') });
});
app.post('/login', async (req, res, next) => {

    passport.authenticate('localLogin',
        {
            successRedirect: '/',
            successFlash: true,
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
});
app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('info', 'You were logged out');
        res.render('login', { message: req.flash('info') });
      });
});


//-------------------------------------------------------------------------------
// Static hosting goes last due to catch-all

app.use(express.static(__dirname + '/w3a2-client/'));
app.get('/*', helper.ensureAuthenticated, (req, res) => {
    res.render('home.ejs', {user: req.user});
});
// starting the server
app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on port ${process.env.PORT || 3001}`);
});
