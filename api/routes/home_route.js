const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const secrets = require('../config/secrets');

router.get('/',function(req,res){
    res.json({message:`Connected to MongoDB with token:${secrets.token} `})
})
module.exports = router;