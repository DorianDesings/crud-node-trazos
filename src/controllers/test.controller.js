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
    if (err) {
      console.log(err);
      return res.status(500).send('Error al leer el archivo');
    }
    const jsonData = JSON.parse(data);

    const newInfo = { ...jsonData, active: true };

    fs.writeFile(testFile, JSON.stringify(newInfo), err => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error al guardar el archivo');
      }
      res.send(newInfo);
    });
  });
};

module.exports = controller;
