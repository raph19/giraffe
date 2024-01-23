var mongoose = require("mongoose");


var bigdataSchema = mongoose.Schema({
    scene:{type:Object},
    project_name:{type:Object},
});

var bigdata = mongoose.model("bigdata", bigdataSchema);

module.exports = bigdata;