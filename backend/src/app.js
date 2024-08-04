// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const path = require('path');
const { authenticate } = require('./middleware/authMiddleware');

const app = express();

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura il percorso statico per la directory uploads con autenticazione
app.use('/uploads', authenticate, express.static(path.join(__dirname, 'uploads')));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const infrastructureRoutes = require('./routes/infrastructure');
const estimateRoutes = require('./routes/estimate');
const pageRoutes = require('./routes/page');
const bookingRoutes = require('./routes/booking');
const pageTypeRoutes = require('./routes/pageType');
const documentRoutes = require('./routes/document');
const headQuarterRoutes = require('./routes/headQuarter');
const infrastructureTypeRoutes = require('./routes/infrastructureType');
const weaponRoutes = require('./routes/weapon');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/infrastructures', infrastructureRoutes);
app.use('/estimates', estimateRoutes);
app.use('/pages', pageRoutes);
app.use('/bookings', bookingRoutes);
app.use('/pageTypes', pageTypeRoutes);
app.use('/documents', documentRoutes);
app.use('/headQuarters', headQuarterRoutes);
app.use('/infrastructureTypes', infrastructureTypeRoutes);
app.use('/weapons', weaponRoutes);

// Sincronizza il database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

module.exports = app;
