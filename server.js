const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const databaseService = require('./w3a2-server/databaseService');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const passport = require('passport');
const helper = require('./w3a2-server/helper');

const app = express();

// Express session
app.use(cookieParser('oreos'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// use express flash, which will be used for passing messages
app.use(flash());

// set up the passport authentication
require('./w3a2-server/auth.js');

// defining the Express app

const dbs = new databaseService();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

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

app.post('/api/createUser', helper.ensureAuthenticated, async (req, res) => {
    let user = {
        userName: req.body.userName,
        name: req.body.name,
    }
});


app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('error') });
});
app.post('/login', async (req, resp, next) => {
    // use passport authentication to see if valid login
    passport.authenticate('localLogin',
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, resp, next);
});
app.get('/logout', (req, resp) => {
    req.logout();
    req.flash('info', 'You were logged out');
    resp.render('login', { message: req.flash('info') });
});



// Static hosting goes last

app.use(express.static(__dirname + '/static/'));
app.get('/*', helper.ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname + '/w3a2-client/build/index.html'));
});
// starting the server
app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on port ${process.env.PORT || 3001}`);
});
