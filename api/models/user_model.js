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
    avatar:       { type:String, default:'https://www.tinygraphs.com/spaceinvaders/helloworld'},
    friends:      { type:[String], default:[] },
    joinedEvent:  { type:[String], default:[] },
    attendedEvent:{ type:[String], default:[] }
},{ versionKey:false })

// Export the Mongoose Model
module.exports = mongoose.model('User', user_schema)