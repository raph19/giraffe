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
const COLLECTION_NAME = 'users';
const COLLECTION_NAME2 = 'teams';
const { ObjectId } = require('mongodb');
const http = require('http');
var app = express();                                      //adding to app variable the express application
const server = http.createServer(app); // Create an HTTP server using the express app

/*const https = require('https').createServer( {
 key: fs.readFileSync(path.join(__dirname,'certificates','key.pem')),
 cert:fs.readFileSync(path.join(__dirname,'certificates','certificate.pem'))
}
    ,app );*/
const io = require('socket.io')(server, {
    maxHttpBufferSize: 1e9
  });
  //https.listen(3000);              //set the port listening
//app.set("port", process.env.PORT || 3000);
mongoose.set("strictQuery", false);

mongoose.connect(params.DATABASECONNECTION, function (err, database) {
    if (err) 
        throw err
    else
    {
     db = database;
     console.log('Connected to MongoDB');       
     server.listen(3000,function(){
        console.log("Server started on port " + app.get("port"));    //when it starts listen 
    })       
    
 const collection = db.collection(COLLECTION_NAME);
collection.find({}, { projection: { username: 1 } }).toArray()
.then(usernames => {
    existingUsernames2 = usernames.map(user => user.username);
    console.log('Existing usernames:', existingUsernames2);
})
.catch(err => {
    console.error('Error fetching usernames from MongoDB:', err);
});
console.log(existingUsernames2);
collection.find({}, { projection: { email: 1 } }).toArray()
.then(emails => {
    existingemails2 = emails.map(user => user.email);
    console.log('Existing emails:', existingemails2);
})
.catch(err => {
    console.error('Error fetching emails from MongoDB:', err);
});
const COLLECTION_NAME2 = 'teams';
const collection2 = db.collection(COLLECTION_NAME2);
collection2.find({}, { projection: { 'team_name.team_name': 1 } }).toArray()
  .then(team_names => {
    // Extracting just the team_name property from each object
    const chckteams = team_names.map(team => team.team_name.team_name);
    console.log(chckteams);
  })
.catch(err => {
    console.error('Error fetching team_names from MongoDB:', err);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
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
module.exports = {upload:upload,

existingUsernames:existingUsernames,
existingemails:existingemails

};
app.set("views", path.join(__dirname,"views"));           //where views are located
app.set("view engine", "ejs");                            //App uses view engine ejs -- js templating engine
app.use(session({
    secret: '3n4R4aNd0m1yS31Fg3n3rAt3dStR1nGK3yS3cR3tV41u3',
    resave: false,
    saveUninitialized: true
  }));
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

app.use('/user/:uniqueURL/css', express.static(__dirname + '/public'));
app.use('/user/:uniqueURL/js', express.static(__dirname + '/public'));


const userStorage = {};
const users = {};
const membersonline={};
let currentUsername = '';
io.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join 
    const userInfo = os.userInfo();
//console.log(userInfo);

    socket.on('room', function(room) {
        socket.join(room);
        console.log('A user just connected.',room);
            // Retrieve stored data for the user in the specific room
    const storedDatascene = userStorage[room];
    console.log('Stored data:', storedDatascene);

    // Emit stored data only when the user reconnects
    if (storedDatascene) {
        console.log(storedDatascene);
      socket.emit('storedData', storedDatascene);
    }
            // Retrieve stored data for the user in the specific room
   // const storedData = userStorage[room];
  //  console.log('Stored data:', storedData);

    // Emit stored data only when the user reconnects
   // if (storedData && socket.handshake.query.isFirstConnection_onRoom === 'false') {
      //  console.log(storedData);
    //  socket.emit('storedData', storedData);
    //}
      socket.on('user-info', (arg) => {
            // Store user information on the socket object
            //socket.userInfo = arg;
            console.log(arg);
            const roomKeys = Array.from(socket.rooms);
            const roomKey = roomKeys.find(key => key !== socket.id);
            if (!membersonline[roomKey]) {
                membersonline[roomKey] = [];
            }
            // Store the new chunk
            currentUsername = arg.username;
            membersonline[roomKey].push(arg.username);
            console.log(membersonline[roomKey]);
            users[socket.id] = currentUsername;

            const storedData = membersonline[room];

            socket.emit('user-info', storedData);

            socket.in(room).emit('user-info',storedData);

          });

   /*       socket.on('savesceneonreload', function (arg) {
            console.log('Received editor:', socket.rooms);
        
            // Filter out the socket's ID and use the received editor URL as the key
            const roomKeys = Array.from(socket.rooms);
            const roomKey = roomKeys.find(key => key !== socket.id);
        
            userStorage[roomKey] = {};
        
            // Store the data in the userStorage with the received editor URL as the key
            userStorage[roomKey] = arg;
        
            // Emit the new data to all users in the room
          //  io.to(roomKey).emit('savesceneonreload', arg);
          });*/
            socket.on('logout', function () {
                console.log('User logged out from socket:', socket.id);
                console.log('User logged out:', socket.id);
                userStorage[socket.id] = []; // Clear user data in userStorage
                console.log(userStorage);
                console.log(userStorage[socket.id]);
                // Handle logout using the stored room information
                const username = users[socket.id];
                delete users[socket.id];
                handleLogout(username, room);
            });
    
            socket.on('disconnect', function() {
                console.log('A user has disconnected from socket:', socket.id);
                // Handle disconnect using the stored room information
                const username = users[socket.id];
                delete users[socket.id];
                handleLogout(username, room);
            });
            
            function handleLogout(username, roomKey) {
                console.log('Handling logout for user:', username, 'from room:', roomKey);
                if (membersonline.hasOwnProperty(roomKey)) {
                    console.log('Before removal from room:', roomKey, ':', membersonline[roomKey]);
                    const index = membersonline[roomKey].indexOf(username);
                    if (index !== -1) {
                        membersonline[roomKey].splice(index, 1);
                        console.log('After removal from room:', roomKey, ':', membersonline[roomKey]);
                        // Emit updated user info to all users in the room
                        const storedData = membersonline[roomKey];

                        socket.emit('user-info', storedData);
            
                        socket.in(roomKey).emit('user-info',storedData);                        
                        if (membersonline[roomKey].length === 0) {
                            membersonline[roomKey]=[];
                            console.log('Room deleted due to empty array:', roomKey);
                        }
                    } else {
                        console.log('User', username, 'not found in room:', roomKey);
                    }
                } else {
                    console.log('Room', roomKey, 'not found in membersonline');
                }
            }

            socket.on('savesceneonreload2', function (arg) {
                const roomKeys = Array.from(socket.rooms);
                const roomKey = roomKeys.find(key => key !== socket.id);
            
                // Check if the signal for a new wave of chunks has been received
                if (userStorage[roomKey] === undefined) {
                    // Reset storage for the room before storing the new wave of chunks
                    userStorage[roomKey] = [];
                }
            
                // Store the new chunk
                userStorage[roomKey].push(arg);
                console.log(userStorage[roomKey])
                const lastUserSocketID = Object.keys(users).find(key => users[key] === currentUsername);

                // Emit the data only to the socket corresponding to the last user who logged in
                if (lastUserSocketID) {
                    socket.in(lastUserSocketID).emit('broadcastedData', arg);
                }

            });
            
            // Listen for the signal indicating the start of a new wave of chunks
            socket.on('newWave2', function () {
                const roomKeys = Array.from(socket.rooms);
                const roomKey = roomKeys.find(key => key !== socket.id);
            
                // Reset storage for the room to erase the previous bunch of chunks
                userStorage[roomKey] = [];
                console.log(userStorage[roomKey])
            
            });

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
socket.on('startGame8',  arg   => {
        
    //console.log(arg)
    socket.in(room).emit('startGame8',arg);

})
socket.on('startGame9',  arg   => {
        
    //console.log(arg)
    socket.in(room).emit('startGame9',arg);

})
socket.on('startGame10',  arg   => {
        
    //console.log(arg)
    socket.in(room).emit('startGame10',arg);

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


io.on('connection', function (socket) {
  socket.on('editor', function (editor) {
    socket.join(editor);
    console.log('A user just connected to editor:', editor);

    // Retrieve stored data for the user in the specific room
    const storedData = userStorage[editor];
    console.log('Stored data:', storedData);

    // Emit stored data only when the user reconnects
    if (storedData && socket.handshake.query.isFirstConnection === 'false') {
        console.log(storedData);
      socket.emit('storedData', storedData);
    }
  });

  socket.on('savesceneonreload', function (arg) {
    const roomKeys = Array.from(socket.rooms);
    const roomKey = roomKeys.find(key => key !== socket.id);

    // Check if the signal for a new wave of chunks has been received
    if (userStorage[roomKey] === undefined) {
        // Reset storage for the room before storing the new wave of chunks
        userStorage[roomKey] = [];
    }

    // Store the new chunk
    userStorage[roomKey].push(arg);
    console.log(userStorage[roomKey])
});

// Listen for the signal indicating the start of a new wave of chunks
socket.on('newWave', function () {
    const roomKeys = Array.from(socket.rooms);
    const roomKey = roomKeys.find(key => key !== socket.id);

    // Reset storage for the room to erase the previous bunch of chunks
    userStorage[roomKey] = [];
    console.log(userStorage[roomKey])

});
  socket.on('save_big_data_and get_it_back',  arg  => {
    //console.log(arg)
    socket.emit('save_big_data_and get_it_back',arg);
    console.log(arg);
})
socket.on('savesceneandgetitback',  arg  => {
    //console.log(arg)
    socket.emit('savesceneandgetitback',arg);
    console.log(arg);
})
socket.on('saveteamandgetitback',  arg  => {
    //console.log(arg)
    socket.emit('saveteamandgetitback',arg);
    console.log(arg);
})
socket.on('jointeamandgetitback',  arg  => {
    //console.log(arg)
    socket.emit('jointeamandgetitback',arg);
    console.log(arg);
})
socket.on('logout', function () {
    console.log('User logged out:', socket.id);
    userStorage[socket.id] = []; // Clear user data in userStorage
    console.log(userStorage);
    console.log(userStorage[socket.id]);
  });
  socket.on('disconnect', function () {
    console.log('A user has disconnected.');
  });
});

/////////////////////////////////////////////////////////////////////////////sign up///////////////////////////////////////////////////////////////////////////////////////

io.on('connection', function(socket) {
    socket.on('signup', function (signup) {
        socket.join(signup);

        console.log('A user just connected.');
socket.on('checkUsername',  arg  => {
    console.log(arg);
    if (existingUsernames.includes(arg) || existingUsernames2.includes(arg)) {
        console.log(arg);
        io.emit('UsernameStatus', 'taken');
    } else {
        io.emit('UsernameStatus', 'available');
        console.log(arg);

    }
})

socket.on('checkMail',  arg  => {
    console.log(arg);
    if (existingemails.includes(arg)|| existingemails2.includes(arg)) {
        console.log(arg);
        io.emit('EmailStatus', 'taken');
    } else {
        io.emit('EmailStatus', 'available');
        console.log(arg);

    }
})

socket.on('checkPass',  arg  => {
        io.emit('PassStatus', arg);
})
socket.on('checkrePass',  arg  => {
    io.emit('PassStatus2', arg);
})
socket.on('disconnect', () => {
    console.log('User disconnected');
});
    });
});
