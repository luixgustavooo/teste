const express =  require('express');
const rout = express.requere();

const{CreateUser, ReadEmailUser, ReadUser, ReadAllUser, UpdateUser, DeleteUser} = require('../controllers/UserController');

rout.post('/create', CreateUser);
rout.get('/readall', ReadAllUser);
rout.post('/reademail', ReadEmailUser); 
rout.get('/read/:id', ReadUser);
rout.put('/update/:id', UpdateUser);
rout.delete('/delete/:id', DeleteUser);

module.export = rout;