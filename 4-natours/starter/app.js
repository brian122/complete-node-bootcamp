/////////////////////////////////////////////
//Core Modules
/////////////////////////////////////////////

/////////////////////////////////////////////
//Developer Modules
/////////////////////////////////////////////
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

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
//we can use the NODE_ENV variable here because we used the dotenv.config in the server.js file
//it is now available in all the files in the project
if (process.env.NODE_ENV === 'development') {
    //logger middleware
    app.use(morgan('dev'))
}

//funtion that can modify the incoming request data. 
//It stands between the req and res
app.use(express.json())
//server static files from a folder instead of a route
app.use(express.static(`${__dirname}/public`))


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




/////////////////////////////////////////////
/// Routing HTTP Methods and URLs
/////////////////////////////////////////////

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)


//set up the express middleware routers
//creates a small sub-app to Mount the Router to the route
//can't mount the routers before they are declared (e.g. const userRouter = express.Router())
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app

