const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const secrets = require('./config/secrets')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.Port || 4000

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
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.send('Hello World!')
})

// Use routes as a module
require('./routes')(app, router);

// Start the server
app.listen(port, () => {
    console.log(`local app listening at http://localhost:${port}`)
  })