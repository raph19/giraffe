var express =require("express");
var router = express.Router();              //the router of my app is stored on variable router
var passport = require("passport");         //module for authentication
var User = require("../../models/user"); 
var Team = require("../../models/team"); 
var Post = require("../../models/post"); 
let upload = require("../../application"); 
var gfs = require("../../application"); 
var mongoose = require('mongoose');
const archiver = require('archiver');

                                          //we declare our routes
router.get("/", function (req,res){
    res.render("home/login");
});                                // i render a view 
router.get("/editor", function (req,res){
  res.render("home/editor");
});  
router.get("/home", function(req,res){
    res.render("home/home");
});

router.get("/room/:val", function(req,res){
  res.render("home/room");
});

router.get("/about", function(req, res){
    res.render("home/about");
 });


 
 router.get("/login", function(req, res){
    res.render("home/login");
 });

router.get("/logout", function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
 });
 router.get("/Welcome", function(req,res){
  res.render("home/Welcome");
});
 router.post("/login",passport.authenticate("login", {
    successRedirect:"/editor",
    failureRedirect:"/login",
    failureFlash:true
}));


 router.get("/signup", function(req, res){
    res.render("home/signup");
 });

 /* here is where the post method from signup page sends the data */

 router.post("/signup", function(req, res,next){
    var username = req.body.username;   // thanks to bodyparser we can access these data
    var email = req.body.email;         //  
    var password = req.body.password;   //  and use passport to authenticate 
                                        //  now we create setuppassport

    User.findOne({email:email},function(err,user){
        if(err){return next(err);}
        if(user){           
            req.flash("error","There is already an account with this e-mail");
            return res.redirect("/signup");
        }

        var newUser = new User({
            username:username,
            password:password,
            email:email
        });  //we create a new user  

        newUser.save(next);  // we hit save and we go to user.js .pre save check..
    });

    }, passport.authenticate("login", {
        successRedirect:"/Welcome",
        failureRedirect:"/signup",
        failureFlash:true
 }));
////save/////
 router.post('/saved', function(req, res) {

    // Insert JSON straight into MongoDB
    console.log('Data received: ' + JSON.stringify(req.body));
    db.collection('users').updateMany(
        { _id: req.user._id},
        { $push: {projects: req.body } }
        
        ,(err) => {
        if (err) {
          return console.log(err);
        }
        res.sendStatus(201);
      });
    });

    router.post('/save_team', function(req, res) {
      // Insert JSON straight into MongoDB
      console.log('Data received: ' + JSON.stringify(req.body));
      var newTeam = new Team({
            team_name:req.body,
            admin_id:req.user._id
        });newTeam.save();

        db.collection('users').updateMany(
          { _id: req.user._id},
          { $push: {teams: req.body } }
          
          ,(err) => {
          if (err) {
            return console.log(err);
          }
          res.sendStatus(201);
        });
      });

      router.post('/join_team', function(req, res) {
        // Insert JSON straight into MongoDB
        console.log('Data received: ' + JSON.stringify(req.body));
        Team.findOne({team_name:req.body},function(err,team){
          if(err){return next(err);}
          if(team){           
               db.collection('teams').updateMany(
          { team_name:req.body},
          { $push: {members_ids: req.user._id } }
          
          );
 } }); 
        db.collection('users').updateMany(
          { _id: req.user._id},
          { $push: {teams: req.body } }
          
          ,(err) => {
          if (err) {
            return console.log(err);
          }
          res.sendStatus(201);
        });

         
       
      });
      router.post('/posts', function(req, res) {
        const user_id=req.user.username;

        var newPost = new Post({
          user:user_id,
          post:req.body,
          admin_id:req.user._id,
          comments:[],
          likes:0,
          likers:[]
      });newPost.save();
console.log(newPost);
        // Insert JSON straight into MongoDB
        console.log('Data received: ' + JSON.stringify(req.body));
        db.collection('users').updateMany(
            { _id: req.user._id},
            { $push: {posts: req.body } }
            
            ,(err) => {
            if (err) {
              return console.log(err);
            }
            res.sendStatus(201);
          });
        });

        router.post('/save_comments', function(req, res) {
const user_id=req.user.username;
console.log(JSON.stringify(user_id));
          // Insert JSON straight into MongoDB
          console.log('Data received: '+ JSON.stringify(req.body.dat) + JSON.stringify(req.body.comments));
          var id = mongoose.Types.ObjectId(req.body.dat);
          db.collection('posts').updateMany(
            { _id: id},
              { $push: {comments: req.body.comments,names: user_id} }

              ,(err) => {
              if (err) {
                return console.log(err);
              }
              res.sendStatus(201);
            });
          });
          
          router.post('/save_likes', function(req, res) {
            const usrnm=req.user.username;
            console.log(JSON.stringify(usrnm));
                      // Insert JSON straight into MongoDB
                      console.log('Data received: '+ JSON.stringify(req.body));
                      var id = mongoose.Types.ObjectId(req.body.dat1);
                      db.collection('posts').updateMany(
                        { _id: id},
                          {
                            $inc:{likes: 1},
                          
                            $push:{likers:usrnm}}
                          ,(err) => {
                          if (err) {
                            return console.log(err);
                          }
                          res.sendStatus(201);
                        });
                      });

                      router.post('/save_likes_decrease', function(req, res) {
                        const username=req.user.username;
                        //console.log(JSON.stringify(username));
                                  // Insert JSON straight into MongoDB
                                  console.log('Data received: '+ JSON.stringify(req.body));
                                  var id = mongoose.Types.ObjectId(req.body.dat1);
                                  db.collection('posts').updateOne(
                                    { _id: id},
                                      {
                                        $inc:{likes: -1},
                                        $pull:{likers: username}}
                                      ,(err) => {
                                      if (err) {
                                        return console.log(err);
                                      }
                                      res.sendStatus(201);
                                    });
                                  });

