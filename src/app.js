const express = require('express');
const UserRoute = require('./routes/UserRouter');

const app = express();

app.use(express.json());

app.use('/user', UserRoute);

module.export = app;