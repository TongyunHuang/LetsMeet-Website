const mongoose = require('mongoose')

/** Schema of Post
 * "content" - String  `Required`
 * "userId" - String  `Required`
 * "likeCount" - Interger
*/

const post_schema = new mongoose.Schema({
    content: { type:String, required:true },
    userId: {  type:String, required:true },
    likeCount:{ type:Number, default:0}
},{ versionKey:false })

// Export the Mongoose Model
module.exports = mongoose.model('Post', post_schema)