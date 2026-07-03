const express = require('express');
const rout = express.Router();

const { AuthMiddleware } = require('../middleware/AuthMiddleware');
const { ReadAllUser, ReadUser, UpdateUser, DeleteUser } = require('../controllers/UserController');

// 💡 DICA: Como TODAS as rotas de usuário serão privadas, 
// você pode aplicar o middleware globalmente neste arquivo!
rout.use(AuthMiddleware); 

// Daqui para baixo, nada passa sem um token válido
rout.get('/readall', ReadAllUser);
rout.get('/read/:id', ReadUser);
rout.put('/update/:id', UpdateUser);
rout.delete('/delete/:id', DeleteUser);

module.exports = rout;