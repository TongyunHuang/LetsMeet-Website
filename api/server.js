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


app.get('/',(req,res) =>{
    res.send('Hello World!')
})

// Use routes as a module
require('./routes')(app, router);

// Start the server
app.listen(port, () => {
    console.log(`local app listening at http://localhost:${port}`)
  })