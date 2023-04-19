const express = require('express');
const app = express();
const cors = require('cors');

// Rutas
const userRoutes = require('./routes/users.routes');

// Middlewares para cliente
app.use(cors());

app.use(express.json());

// Uso de rutas
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
