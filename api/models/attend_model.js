// Load required packages
var mongoose = require('mongoose');


/**
 * "userId" - String `Require`
 * "eventId" - String `Require`
 * "status" - String default: 'join', option: 'missed', 'attended'
 */

const attend_schema = new mongoose.Schema({
    userId : {type:String, require:true },
    eventId: {type:String, require:true },
    status : {type:String, default: 'join'}
},{ versionKey:false })

// Export the Mongoose Model
module.exports = mongoose.model('Attend', attend_schema)