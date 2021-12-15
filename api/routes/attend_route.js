const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Attend = require('../models/attend_model')

/** #########################################################
 * attend/-Post: Create a new Attend. Respond with details of new Attend
 */
 router.post("/", async (req, res) =>{
    try{
        if (req.body.userId && req.body.eventId){
            const ifDup = await Attend.countDocuments({ userId: req.body.userId, eventId: req.body.eventId })
            if (ifDup > 0) {
                res.status(200).send({message: 'already attended', data: {}});
                return
            }
            let newAttend = {
                userId:  req.body.userId,
                eventId: req.body.eventId
            }
            // Try to create new Attend, throw error on fail
            Attend.create(newAttend, async function(err, resAttend){
                if (err){
                    res.status(500).send({message:`Create new Attend fail`, data:{}})
                } else {
                    // TODO: check if user and event id exitst
                    res.status(201).send({message: 'create new Attend OK', data:resAttend});
                }
            })
        }

    }catch(e){
        res.status(500).send({message:`Create new Attend fail`, data:{}})
    }
}) // end of Attend-Attend


/** ######################################
 * attend/-GET: Respond with a List of Attends
 */
 router.get("/", async (req, res) =>{
    let operation = 'Attend'
    const queries = req.query;
    // where - filter results based on JSON query
    const conditions = queries.where ? JSON.parse(queries.where) : {};
    // select - set of fields to include or exclude (1 - include; 0 - exclude)
    const select = queries.select ? JSON.parse(queries.select) : {};
    const options = {};
    options.limit = parseInt(queries.limit) || 0;
    options.sort = queries.sort ? JSON.parse(queries.sort) : {};
    Attend.find(conditions, select, options, function (err, actual_res) {
        if (err) {
            res.status(500).send({ message: `Get many ${operation} fail`, data: {} })
        } else {
            res.status(200).send({ message: `Get many ${operation} OK`, data: actual_res });
        }
    });
}) // end of Event-GET




/** ############################################################################
 * attend/:id-GET: Replace entire Attend with provided Attend or 404 err
 */
router.get('/:id', async (req, res) => {
    Attend.findById(req.params.id, function (err, resEvent) {
        if (err) {
            res.status(404).send({message: 'Attend Not Found', data: {} });
        } else {
            res.status(200).send({message: 'OK', data: resEvent});
        }
    });
});


/** ############################################################################
 * attend/:id-PUT: Attend change by id Respond with details of specified Attend or 404 error
 */
router.put('/:id', async (req, res) => {
    const model = 'Attend'
    if (req.body._id) {
        delete req.body._id
    }
    if (req.body.userId && req.body.eventId){
        Attend.findByIdAndUpdate(req.params.id, req.body, {new: true}, async function(err, newRes){
            if (err) {
                res.status(404).send({message: `${model} Not Found to update`, data: {} })
            } else {
                res.status(200).send({ message: `UPDATE ${model} successful `, data: newRes})
            }
        })
    } else {
        res.status(500).send({message:`Initialization of userId and eventId in ${model} are required`, data:{}})
    }
});


/** ############################################################################
 * attend/:id - DELETE
 */
router.delete("/:id", async (req, res) => {
    const model = `Attend`
    Attend.findOneAndDelete(req.params.id, function (err, deleteRes){
        if (err) {
            res.status(404).send({message: `${model} Not Found to delete`, data: {} });
        } else {
            res.status(200).send({message: `Delete ${model} OK`, data: deleteRes});
        }
    })
})

module.exports = router;