var mongoose = require("mongoose");


var teamSchema = mongoose.Schema({
    team_name:{type:Object},
    admin_id:{type:Object},
    member_ids:[{type:Object}],
    projects:[],
    posts:[]
});

var Team = mongoose.model("Team", teamSchema);

module.exports = Team;
