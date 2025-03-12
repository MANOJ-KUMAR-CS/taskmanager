const express = require("express");
const route = express.Router();
const login = require("../controller/user/login");
route.post("/", login);

module.exports=route