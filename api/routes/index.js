/**
 * Connect all endpoints here
 */
const user_route = require('./user_route')
const event_route = require('./event_route')
const post_route = require('./post_route')
const home_route = require('./home_route')
const auth_route = require('./auth_route')
const attend_route = require('./attend_route')

module.exports = function(app) {
    app.use('/api', home_route)
    app.use('/api/user', user_route)
    app.use('/api/post', post_route)
    app.use('/api/event', event_route) 
    app.use('/api/auth', auth_route)  
    app.use('/api/attend', attend_route)  
}
