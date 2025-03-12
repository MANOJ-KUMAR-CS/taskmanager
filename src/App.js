const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const loginroutes = require("./route/loginroutes");
const registerroutes = require("./route/registerroutes");
const taskroutes = require("./route/taskroutes");
const { verifyToken } = require("./jwt/JWT");

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(cookieParser());

app.use("/api/login", loginroutes);
app.use("/api/register", registerroutes);
app.use("/api/task", taskroutes); 

app.get("/api/user", verifyToken, (req, res) => {
  res.json({ message: "Hello, user!", user: req.user });
});

module.exports = app;
