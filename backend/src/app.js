const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Aggiungi questo

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

// Configura il percorso statico per la directory uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Aggiungi questo

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const infrastructureRoutes = require('./routes/infrastructure');
const estimateRoutes = require('./routes/estimate');
const pageRoutes = require('./routes/page');
const bookingRoutes = require('./routes/booking');
const pageTypeRoutes = require('./routes/pageType');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/infrastructure', infrastructureRoutes);
app.use('/estimates', estimateRoutes);
app.use('/pages', pageRoutes);
app.use('/bookings', bookingRoutes);
app.use('/pageTypes', pageTypeRoutes);

module.exports = app;
