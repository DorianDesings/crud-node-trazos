const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const usersFile = path.resolve(__dirname, '../../data/users.json');

const controller = {};

// Obtener todos los usuarios
controller.allUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.send({ error: 'Error al leer el archivo de usuarios' });

    res.send(JSON.parse(data));
  });
};

// Obtener un usuario por id
controller.userById = (req, res) => {
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) return res.send({ error: 'Error al leer el archivo de usuarios' });

    const users = JSON.parse(data);
    const user = users.find(user => user.userId === req.params.id);

    if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });
    res.send(user);
  });
};

// Crear un usuario nuevo
controller.createUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.send({ error: 'Error al leer el archivo de usuarios' });

    const users = JSON.parse(data);

    const userExist = users.some(user => user.email === req.body.email);

    if (userExist) return res.status(409).send({ error: 'Ya existe un usuario con ese email' });

    const { name, email } = req.body;
    const newUser = {
      userId: v4(),
      name,
      email
    };

    users.push(newUser);

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err) return res.send({ error: 'Error al guardar el archivo de usuarios' });

      res.send(users);
      res.end();
    });
  });
};

controller.updateUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.send({ error: 'Error al leer el archivo de usuarios' });

    const users = JSON.parse(data);

    const user = users.find(user => user.userId === req.params.id);

    if (!user) res.status(404).send({ error: 'Usuario no encontrado' });

    user.name = req.body.name;
    user.email = req.body.email;

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err) {
        return res.status(500).send({ error: 'Error al guardar el archivo de usuarios' });
      }
      res.send({ message: 'Usuario actualizado correctamente', user });
    });
  });
};

controller.deleteUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) {
      console.log(err);

      return res.send({ error: 'Error al leer el archivo de usuarios' });
    }

    let users = JSON.parse(data);

    const userIndex = users.findIndex(user => user.userId === req.params.id);

    if (userIndex === -1) return res.status(404).send('Usuario no encontrado');

    users.splice(userIndex, 1);

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err) {
        console.log(err);

        return res.status(500).send({ error: 'Error al guardar el archivo de usuarios' });
      }

      res.status(200).send(users);
    });
  });
};

module.exports = controller;
