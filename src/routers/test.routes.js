const express = require('express');
const testRoutes = express.Router();
const controller = require('../controllers/test.controller');

testRoutes.get('/', controller.read);
testRoutes.post('/', controller.write);

module.exports = testRoutes;
