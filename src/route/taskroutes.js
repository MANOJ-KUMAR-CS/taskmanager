const express = require("express");
const route = express.Router();
const get = require("../controller/data/get");
const add = require("../controller/data/add");
const update = require("../controller/data/update");
const remove = require("../controller/data/delete");
const alter=require("../controller/data/Alter")

route.get("/get/:userid", get);
route.post("/add/:userid", add);
route.put("/update/:id", update);
route.delete("/delete/:id", remove);
route.put("/alter/:id", alter);
module.exports = route;
