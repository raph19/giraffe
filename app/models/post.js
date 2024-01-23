var mongoose = require("mongoose");


var postSchema = mongoose.Schema({
    user:{type:Object},
    post:{type:Object},
    admin_id:{type:Object},
    createdAt:{type:Date,default:Date.now},
    comments:[{type:Object}],
    names:[{type:Object}],
    likes:{type:Number},
    likers:[{type:Object}]
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;