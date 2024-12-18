require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors'); 



const app = express();
const PORT = 3000;
app.use(cors());

// Middlewares
app.use(express.json());
app.use(morgan('dev')); 

// Rutas
app.use('/api', authRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
