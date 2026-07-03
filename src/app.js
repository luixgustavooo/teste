const express = require("express");
const app = express();

const UserRout = require("./routes/UserRouter");
const RegisterRout = require("./routes/AuthRouter");

app.use(express.json());

app.use("/auth", RegisterRout);
app.use("/users", UserRout);

module.exports = app;