const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const leagues = require('./routes/api/leagues');
const teams = require('./routes/api/teams');
const twitterAccounts = require('./routes/api/twitterAccounts');
const tweets = require('./routes/api/tweets');

const app = express();

// Connect to the database
const database = require('./config/database.js');

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// API endpoint routes
app.use('/api/leagues', leagues);
app.use('/api/teams', teams);
app.use('/api/twitter_accounts', twitterAccounts);
app.use('/api/tweets', tweets);

// The "catch all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;