/////////////////////////////////////////////////////////////////////////////
/********************************************GRID FS********************************************/


router.post('/save_file_grid_fs',upload.single('big_data_file'),(req, res) =>{
//check for existing files
console.log(req.file);
res.sendStatus(200);

//res.json({file:req.file})

//res.status(200)
//res.send("File uploaded successfully");
});
router.get('/get_files_grid_fs', (req, res) =>{

db.collection('uploads.files').find({"metadata.owner":req.user.username}).toArray((err, result) => {
  if (err) return console.log(err);
  res.send(result);
});
}); 
router.get('/get_files_grid_fs_of_all_users_for_the_home_page', (req, res) =>{

  db.collection('uploads.files').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
  }); 
router.get('/get_files_grid_fs_to_assign_comments_likes_likers_etc', (req, res) =>{

  db.collection('uploads.files').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
  }); 

   //   bucket.openDownloadStreamByName("tospitakimoy").pipe(res);
  //  bucket.openDownloadStreamByName("tospitakimoy").pipe(res);
  /*router.get('/get_files_grid_fs_home_page', (req, res) =>{

    db.collection('uploads.files').find({"metadata.posted":1}).toArray((err, result) => {
      let bucket = new  mongoose.mongo.GridFSBucket(db,  {
        bucketName: 'uploads'
      });
    if (err) return console.log(err);
    result.forEach(file => {
      bucket.openDownloadStreamByName(file.filename).pipe(res);
    })
    });
  });
*/
router.get('/get_files_grid_fs_home_page', (req, res) => {
  db.collection('uploads.files').find({"metadata.posted": 1}).toArray((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    if (result.length === 0) {
      return res.status(404).send("No files found");
    }

    let bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });

    const archive = archiver('zip');
    archive.pipe(res);
    
    result.forEach(file => {
      const fileStream = bucket.openDownloadStreamByName(file.filename);
      archive.append(fileStream, { name: file.filename });
    });

    archive.finalize();
  });
});

  router.post('/get_file_grid_fs', (req, res) =>{
    //Look this, I must to explicit database name, otherwise that error is thrown
    let bucket = new  mongoose.mongo.GridFSBucket(db,  {
      bucketName: 'uploads'
    });
    console.log(req.body);
    console.log(JSON.stringify(req.body.thisisthefilerequested));

    bucket.openDownloadStreamByName(req.body.thisisthefilerequested).pipe(res);
  });
  router.post('/big_data_post', (req, res) =>{

    db.collection('uploads.files').updateMany(
      { filename: req.body.filetopost},
      { $inc: { "metadata.posted": 1 } ,
      $push:{post_name:req.body.post_name}}
        ,(err) => {
        if (err) {
          return console.log(err);
        }
        res.sendStatus(201);
      });
    });

