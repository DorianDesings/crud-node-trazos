const fs = require('fs');
const path = require('path');
const usersFile = path.resolve(__dirname, '../../data/users.json');

const controller = {};

controller.allUsers = (req, res) => {
  // Obtener todos los usuarios
  fs.readFile(usersFile, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error al leer el archivo de usuarios');
    }
    res.send(JSON.parse(data));
  });
};

controller.userById = (req, res) => {
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error al leer el archivo de usuarios');
    }
    const users = JSON.parse(data);
    const user = users.find(user => user.userId === req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.send(user);
  });
};

module.exports = controller;
