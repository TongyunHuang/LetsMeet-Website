
"use strict";
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");



const User = require("../models/user_model");

const customFields = {
  usernameField: "name",
  passwordField: "password",
};

/**
 * If cannot find the user, new user is created with the password
 * If user found, provided password was compared with the stored pw
 * @param {String} username name field in DB
 * @param {String} password password field in DB
 * @param {Callback} done   callback function
 */
const verifyCallback = (username, password, done) => {

    console.log(`verifycallback call !!!!!!!!${username}`)
    User.findOne({name:username} ,async function(err,user){
        console.log(user)
        if (err){
            return done(err)
        }
        if (!user) {
            return done(null, false);
        }
        // verify pw
        
            
        if (password === user.password ) {
            console.log('here')
            return done(null, user);
        } else {
                console.log('here2')
                return done(null, false);
        }
        
    })

}

  // console.log('verifycallback call !!!!!!!!')
  User.findOne({ name: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      // verify pw
      else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    })
    .catch((err) => {
      done(err);
    });
};



const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use("local", strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

module.exports = passport;
