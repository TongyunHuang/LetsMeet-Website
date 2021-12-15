const mongoose = require('mongoose')

/** Schema of User
 * "name" - String     `Required`
 * "password" - String    `Required`
 * "joinedEvent" - [String]
 * "attendedEvent" - [String]
*/

const user_schema = new mongoose.Schema({
    name:         { type:String, required: true },
    password:     { type:String, required: true },
    bio:          { type:String, default:'There is nothing here yet' },
    friends:      { type:[String], default:[] },
    color: { type: String, default: "#" + Math.floor(Math.random() * 16777215).toString(16)}
},{ versionKey:false })

// Export the Mongoose Model
module.exports = mongoose.model('User', user_schema)