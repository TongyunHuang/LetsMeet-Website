const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = require('../models/post_model')

/**
 * post-POST: Create a new post. Respond with details of new post
*/
router.post("/", async (req, res) =>{
    try{
        if (req.body.content && req.body.userId){
            let newPost = {
                content:  req.body.content,
                userId:   req.body.userId,
                likeCount:req.body.likeCount || 0
            }
            // Try to create new Post, throw error on fail
            Post.create(newPost, async function(err, resPost){
                if (err){
                    res.status(500).send({message:`Create new post fail`, data:{}})
                } else {
                    // TODO: check if user id actually exist
                    res.status(201).send({message: 'create new post OK', data:resPost});
                }
            })
        }
    } catch(e){console.log(e)}

}) // end of post-POST



/**
 * post-GET: Respond with a List of posts
 */
 router.get("/", async (req, res) =>{
    let operation = 'post'
    const queries = req.query;
    // where - filter results based on JSON query
    const conditions = queries.where ? JSON.parse(queries.where) : {};
    // select - set of fields to include or exclude (1 - include; 0 - exclude)
    const select = queries.select ? JSON.parse(queries.select) : {};
    const options = {};
    options.limit = parseInt(queries.limit) || 0;
    options.sort = queries.sort ? JSON.parse(queries.sort) : {};
    Post.find(conditions, select, options, function (err, actual_res) {
        if (err) {
            res.status(500).send({ message: `Get many ${operation} fail`, data: {} })
        } else {
            res.status(200).send({ message: `Get many ${operation} OK`, data: actual_res });
        }
    });
}) // end of post-GET




/**
 * post/:id-GET: post get by id Respond with details of specified post or 404 error
 */
 router.get('/:id', async (req, res) => {
    Post.findById(req.params.id, function (err, res_post) {
        if (err) {
            res.status(404).send({message: 'Post Not Found', data: {} });
        } else {
            res.status(200).send({message: 'OK', data: res_post});
        }
    });
});


/**
 * post:id - DELETE
 */
router.delete("/:id", async (req, res) => {
    Post.findOneAndDelete(req.params.id, function (err, deletePost){
        if (err) {
            res.status(404).send({message: 'Post Not Found to delete', data: {} });
        } else {
            res.status(200).send({message: 'Delete task OK', data: deletePost});
        }
    })
})







module.exports = router;