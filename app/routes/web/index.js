var express = require("express");   // we require express cause we need router

var router = express.Router();      //the router of the app is stored in variable router

//add error and info

router.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next(); //execute next or it stays on this method
});

router.use("/", require("./home")); //on this path ("/") use this routing file(./home)

module.exports = router;            //export router to use it in the application.js folder
