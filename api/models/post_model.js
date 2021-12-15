const mongoose = require('mongoose')

/** Schema of Post
 * "content" - String  `Required`
 * "userId" - String  `Required`
 * "likeCount" - Interger
*/

const post_schema = new mongoose.Schema({
    content: { type:String, required:true },
    userId: {  type:String, required:true },
    name: { type: String, required: true },
    date: {type:Date, default: Date.now},
    likeCount:{ type:Number, default:0},
    color: {type: String, default: 'pink' }
},{ versionKey:false })

// Export the Mongoose Model
module.exports = mongoose.model('Post', post_schema)