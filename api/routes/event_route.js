const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Event = require('../models/event_model')

/**
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
                lng       :req.body.lng,
                joinUser  :req.body.joinUser || [req.body.creator],
                showupUser:req.body.showupUser || []
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
        }

    }catch(e){
        res.status(500).send({message:`Create new event fail`, data:{}})
    }
    

}) // end of event-Event


/**
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



/**
 * Event/:id-GET: Event get by id Respond with details of specified Event or 404 error
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


/**
 * Event:id - DELETE
 */
router.delete("/:id", async (req, res) => {
    Event.findOneAndDelete(req.params.id, function (err, deleteEvent){
        if (err) {
            res.status(404).send({message: 'Event Not Found to delete', data: {} });
        } else {
            res.status(200).send({message: 'Delete task OK', data: deleteEvent});
        }
    })
})











module.exports = router;