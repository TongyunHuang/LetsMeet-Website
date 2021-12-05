const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = require('../models/post_model')

/**
 * post-POST: Create a new post. Respond with details of new post
*/
router.post("/", async (req, res) =>{

}) // end of post-POST








/**
 * post-GET: Respond with a List of posts
 */
router.get("/", async (req, res) =>{

}) // end of post-GET








module.exports = router;