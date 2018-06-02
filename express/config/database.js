require('dotenv').config();

const mongoose = require('mongoose');
const chalk = require('chalk');

const uristring =
  process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/sportsnewsla';
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

mongoose.connect(uristring);

mongoose.connection
  .on('connected', () => {
    console.log(connected('Mongoose default connection is open to ', uristring));
  })
  .on('error', err => {
    console.log(error('Mongoose default connection has occured ' + err + ' error'));
  })
  .on('disconnected', () => {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      termination('Mongoose default connection is disconnected due to application termination')
    );
    process.exit(0);
  });
});

module.exports = mongoose;
