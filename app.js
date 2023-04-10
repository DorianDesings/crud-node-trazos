const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');

dotenv.config();

//Settings, configuración del servidor
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
