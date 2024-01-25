//node modules folder libraries we need ~~ dependencies on package.json

var express = require("express");                         //web app framework
var path = require("path");                               //search dirs join folder paths etc.
var mongoose = require("mongoose");                       //access database
var bodyParser = require("body-parser");                  //allows us to get the body objects that are supplied in a form 
var cookieParser = require("cookie-parser");
var passport = require("passport");                       //passport is for authentication
var session = require("express-session");                  
var flash = require("connect-flash");
var params = require("./params/params");                  //gives me params
const fs =require('fs');
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage=require('multer-gridfs-storage').GridFsStorage; 
const Grid=require('gridfs-stream');
var setUpPassport = require ("./setuppassport");          //register login signup strategy 
const os = require("os");
const crypto = require("crypto");

var app = express();                                      //adding to app variable the express application
const https = require('https').createServer( {
 key: fs.readFileSync(path.join(__dirname,'certificates','key.pem')),
 cert:fs.readFileSync(path.join(__dirname,'certificates','certificate.pem'))
}
    ,app );
const io = require('socket.io')(https, {
    maxHttpBufferSize: 1e9
  });
  const port = 3000;
  https.listen(port);              //set the port listening
//app.set("port", process.env.PORT || 3000);
mongoose.set("strictQuery", false);

mongoose.connect(params.DATABASECONNECTION, function (err, database) {
    if (err) 
        throw err
    else
    {
     db = database;
     console.log('Connected to MongoDB');       
     app.listen(app.get("port"),function(){
        console.log("Server started on port " + app.get("port"));    //when it starts listen 
    })       
    }
});                                                       //connect db
setUpPassport();                                          //execute method
// connection
const conn = mongoose.createConnection(params.DATABASECONNECTION);

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection('uploads');
})

//initialize gridfs storage engine
const storage = new GridFsStorage({
    url: params.DATABASECONNECTION,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        //crypto.randomBytes(16, (err, buf) => {
         // if (err) {
       //     return reject(err);
        //  }
         // const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: file.originalname,
            metadata:  {owner:req.user.username,posted:0,likes:0},
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
     // });
    }
  });
console.log('storage created');

var upload = multer({storage});
module.exports = upload;
app.set("views", path.join(__dirname,"views"));           //where views are located
app.set("view engine", "ejs");                            //App uses view engine ejs -- js templating engine
app.use(methodOverride('_method'));
/* used in routes to fetch our data and passport too */
app.use(bodyParser.urlencoded({extended:false}));         //allows me to get the body objects that are supplied when i fill a form and converts input to json format
app.use(cookieParser());                                  //for when we gonna make cookies and store info in cookies
app.use(session({
    secret:"sdfghjklfghjkl7890greggewrgergver",
    resave:false,
    saveUninitialized:false
})); //used in routes to fetch the data and passport too

app.use(passport.initialize());  
app.use(passport.session());
app.use(flash());

var bodyParser = require('body-parser');
const { rejects } = require("assert");
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use("/", require("./routes/web")); // our routes are now known to the application picks up index.js
app.use("/api", require("./routes/api"));


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));




io.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join 
    const userInfo = os.userInfo();
console.log(userInfo);

    socket.on('room', function(room) {
        socket.join(room);
        console.log('A user just connected.');

        socket.on('startGame-1',  arg  => {
    //console.log(arg)
    socket.in(room).emit('startGame-1',arg);
})

console.log(room);
socket.on('disconnect', () => {
    console.log('A user has disconnected.');
})


        socket.on('startGame',  arg  => {
        //console.log(arg)
        socket.in(room).emit('startGame',arg);
})
socket.on('startGame2',  arg   => {

    console.log(arg);
    socket.in(room).emit('startGame2', arg);                                 // emmit to socket    socket.broadcast.emit('startGame2',arg);

    
})

socket.on('startGame3',  arg   => {
        
    console.log(arg);

    //const readable = fs.createReadStream(arg, { highWaterMark: 20 });

    socket.in(room).emit('startGame3',arg);

})
socket.on('startGame4',  arg   => {
        
    //console.log(arg)
    socket.in(room).emit('startGame4',arg);

})

socket.on('startGame5',  arg   => {
        
    //console.log(arg)
    socket.in(room).emit('startGame5',arg);

})

socket.on('startGame6',  arg   => {
        
    //console.log(arg)
    socket.in(room).emit('startGame6',arg);

})
socket.on('startGame7',  arg   => {
        
    //console.log(arg)
    socket.in(room).emit('startGame7',arg);

})
});

    
});

/*io.on('connection', (socket) => {
    console.log('A user just connected.');
    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })

    socket.on('startGame',  arg  => {
            //console.log(arg)
            socket.broadcast.emit('startGame',arg);
})

socket.on('startGame2',  arg   => {

    console.log(arg);
    socket.broadcast.emit('startGame2', arg);                                 // emmit to socket    socket.broadcast.emit('startGame2',arg);

    
})

socket.on('startGame3',  arg   => {
        
    console.log(arg);

    //const readable = fs.createReadStream(arg, { highWaterMark: 20 });

   socket.broadcast.emit('startGame3',arg);

})
socket.on('startGame4',  arg   => {
        
    //console.log(arg)
    socket.broadcast.emit('startGame4',arg);

})

socket.on('startGame5',  arg   => {
        
    //console.log(arg)
    socket.broadcast.emit('startGame5',arg);

})

socket.on('startGame6',  arg   => {
        
    //console.log(arg)
    socket.broadcast.emit('startGame6',arg);

})

});
*/


io.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('home', function(home) {
        socket.join(home);
        console.log('A user just connected.');
console.log(home);
socket.on('disconnect', () => {
    console.log('A user has disconnected.');
})

socket.on('start',  arg  => {
    //console.log(arg)
    socket.in(home).emit('start',arg);
    console.log(arg);
})

socket.on('start_like',  arg  => {
    //console.log(arg)
    socket.in(home).emit('start_like',arg);
    console.log(arg);
})
socket.on('start_like_dec',  arg  => {
    //console.log(arg)
    socket.in(home).emit('start_like_dec',arg);
    console.log(arg);
})
    });
});