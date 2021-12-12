const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  return res.status(200).send({ message: "auth api" });
});

<<<<<<< HEAD
router.post('/', (req, res, next)=>{
    
    passport.authenticate('local',function (err, user, info){
        if (err){
            return res.status(400).send({message:`Error when logging in `})
        }
        if (user){
            return res.status(200).send({message:`Sucessfully login ${user.name}`, data: user})
        } else {
            return res.status(403).send({message:`wrong password or user not exist`})
        }
    })(req, res, next)
})
=======
router.post("/", (req, res, next) => {
  // console.log(`auth api, body: ${req.body}, ${req.body.password}`)
  // console.log(req.body)
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).send({
        message: `Error when logging in name: ${req.body.name} with password ${req.body.password} `,
      });
    }
    if (user) {
      return res
        .status(200)
        .send({ message: `Sucessfully login ${user.name}`, data: user });
    } else {
      return res.status(403).send({
        message: `wrong usename ${req.body.name} or password ${req.body.password}`,
      });
    }
  })(req, res, next);
});
>>>>>>> main

module.exports = router;