/*
  })
  } )
if(files[0]==='text/plain'){
  gfs.openDownloadStreamByName(req.params.filename).pipe(res);
}else{
res.status(404).json({
  err:'Not a file'
});
}
  });
});*/

router.post('/save_likes_big_data_files', function(req, res) {
  const usrnm=req.user.username;
  console.log(JSON.stringify(usrnm));
            // Insert JSON straight into MongoDB
            console.log('Data received: '+ JSON.stringify(req.body));
            var id = mongoose.Types.ObjectId(req.body.dat1);
            db.collection('uploads.files').updateMany(
              { _id: id},
                {
                  $inc:{likes: 1},
                
                  $push:{likers:usrnm}}
                ,(err) => {
                if (err) {
                  return console.log(err);
                }
                res.sendStatus(201);
              });
            });

            router.post('/save_likes_decrease_big_data_files', function(req, res) {
              const username=req.user.username;
              //console.log(JSON.stringify(username));
                        // Insert JSON straight into MongoDB
                        console.log('Data received: '+ JSON.stringify(req.body));
                        var id = mongoose.Types.ObjectId(req.body.dat1);
                        db.collection('uploads.files').updateOne(
                          { _id: id},
                            {
                              $inc:{likes: -1},
                              $pull:{likers: username}}
                            ,(err) => {
                            if (err) {
                              return console.log(err);
                            }
                            res.sendStatus(201);
                          });
                        });


                        router.post('/save_comments_big_data_files', function(req, res) {
                          const user_id=req.user.username;
                          console.log(JSON.stringify(user_id));
                                    // Insert JSON straight into MongoDB
                                    console.log('Data received: '+ JSON.stringify(req.body.dat) + JSON.stringify(req.body.comments));
                                    var id = mongoose.Types.ObjectId(req.body.dat);
                                    db.collection('uploads.files').updateMany(
                                      { _id: id},
                                        { $push: {comments: req.body.comments,names: user_id} }
                          
                                        ,(err) => {
                                        if (err) {
                                          return console.log(err);
                                        }
                                        res.sendStatus(201);
                                      });
                                    });
/***********************************************************************************************/

////overwrite////
/*router.post('/overwrite', function(req, res) {
    // Insert JSON straight into MongoDB
    console.log('Data received: ' + JSON.stringify(req.body));
    db.collection('users').updateMany(
        { _id: req.user._id},
          { projects: req.body }
     )
    }); */
   /*db.collection('projects').insertOne(req.body, (err, result) =>{
       if (err){
          res.send('Error');}
       else{
         res.send('Success');
       }
   });
 });*/
///get///

router.get('/projects', (req, res) => {
    db.collection('users').find({ _id: req.user._id}).toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });


  router.get('/teams', (req, res) => {
    db.collection('users').find({ _id: req.user._id}).toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

  router.get('/posts_homepage', (req, res) => {
    db.collection('posts').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  }); 

  router.get('/save_comments', (req, res) => {
    db.collection('posts').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });
  router.get('/posts_admin', (req, res) => {
    db.collection('users').find({ username: req.user.username}).toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });
  router.get('/profile', function(req, res, next) {

    //here it is
    var user = req.user;

    //you probably also want to pass this to your view
    res.send({ user: user });
});


module.exports = router;    // Now app js will know that home js uses this router