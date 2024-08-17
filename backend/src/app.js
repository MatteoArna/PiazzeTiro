// app.js
console.log("app.js");
const express = require('express');
console.log("express importato");
const bodyParser = require('body-parser');
console.log("body-parser importato");
const cors = require('cors');
console.log("cors importato");
const sequelize = require('./config/database');
console.log("sequelize importato");
const path = require('path');
console.log("path importato");
const { authenticate } = require('./middleware/authMiddleware');
console.log("authMiddleware importato");
const app = express();
console.log("express configurato");

console.log("app.js");

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
console.log("cors configurato");

// Body parser middleware
app.use(bodyParser.json());
console.log("body-parser configurato");
app.use(bodyParser.urlencoded({ extended: true }));
console.log("body-parser configurato");

// Configura il percorso statico per la directory uploads con autenticazione
app.use('/uploads', authenticate, express.static(path.join(__dirname, 'uploads')));
console.log("uploads configurato");

// Import routes
const authRoutes = require('./routes/auth');
console.log("auth importate");
const userRoutes = require('./routes/user');
console.log("user importate");
const infrastructureRoutes = require('./routes/infrastructure');
console.log("infrastructureRoutes importate");
const estimateRoutes = require('./routes/estimate');
console.log("estimateRoutes importate");
const pageRoutes = require('./routes/page');
console.log("pageRoutes importate");
const bookingRoutes = require('./routes/booking');
console.log("bookingRoutes importate");
const pageTypeRoutes = require('./routes/pageType');
console.log("pageTypeRoutes importate");
const documentRoutes = require('./routes/document');
console.log("documentRoutes importate");
const headQuarterRoutes = require('./routes/headQuarter');
console.log("headQuarterRoutes importate");
const infrastructureTypeRoutes = require('./routes/infrastructureType');
console.log("infrastructureTypeRoutes importate");
const weaponRoutes = require('./routes/weapon');
console.log("weaponRoutes importate");
const userRoleRoutes = require('./routes/userRole');
console.log("userRoleRoutes importate");
const targetRoutes = require('./routes/target');
console.log("routes importate");

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
app.use('/user_roles', userRoleRoutes);
app.use('/targets', targetRoutes)
console.log("routes configurate");


// Sincronizza il database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

module.exports = app;
