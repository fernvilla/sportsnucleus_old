require('dotenv').config();

const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');

const leagues = require('./routes/api/leagues');
const teams = require('./routes/api/teams');
const twitterAccounts = require('./routes/api/twitterAccounts');
const tweets = require('./routes/api/tweets');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

const app = express();

// Connect to the database
require('./config/database.js');

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// API endpoint routes
app.use('/api/leagues', leagues);
app.use('/api/teams', teams);
app.use('/api/twitter_accounts', twitterAccounts);
app.use('/api/tweets', tweets);
app.use('/api/users', users);
app.use('/api/profile', profile);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// The "catch all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Run server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
