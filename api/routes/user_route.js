const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user_model')
const { array_contain } = require('../utils/utils')

/**
 * user-POST: Create a new user. Respond with details of new user
 */
router.post("/", async (req, res) =>{
    // check required fields were set
    console.log(req.body)
    try{
    if (req.body.name && req.body.password){
        // make sure joinedEvent contains attendedEvent
        let attendedEvent_arr = array_contain(req.body.joinedEvent,req.body.attendedEvent )
        let newUser = {
            name:req.body.name,
            password:req.body.password,
            friends: req.body.friends || [],
            avatar: req.body.avatar || `'https://www.tinygraphs.com/spaceinvaders/${req.body.name}'`,
            bio: req.body.bio || `There is nothing here yet`,
            joinedEvent: req.body.joinedEvent || [],
            attendedEvent: attendedEvent_arr
        }

        // Try to create new User, throw error on fail
        User.create(newUser, async function(err, res_user){
            if (err){
                res.status(500).send({message:`Create new user fail`, data:{}})
            } else {
                // TODO: Update events in joinedEvent and attended, delete if event not found
                res.status(201).send({message: 'create new user OK', data:res_user});
            }
        })
    }
    }catch(e){console.log(e)}
}) // end of user-POST

/**
 * user-GET: Respond with a List of users
 */
router.get("/", async (req, res) =>{
    let operation = 'users'
    const queries = req.query;
    // where - filter results based on JSON query
    const conditions = queries.where ? JSON.parse(queries.where) : {};
    // select - set of fields to include or exclude (1 - include; 0 - exclude)
    const select = queries.select ? JSON.parse(queries.select) : {};
    const options = {};
    options.limit = parseInt(queries.limit) || 0;
    options.sort = queries.sort ? JSON.parse(queries.sort) : {};
    User.find(conditions, select, options, function (err, actual_res) {
        if (err) {
            res.status(500).send({ message: `Get many ${operation} fail`, data: {} })
        } else {
            res.status(200).send({ message: `Get many ${operation} OK`, data: actual_res });
        }
    });
}) // end of user-GET

/**
 * user:id - DELETE
 */
router.delete("/:id", async (req, res) => {
    User.findOneAndDelete(req.params.id, function (err, deleteUser){
        if (err) {
            res.status(404).send({message: 'User Not Found to delete', data: {} });
        } else {
            // TODO update corresponding event, delete created post
            res.status(200).send({message: 'Delete task OK', data: deleteTask});
        }
    })
})





module.exports = router;





