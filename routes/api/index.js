//expose users from db for example

var express = require("express");

var router = express.Router();

router.use("/users", require("./users"));


module.exports = router;