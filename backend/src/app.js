const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const indexRoute = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/', indexRoute);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Import models
const UserRole = require('./models/userRole');
const InfrastructureStatus = require('./models/infrastructureStatus');
const HeadQuarter = require('./models/headQuarter');
const Infrastructure = require('./models/infrastructure');
const PageType = require('./models/pageType');
const Page = require('./models/page');
const User = require('./models/user');
const Estimate = require('./models/estimate');
const Booking = require('./models/booking');

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
 