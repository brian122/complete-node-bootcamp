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
const morgan = require('morgan')


/////////////////////////////////////////////
/// Top-Level Code - Only executed once on start up
/////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////
/// Middleware
/////////////////////////////////////////////
app.use(morgan('dev'))
//funtion that can modify the incoming request data. 
//It stands between the req and res
app.use(express.json())

//define our own middleware function
//placement of the middleware in the code matters
app.use((req, res, next) => {
    console.log('Hello from the Middleware!')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

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
//Lesson:67 separating the HTTP Method and URL from the Route Handler funtions

/////////////////////////////////////////////
/// Route Handler Functions
/////////////////////////////////////////////

//Tour Functions
const getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            //tours: tours
            tours
        }
    })
}


//could have optional parameters using ?
//app.get('/api/v1/tours/:id/:x?/:y?', (req, res)

const getTour = (req, res) => {
    console.log(req.params)

    const id = Number(req.params.id)
    //const id = req.params.id *1  // can implicitly change variable type

    const tour = tours.find(el => el.id === id)

    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}


const createTour = (req, res) => {
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
}




const updateTour = (req, res) => {
    const id = Number(req.params.id)
    if (id > tours.length) {
        //console.log(Number(req.params.id))
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}


const deleteTour = (req, res) => {
    const id = Number(req.params.id)
    if (id > tours.length) {
        //console.log(Number(req.params.id))
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}

//User Functions
const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

/////////////////////////////////////////////
/// Routing HTTP Methods and URLs
/////////////////////////////////////////////

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

app 
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser)

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

/////////////////////////////////////////////
/// Web Server
/////////////////////////////////////////////
const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

