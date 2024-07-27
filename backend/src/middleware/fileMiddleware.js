const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Assicurarsi che la directory uploads esista
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurazione multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Directory dove salvare i file
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`); // Nome del file
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limite di 10MB
}).single('file');

const uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ message: 'Errore nel caricamento del file', error: err });
    }
    req.filePath = req.file ? req.file.path : '';
    next();
  });
};

module.exports = {
  uploadFile
};
