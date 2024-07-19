const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const infrastructureRoutes = require('./routes/infrastructure');
const estimateRoutes = require('./routes/estimate');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/infrastructure', infrastructureRoutes);
app.use('/estimates', estimateRoutes);

module.exports = app;
