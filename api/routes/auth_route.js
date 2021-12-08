const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')

router.get('/',(req, res) =>{
    return res.status(200).send({message:'auth api'})
})

router.post('/', (req, res, next)=>{
    console.log(`auth api, body: ${req.body.name}, ${req.body.password}`)
    passport.authenticate('local',function (err, user, info){
        if (err){
            return res.status(400).send({message:'Error when logging in'})
        }
        if (user){
            return res.status(200).send({message:`Sucessfully login ${user.name}`})
        } else {
            return res.status(403).send({message:'wrong password'})
        }
    })(req, res, next)
})

module.exports = router
