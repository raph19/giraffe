var bcrypt = require("bcryptjs"); // module that allows us to hash passwords compare them etc.
var mongoose = require("mongoose");
const SALTFACTOR = 10;

// we create a schema ~ represantation of our data ~
var userSchema = mongoose.Schema({

    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:false},
    createdAt:{type:Date,default:Date.now},
    projects:[],
    teams:[],
    posts:[]
});/*
        {
            name:'img',
            title:'Image',
            type:'image',
        }
    ]*/

/*var projectSchema = mongoose.Schema({
    title:{type:String},
    createdAt:{type:Date,default:Date.now}
});*/

userSchema.pre("save",function(done) //before save, check password
{

    var user = this;
    if(!user.isModified("password")) //If password was not modified
    {
        return done();               //leave
    }

bcrypt.genSalt(SALTFACTOR,function(err,salt){
    if(err)
    {return done(err);}

    bcrypt.hash(user.password, salt, function(err, hashedPassword){        
        if(err)
        {return done(err);}
        
        user.password = hashedPassword;
        done();
       });
    });
});                                  //hash password

userSchema.methods.checkPassword = function(guess,done){

    if(this.password != null ){
        bcrypt.compare(guess,this.password,function(err, isMatch){
            done(err,isMatch);            
        });
    }
}                                    //compares the password supplied with the hashed password of database

var User = mongoose.model("User", userSchema);

module.exports = User;

//////////////////////////////////////////////////////////
