const mongoose = require('mongoose')

/** Schema of Event
 * "name" - String `Required`
 * "time" - Date `Required`
 * "creator" - String `Required`
 * "lat" - Double `Required`
 * "lng" - Double `Required`
 * "joinUser" - [String]
 * "showupUser" - [String]
*/

const event_schema = new mongoose.Schema({
    name      :{type:String, required:true},
    time      :{type:Date  , required:true},
    creator   :{type:String, required:true},
    lat       :{type:Number, required:true},
    lng       :{type:Number, required:true},
    joinUser  :{type:[String], default:[]},
    showupUser:{type:[String], default:[]}
},{ versionKey:false })

// Export the Mongoose Model
module.exports = mongoose.model('Event', event_schema)