const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

/////////////////////////////////////////////
/// Route Handler Functions
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

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
