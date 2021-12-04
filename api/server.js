const express = require('express')
const app = express()
const port = process.env.Port || 4000

app.get('/',(req,res) =>{
    res.send('Hello World!')
})



// Start the server
app.listen(port);
console.log('Server running on port ' + port);