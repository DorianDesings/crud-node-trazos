const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routers/users.router');
const testRoutes = require('./routers/test.routes');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/', testRoutes);

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
