const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const databaseService = require('./databaseService';)

// defining the Express app
const app = express();


// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.get('/api/movies/', (req, res) => {
    databaseService.getMovies(-1, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/limit/:limit', (req, res) => {
    const limit = req.params.limit;
    databaseService.getMovies(limit, function (data) {
        res.send(data);
    }, )
});
app.get('/api/movies/:id', (req, res) => {
    const movieId = req.params.id;
    databaseService.getMoviesById(movieId, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/tmdb/:id', (req, res) => {
    const movieId = req.params.id;
    databaseService.getMoviesTMDB(movieId, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/year/:minYear/:maxYear', (req, res) => {
    const minYear = req.params.minYear;
    const maxYear = req.params.maxYear;
    databaseService.getMoviesByYear(minYear, maxYear, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/ratings/:minRating/:maxRating', (req, res) => {
    const minRating = req.params.minRating;
    const maxRating = req.params.maxRating;
    databaseService.getMoviesByRating(minRating, maxRating, function (data) {
        res.send(data);
    })
});
app.get('/api/movies/title/:text', (req, res) => {
    const searchTerm = req.params.text;
    databaseService.getMoviesByTitle(searchTerm , function (data) {
        res.send(data);
    })
});
app.get('/api/movies/genre/:name', (req, res) => {
    const genre = req.params.name;
    databaseService.getMoviesByGenre(genre , function (data) {
        res.send(data);
    })
});

app.post('/api/createUser', async (req, res) => {
    let user = {
        userName: req.body.userName,
        name: req.body.name,
    }
});






// Static hosting goes last

app.use(express.static(__dirname + '/static/'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/w3a2-client/build/index.html'));
});
// starting the server
app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on port ${process.env.PORT || 3001}`);
    apiService.scheduleTimer();
});
