const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// defining the Express app
const app = express();


// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.get('/api/movies/', (req, res) => [
    databaseService.getUsers(function(data) {
        res.send(data);
    })
]);
app.get('/api/movies/limit/:userName', (req, res) => [
    databaseService.getUsers(function(data) {
        res.send(data);
    })
]);
app.get('/api/movies/:id', (req, res) => [
    databaseService.getUsers(function(data) {
        res.send(data);
    })
]);
app.get('/api/movies/tmdb/:id', (req, res) => [
  databaseService.getUsers(function(data) {
      res.send(data);
  })
]);
app.get('/api/movies/year/:minYear/:maxYear', (req, res) => [
  databaseService.getUsers(function(data) {
      res.send(data);
  })
]);
app.get('/api/movies/ratings/:minRating/:maxRating', (req, res) => [
  databaseService.getUsers(function(data) {
      res.send(data);
  })
]);
app.get('/api/movies/title/:text', (req, res) => [
  databaseService.getUsers(function(data) {
      res.send(data);
  })
]);
app.get('/api/movies/genre/:name', (req, res) => [
  databaseService.getUsers(function(data) {
      res.send(data);
  })
]);

app.use(express.static(__dirname + '/static/'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/w3a2-client/build/index.html'));
});
// starting the server
app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on port ${process.env.PORT || 3001}`);
    apiService.scheduleTimer();
});
