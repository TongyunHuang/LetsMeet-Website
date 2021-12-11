const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const secrets = require('./config/secrets');
const bodyParser = require('body-parser');
const port = process.env.Port || 4000
const session = require('express-session')
const passport = require('./config/passport')
const MongoStore = require('connect-mongo')(session)
const cors = require("cors")
const cookieParser = require("cookie-parser");

/**
 * -------------- GENERAL SETUP---------------
 */
// Create our Express application
const app = express();
// Connect to a MongoDB
mongoose.connect(secrets.mongo_connection, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// allow access from localhost 3000
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );

/**
 * ---------------- SESSION SETUP ---------------
 */
const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
})

// request.session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}))

/**
 * --------------- PASSPORT AUTHENTICATION ---------------
 */
 app.use(cookieParser("secret"));

// initialize passport middleware
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')
// will run before every api routing, for debug purpose
app.use((req, res, next) => {
    // console.log(req.session)
    console.log("api get called")
    next()
})


/**
 * --------------- ROUTE AND SERVER ---------------
 */
 app.get('/', (req, res) => {
    res.send('Hello World!')
})
// Use routes as a module
require('./routes')(app, router);

// Start the server
app.listen(port, () => {
    console.log(`local app listening at http://localhost:${port}`)
  })