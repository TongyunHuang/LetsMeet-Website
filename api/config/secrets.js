/*
 * You generally want to .gitignore this file to prevent important credentials from being stored on your public repo.
 */
module.exports = {
    token : "secret-starter-mern",
    mongo_connection : "mongodb+srv://admin:eIswtL7BSTsovN2L@cluster0.vf9da.mongodb.net/cs498rk-project?retryWrites=true&w=majority",
    //mongo_connection: process.env.MONGODB_URI,
    
};
// heroku config:set MONGODB_URI="mongodb+srv://admin:eIswtL7BSTsovN2L@cluster0.vf9da.mongodb.net/cs498rk-project?retryWrites=true&w=majority"