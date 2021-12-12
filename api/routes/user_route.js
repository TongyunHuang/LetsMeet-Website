const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user_model");
const { array_contain } = require("../lib/utils");

/** ############################################################################
 * user-POST: Create a new user. Respond with details of new user
 */
<<<<<<< HEAD
router.post("/", async (req, res) =>{
    // check required fields were set
    console.log(req.body)
    try{
        if (req.body.name && req.body.password){
            // check for duplicate userusername
            const ifDup = await User.findOne({ name: req.body.username });
            if (ifDup) {
                console.log(ifDup)
                res.status(400).send({message:`Bad request. Username duplication`, data:{}})
                return;
            }
            // create new user / register
            let newUser = {
                name:req.body.name,
                password:req.body.password,
                friends: req.body.friends || [],
                avatar: req.body.avatar || `'https://www.tinygraphs.com/spaceinvaders/${req.body.name}'`,
                bio: req.body.bio || `There is nothing here yet`
            }

            // Try to create new User, throw error on fail
            User.create(newUser, async function(err, res_user){
                if (err){
                    res.status(500).send({message:`Create new user fail`, data:{}})
                } else {
                    res.status(201).send({message: 'create new user OK', data:res_user});
                }
            })
        } else {
            res.status(400).json({ message: `Initialization of name, password in User are required` });
        }
    }catch(e){
        console.log(e)
    }
}) // end of user-POST
=======
router.post("/", async (req, res) => {
  // check required fields were set
  console.log(req.body);
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
        avatar:
          req.body.avatar ||
          `'https://www.tinygraphs.com/spaceinvaders/${req.body.name}'`,
        bio: req.body.bio || `There is nothing here yet`,
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
>>>>>>> main

/** ############################################################################
 * user-GET: Respond with a List of users
 */
<<<<<<< HEAD
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
=======
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
>>>>>>> main

/** ############################################################################
 * user/:id-GET: user get by id Respond with details of specified user or 404 error
 */
router.get("/:id", async (req, res) => {
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
<<<<<<< HEAD
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
=======
router.put("/:id", async (req, res) => {
  const model = `User`;
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.name && req.body.password) {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      async function (err, newRes) {
        if (err) {
          res
            .status(404)
            .send({ message: `${model} Not Found to update`, data: {} });
        } else {
          res
            .status(200)
            .send({ message: `UPDATE ${model} successful `, data: newRes });
        }
      }
    );
  } else {
    res.status(500).send({
      message: `Initialization of name, password in ${model} are required`,
      data: {},
    });
  }
>>>>>>> main
});

/** ############################################################################
 * user:id - DELETE
 */
router.delete("/:id", async (req, res) => {
<<<<<<< HEAD
    User.findOneAndDelete(req.params.id, function (err, deleteTask){
        if (err) {
            res.status(404).send({message: 'User Not Found to delete', data: {} });
        } else {
            res.status(200).send({message: 'Delete task OK', data: deleteTask});
        }
    })
})


module.exports = router;

=======
  User.findOneAndDelete(req.params.id, function (err, deleteTask) {
    if (err) {
      res.status(404).send({ message: "User Not Found to delete", data: {} });
    } else {
      // TODO update corresponding event, delete created post
      res.status(200).send({ message: "Delete task OK", data: deleteTask });
    }
  });
});

module.exports = router;
>>>>>>> main
