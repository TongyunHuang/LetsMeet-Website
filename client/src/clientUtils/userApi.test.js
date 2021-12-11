import axios from 'axios'
// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

const apiUser = 'http://localhost:4000/api/user'

/**
 * GET request 
 */
const getAllUser = () => {
    console.log('call getAllUser in client')
    axios({ method: 'GET',url: 'http://localhost:4000/api/user' })
        .then(function(res) {
            console.log(res)
            return res.length})
        .catch(function (err) {
            console.log(err)
            return 0
        })
}

test('get all user return more than 1 users', () =>{
    return getAllUser().then(data => {    
        expect(data).toBeGreaterThanOrEqual(1)
    })

})
