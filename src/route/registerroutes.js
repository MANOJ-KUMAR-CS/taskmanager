const express = require("express");
const route = express.Router();
const register = require("../controller/user/register");

route.post("/", register);

module.exports = route;