const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user_model')


const customFields = {
    usernameField: 'name',
    passwordField: 'password'
}

/**
 * If cannot find the user, new user is created with the password
 * If user found, provided password was compared with the stored pw
 * @param {String} username name field in DB
 * @param {String} password password field in DB
 * @param {Callback} done   callback function
 */
const VerifyCallback = (username, password, done) => {
    consolue.log('verifycallback')
    User.findOne({ name:username })
        .then(user =>{
            // create new user if not found
            if (!user){
                let newUser = {
                    name:username, password:password,
                    avatar: `'https://www.tinygraphs.com/spaceinvaders/${username}'`
                }
                // Try to create new User, throw error on fail
                User.create(newUser, async function(err, res_user){
                    if (err){
                        return done(err)
                    } else { 
                        return done(null, res_user)
                    }
                })
            } 
            // verify pw 
            else{
                const isValid = (user.password === password)
                if (isValid){
                    return done(null, user) // no err, correct pw
                } else {
                    return done(null, false)// no err, wrong pw
                }

            }
        }).catch((err) =>{
            done(err)
        })
}

const strategy = new LocalStrategy(customFields, VerifyCallback)
passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

module.exports = passport

