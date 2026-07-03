const express = require('express');
const rout = express.Router();

const AuthController = require('../controllers/AuthController');
const { AuthMiddleware } = require('../middleware/AuthMiddleware'); 


rout.post('/register', AuthController.register);
rout.post('/login', AuthController.login); 

rout.get('/profile', AuthMiddleware, AuthController.profile);

module.exports = rout;