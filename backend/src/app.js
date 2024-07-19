const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const indexRoute = require('./routes/index');

app.use('/', indexRoute);

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create tables, shutting down...', err);
    process.exit(1);
  });

module.exports = app;
