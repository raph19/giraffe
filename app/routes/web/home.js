var express =require("express");
var router = express.Router();              //the router of my app is stored on variable router
var passport = require("passport");         //module for authentication
var User = require("../../models/user"); 
var Team = require("../../models/team"); 
var Post = require("../../models/post"); 
let {upload,existingUsernames,existingemails} = require("../../application"); 
//var gfs = require("../../application"); 
var mongoose = require('mongoose');
const archiver = require('archiver');
const { ObjectId } = require('mongodb');

function isValidEmail(email) {
  // Regular expression pattern for validating email addresses
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
function isNOTValidEmail(email) {
  return !isValidEmail(email);
}
const randomString = () => Math.random().toString(36).substring(2, 15);

router.post("/login", passport.authenticate("login", {
  successRedirect: false,
  failureRedirect: "/login",
  failureFlash: true
}), (req, res) => {
  const username = req.user.username;
  if (!req.session.uniqueURL) {
    req.session.uniqueURL = `/user/${username}_${randomString()}`;
  }
  console.log("Authenticated user:", username);
  res.redirect(req.session.uniqueURL);
});

 /* here is where the post method from signup page sends the data */

 router.post("/signup", function(req, res,next){
  var username = req.body.username;   // thanks to bodyparser we can access these data
  var email = req.body.email;         //  
  var password = req.body.password;   //  and use passport to authenticate 
  var repassword =req.body.repassword;                                    
                                      //  now we create setuppassport

  User.findOne({email:email},function(err,em){
      if(err){return next(err);}
      if(em){           
          req.flash("error","There is already an account with this e-mail");
          return res.redirect("/signup");
      }else{
        User.findOne({ username: username }, function(err, userWithUsername) {
          if (err) {
              return next(err);
          }

          if (userWithUsername) {
              req.flash("error", "There is already an account with this username");
              return res.redirect("/signup");
      }else if(password!==repassword){
        req.flash("error","Password-Repassword missmatch");
        return res.redirect("/signup");
      }else if(isNOTValidEmail(email)){
        eq.flash("error","not valid mail");
        return res.redirect("/signup");
      }else{
        existingUsernames.push(username);
      existingemails.push(email);
      console.log(existingUsernames);
      console.log(existingemails);

            var newUser = new User({
          username:username,
          password:password,
          email:email
      });  //we create a new user  
    
      newUser.save(next);  // we hit save and we go to user.js .pre save check..
      }
      });
    }

  });

  }, passport.authenticate("login", {
      successRedirect:false,
      failureRedirect:"/signup",
      failureFlash:true
}), (req, res) => {
  const username = req.user.username;
  if (!req.session.uniqueURL) {
    req.session.uniqueURL = `/user/${username}_${randomString()}`;
  }
  console.log("Authenticated user:", username);
  res.redirect(req.session.uniqueURL+'/Welcome');
});
router.get("/user/:uniqueURL", (req, res) => {
  if (req.session && req.session.uniqueURL) {

  const uniqueURL = req.params.uniqueURL;

  // If the request includes the "_", it's a redirect from the login
 // if (uniqueURL.includes('_')) {
    const username = req.session.uniqueURL.split('_')[0];
    // Render the home/index template
const fullURL = 'https://giraffe-design-tt8d.onrender.com' + req.session.uniqueURL;

    res.render("home/index", { username: username ,fullURL: fullURL});
  }
 // } else {
    // If no "_", it's a direct request to /user/:uniqueURL
 //   const username = uniqueURL;
 //   const fullURL = req.protocol + '://' + req.get('host');

    // Render the home/ template
 //   res.render("home/", { username: username, fullURL: fullURL });
 // }
});
/*router.get("/", function (req,res){
    res.render("home/");
});                   */             // i render a view 

router.get("/user/:uniqueURL/home", function(req,res){
  if (req.session && req.session.uniqueURL) {

  const username = req.user.username;
  const uniqueURL = `/user/${username}_${randomString()}`;
const fullURL = 'https://giraffe-design-tt8d.onrender.com' + req.session.uniqueURL;

  console.log(username,fullURL);
    res.render("home/home",{ username: username ,fullURL: fullURL});
  }
});

router.get("/user/:uniqueURL/room/:val", function(req,res){
  if (req.session && req.session.uniqueURL) {

  const username = req.user.username;
  const uniqueURL = `/user/${username}_${randomString()}`;
const fullURL = 'https://giraffe-design-tt8d.onrender.com' + req.session.uniqueURL;

  console.log(username,fullURL);
  res.render("home/room",{ username: username ,fullURL: fullURL});
  }
});

router.get("/user/:uniqueURL/about", function(req, res){
  if (req.session && req.session.uniqueURL) {

  const username = req.user.username;
  const uniqueURL = `/user/${username}_${randomString()}`;
const fullURL = 'https://giraffe-design-tt8d.onrender.com' + req.session.uniqueURL;
    res.render("home/about",{ username: username ,fullURL: fullURL});
  }
 });


 
 router.get("/login", function(req, res){
    res.render("home/login");
 });

 router.get("/user/:uniqueURL/logout", function(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.redirect("/login");
    }
  });
});
 router.get("/user/:uniqueURL/Welcome", function(req,res){
  res.render("home/Welcome");
});
 /*router.post("/login",passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true
}));*/


 router.get("/signup", function(req, res){
    res.render("home/signup");
 });

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
  router.post('/saved_projects_teams', function(req, res) {
    // Extract data from the request body
    const { team_id, project_name, scene } = req.body;

    console.log('Received data:', { team_id, project_name, scene });
    const teamIdObj = new ObjectId(team_id);

    // Construct the new project object
    const newProject = {
        project_name: project_name,
        scene: scene
    };

    // Update the teams collection by pushing the newProject object into the projects array
    db.collection('teams').updateMany(
        { _id: teamIdObj },
        { $push: { projects: newProject } },
        (err, result) => {
            if (err) {
                console.error('Error updating projects:', err);
                return res.sendStatus(500); // Internal Server Error
            }
            console.log('Projects updated:', result.modifiedCount);
            res.sendStatus(201); // Created
        }
    );
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

/*router.post('/save_file_grid_fs_teams1', (req, res, next) => {
  let owner;
  const teamIdObj = new ObjectId(req.body.team_id);
  owner = teamIdObj.toString();
  req.owner = owner; // Set req.owner
  console.log('Team Id:', req.owner);
  next();
});
router.post('/save_file_grid_fs_teams', upload.single('big_data_file'), (req, res, next) => {
  next();
});*/
router.get('/get_files_grid_fs', (req, res) =>{

db.collection('uploads.files').find({"metadata.owner":req.user.username}).toArray((err, result) => {
  if (err) return console.log(err);
  res.send(result);
});
}); 
router.get('/get_files_grid_fs_teams', (req, res) =>{
  const team_id = req.query['metadata.owner']; 
  const teamIdObj = new ObjectId(team_id);
  const teamid=teamIdObj.toString();
 console.log(teamid);
  db.collection('uploads.files').find({"metadata.owner":teamid}).toArray((err, result) => {
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
  router.get('/team_projects', (req, res) => {
    db.collection('teams').find({
        $or: [
            { admin_id: req.user._id },
            { members_ids: req.user._id }
        ]
    }).toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});
router.get('/team_reach_projects', (req, res) => {
  const teamid = req.query._id; 
  const teamIdObj = new ObjectId(teamid);
//console.log(teamIdObj);
  db.collection('teams').find({ _id: teamIdObj }).toArray((err, result) => { 
      if (err) return console.log(err);
      res.send(result);
  });
});
router.get('/team_ids', (req, res) => {
  const teamName = req.query.team_name; 
  db.collection('teams').find({ 'team_name.team_name': teamName }).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});
router.get('/users_team_admin', (req, res) => {
  const admin = req.query.team_admin; 
  const admin1 = new ObjectId(admin);
  db.collection('users').find({ _id: admin1 }).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

router.get('/users_team_members', (req, res) => {
  console.log("team_members:", req.query.team_members);
  const membersIds = req.query.team_members.split(','); // Split the string into an array of IDs

  // Convert member IDs from string to ObjectId
  const objectIds = membersIds.map(id => ObjectId(id));
  console.log("membersIds:", membersIds);
  console.log("objectIds:", objectIds);
  db.collection('users').find({ _id: { $in: objectIds } }).toArray((err, result) => {
      if (err) {
          console.error('Error fetching user data:', err);
          return res.status(500).send('Error fetching user data');
      }
      res.send(result);
  });
});

  router.get('/teams', (req, res) => {
    db.collection('teams').find({}, { team_name: 1 }).toArray((err, result) => {
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

    var user = req.user;

    res.send({ user: user });
});

module.exports = router;    // Now app js will know that home js uses this router
