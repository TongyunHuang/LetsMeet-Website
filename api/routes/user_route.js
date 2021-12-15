const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user_model");
const { array_contain } = require("../lib/utils");

/** ############################################################################
 * user-POST: Create a new user. Respond with details of new user
 */
router.post("/", async (req, res) => {
  // check required fields were set
  try {
    if (req.body.name && req.body.password) {
      // check for duplicate userusername
      const ifDup = await User.findOne({ name: req.body.name });
      if (ifDup) {
        res.status(400).json({
          message: `Username ${req.body.name} already taken`,
        });
        return;
      }

      // creat new user
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        name: req.body.name,
        password: hashedPassword,
        friends: req.body.friends || [],
        bio: req.body.bio || `There is nothing here yet`,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      };

      // Try to create new User, throw error on fail
      User.create(newUser, async function (err, res_user) {
        if (err) {
          res.status(500).send({ message: `Create new user fail`, data: {} });
        } else {
          // TODO: Update events in joinedEvent and attended, delete if event not found
          res
            .status(201)
            .send({ message: "create new user OK", data: res_user });
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}); // end of user-POST


/** ############################################################################
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

router.get("/", async (req, res) => {
  console.log("Here is the user get all api");
  let operation = "users";
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
      res.status(500).send({ message: `Get many ${operation} fail`, data: {} });
    } else {
      res
        .status(200)
        .send({ message: `Get many ${operation} OK`, data: actual_res });
    }
  });
}); // end of user-GET



/** ############################################################################
 * user/:id-GET: user get by id Respond with details of specified user or 404 error
 */
router.get("/:id", async (req, res) => {
  console.log(`get user by id request with id ${req.params.id}`)
  User.findById(req.params.id, function (err, res_user) {
    if (err) {
      res.status(404).send({ message: "User Not Found", data: {} });
    } else {
      res.status(200).send({ message: "OK", data: res_user });
    }
  });
});

/** ############################################################################
 * user/:id-PUT: User change by id Respond with details of specified User or 404 error
 */

 router.put('/:id', async (req, res) => {
    const model = `User`
    if (req.body._id) {
        delete req.body._id;
    }
    if (req.body.name && req.body.password){
        User.findByIdAndUpdate(req.params.id, req.body, {new: true}, async function(err, newRes){
            if (err) {
                res.status(404).send({message: `${model} Not Found to update`, data: {} })
            } else {
                res.status(200).send({ message: `UPDATE ${model} successful `, data: newRes})
            }
        })
    } else {
        res.status(400).send({message:`Initialization of name, password in ${model} are required`, data:{}})
    }

});

/** ############################################################################
 * user:id - DELETE
 */
router.delete("/:id", async (req, res) => {

    User.findOneAndDelete(req.params.id, function (err, deleteTask){
        if (err) {
            res.status(404).send({message: 'User Not Found to delete', data: {} });
        } else {
            res.status(200).send({message: 'Delete task OK', data: deleteTask});
        }
    })
})


module.exports = router;

