const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importa il pacchetto CORS

const app = express();

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3001', // URL del frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Se necessario
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const infrastructureRoutes = require('./routes/infrastructure');
const estimateRoutes = require('./routes/estimate');
const pageRoutes = require('./routes/page');
const bookingRoutes = require('./routes/booking');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/infrastructure', infrastructureRoutes);
app.use('/estimates', estimateRoutes);
app.use('/pages', pageRoutes);
app.use('/bookings', bookingRoutes);

module.exports = app;
