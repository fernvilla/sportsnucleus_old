const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const db = mongoose.connection;

const app = express();

mongoose.connect('mongodb://localhost/sportsnucleus');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to db'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './../client/build')));

// API endpoints
app.use('/api/leagues', require('./routes/leagues'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/twitter_accounts', require('./routes/twitterAccounts'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + './../../client/build/index.html'));
});

module.exports = app;
