const fs = require('fs');
const path = require('path');
const testFile = path.resolve(__dirname, '../../data/test.json');

const controller = {};

controller.read = (req, res) => {
  fs.readFile(testFile, (err, data) => {
    if (err) res.status(500).send('Error al leer el archivo');

    const jsonData = JSON.parse(data);

    res.send(jsonData);
  });
};

controller.write = (req, res) => {
  console.log(req.body);
  fs.readFile(testFile, (err, data) => {
    if (err) return res.status(500).send('Error al leer el archivo');

    const jsonData = JSON.parse(data);

    const newInfo = req.body;

    fs.writeFile(testFile, JSON.stringify(newInfo), err => {
      if (err) return res.status(500).send('Error al guardar el archivo');

      res.end();
    });
  });
};

module.exports = controller;
