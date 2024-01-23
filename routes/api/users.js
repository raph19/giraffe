//expose users from db for example

var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    res.json("This is a json status code for the users of API");
});

module.exports = router;