const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Event = require('../models/event_model')

/** #########################################################
 * event-Event: Create a new event. Respond with details of new event
 */
router.post("/", async (req, res) =>{
    try{
        if (req.body.name && req.body.time && req.body.creator && req.body.lat && req.body.lng){
            let newEvent = {
                name      :req.body.name,
                time      :req.body.time,
                creator   :req.body.creator,
                lat       :req.body.lat,
                lng       :req.body.lng
            }
            // Try to create new User, throw error on fail
            Event.create(newEvent, async function(err, resEvent){
                if (err){
                    res.status(500).send({message:`Create new event fail`, data:{}})
                } else {
                    // TODO: check if creator and id in joinUser actualy exists
                    res.status(201).send({message: 'create new event OK', data:resEvent});
                }
            })
        } else {
            res.status(500).send({message:`Initialization of name, time, creator, lat and lng are required`, data:{}})
        }

    }catch(e){
        res.status(500).send({message:`Create new event fail`, data:{}})
    }
}) // end of event-Event


/** ######################################
 * Event-GET: Respond with a List of Events
 */
 router.get("/", async (req, res) =>{
    let operation = 'Event'
    const queries = req.query;
    // where - filter results based on JSON query
    const conditions = queries.where ? JSON.parse(queries.where) : {};
    // select - set of fields to include or exclude (1 - include; 0 - exclude)
    const select = queries.select ? JSON.parse(queries.select) : {};
    const options = {};
    options.limit = parseInt(queries.limit) || 0;
    options.sort = queries.sort ? JSON.parse(queries.sort) : {};
    Event.find(conditions, select, options, function (err, actual_res) {
        if (err) {
            res.status(500).send({ message: `Get many ${operation} fail`, data: {} })
        } else {
            res.status(200).send({ message: `Get many ${operation} OK`, data: actual_res });
        }
    });
}) // end of Event-GET



/** ############################################################################
 * Event/:id-GET: Replace entire event with provided event or 404 err
 */
 router.get('/:id', async (req, res) => {
    Event.findById(req.params.id, function (err, resEvent) {
        if (err) {
            res.status(404).send({message: 'Event Not Found', data: {} });
        } else {
            res.status(200).send({message: 'OK', data: resEvent});
        }
    });
});

/** ############################################################################
 * event/:id-PUT: Event change by id Respond with details of specified Event or 404 error
 */
 router.put('/:id', async (req, res) => {
    const model = `Event`
    if (req.body._id) {
        delete req.body._id;
    }
    if (req.body.name && req.body.time && req.body.creator && req.body.lat && req.body.lng){
        Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, async function(err, newRes){
            if (err) {
                res.status(404).send({message: `${model} Not Found to update`, data: {} })
            } else {
                res.status(200).send({ message: `UPDATE ${model} successful `, data: newRes})
            }
        })
    } else {
        res.status(500).send({message:`Initialization of name, time, creator, lat and lng in ${model} are required`, data:{}})
    }
});


/** ############################################################################
 * Event:id - DELETE
 */
router.delete("/:id", async (req, res) => {
    const model = `Event`
    Event.findOneAndDelete(req.params.id, function (err, deleteRes){
        if (err) {
            res.status(404).send({message: `${model} Not Found to delete`, data: {} });
        } else {
            res.status(200).send({message: `Delete ${model} OK`, data: deleteRes});
        }
    })
})











module.exports = router;