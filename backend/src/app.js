const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database'); // Importa la configurazione di Sequelize
const path = require('path'); // Importa il modulo path
const { authenticate } = require('./middleware/authMiddleware'); // Importa il middleware di autenticazione

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

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/infrastructure', infrastructureRoutes);
app.use('/estimates', estimateRoutes);
app.use('/pages', pageRoutes);
app.use('/bookings', bookingRoutes);
app.use('/pageTypes', pageTypeRoutes);
app.use('/documents', documentRoutes);

// Sincronizza il database
sequelize.sync({ alter: true }) // Usa { alter: true } per aggiornare il database senza cancellare i dati
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

module.exports = app;
