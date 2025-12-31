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

/////////////////////////////////////////////
/// Middleware
/////////////////////////////////////////////
//funtion that can modify the incoming request data. 
//It stands between the req and res
app.use(express.json())

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

app.post('/api/v1/tours', (req, res) => {
    //console.log(req.body)
    //the DB normally creates a new ID
    //we will just +1 the last object in the json file
    const newId = tours[tours.length -1].id + 1
    //Object.assign creates a new object by merging two objects
    //could have req.body.id = newID but didn't want to mutate the original
    const newTour = Object.assign({ id: newId }, req.body)
    //push the new tour into the tours array
    tours.push(newTour)
    //persist the change to the file
    //We use the writeFile not the writeFileSync so we don't block the event loop
    //we have to stringify the tours object
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        //status of 201 = created
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
    //since we are res with status we don't need this send
    //res.send('Done')
})
/////////////////////////////////////////////
/// Web Server
/////////////////////////////////////////////
const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

