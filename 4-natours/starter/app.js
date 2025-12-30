/////////////////////////////////////////////
//Core Modules
/////////////////////////////////////////////
const fs = require('fs')

/////////////////////////////////////////////
//Developer Modules
/////////////////////////////////////////////

/////////////////////////////////////////////
//NPM Modules - 3rd Party
/////////////////////////////////////////////
const express = require('express')


/////////////////////////////////////////////
/// Top-Level Code - Only executed once on start up
/////////////////////////////////////////////
const app = express()

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

/////////////////////////////////////////////
/// Routing
/////////////////////////////////////////////

// app.get('/', (req, res) => {
//     //res.status(200).send('Hello from the server side!')
//     res.status(200).json({message: 'Hello from the server side!', app: 'Natours'})
// })

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint...')
// })

//it is good to specify the API version so that you can change the API in the future
//the (res, req) => {} funtion is the Route Handler.
//we want to send back all of the data for the tours. tours is the resource.
//tours data comes from dev-data/tours-simple.json
//in ES6 if the key and value have the same name you don't have to specify them. Can just write tours.
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            //tours: tours
            tours
        }
    })
})
/////////////////////////////////////////////
/// Web Server
/////////////////////////////////////////////
const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

