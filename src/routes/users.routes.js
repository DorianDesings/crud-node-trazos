const express = require('express');
const userRoutes = express.Router();
const controller = require('../controllers/users.controller');

// Obtener todos los usuarios
userRoutes.get('/', controller.allUsers);

// Obtener un usuario por ID
userRoutes.get('/:id', controller.userById);

// Crear un usuario
userRoutes.post('/', controller.createUser);

// Actualizar un usuario
// app.patch('/api/users/:id', (req, res) => {
//   fs.readFile(usersFile, 'utf8', (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send('Error al leer el archivo de usuarios');
//     }
//     const users = JSON.parse(data);
//     const user = users.find(user => user.userId === req.params.id);
//     if (!user) return res.status(404).send('Usuario no encontrado');
//     user.name = req.body.name;
//     user.email = req.body.email;
//     fs.writeFile('usuarios.json', JSON.stringify(users), err => {
//       if (err) {
//         console.log(err);
//         return res.status(500).send('Error al guardar el archivo de usuarios');
//       }
//       res.send(user);
//     });
//   });
// });

// Eliminar un usuario
// app.delete('/api/usuarios/:id', (req, res) => {
//   fs.readFile(usersFile, 'utf8', (err, data) => {
//     if (err) {
//       console.log(err);

//       return res.status(500).send('Error al leer el archivo de usuarios');
//     }

//     let users = JSON.parse(data);

//     const userIndex = usuarios.findIndex(user => user.userId === req.params.id);

//     if (userIndex === -1) return res.status(404).send('Usuario no encontrado');

//     usuarios.splice(userIndex, 1);

//     fs.writeFile(usersFile, JSON.stringify(users), err => {
//       if (err) {
//         console.log(err);

//         return res.status(500).send('Error al guardar el archivo de usuarios');
//       }

//       res.send(`Usuario con ID ${req.params.id} eliminado`);
//     });
//   });
// });

module.exports = userRoutes;
