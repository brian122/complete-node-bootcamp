/////////////////////////////////////////////
//Core Modules
/////////////////////////////////////////////
const EventEmitter = require('events')
const http = require('http')

//create an instance of the events class
//Emit named events, and we subscribe (listen) to them accordingly
//kind of like setting up an event listener on a dumb element like clicking a button
//const myEmitter = new EventEmitter()

//BUT!!
//In the real world. You should create a new Class that inherits from the Node EventEmitter
//EventEmitter is the Super Class from events, and Sales is a Parent Class that we created that inherits from it
class Sales extends EventEmitter{
    constructor() {
        //gives access to all of the methods
        super()
    }
}

//create an instance of the Sales Class
const myEmitter = new Sales()


//set up the Observers (listeners)
myEmitter.on('newSale', () => {
    console.log('There was a new sale!')
})

myEmitter.on('newSale', () => {
    console.log('Customer name: Brian')
})

//Listener can use the argument sent in the emitter
//shown here using the template string ${stock}. 
//** remember to use backticks with template string
myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock`)
})

//pretend building an online store
//make up an event name newSale
//myEmitter.emit('newSale')

//Can also pass arguments
myEmitter.emit('newSale', 9)


/////////////////////////////////////////////
/// Web Server
/////////////////////////////////////////////
const server = http.createServer()

server.on('request', (req, res) =>{
    console.log('Request received!')
    //shows why the requests are shown twice
    console.log(req.url)
    res.end('Request received')
})

server.on('request', (req, res) =>{
    console.log('Another request 😁')
})

server.on('close', (req, res) => {
    console.log('Server Closed')
})

//Start the server
server.listen(3000, '127.0.0.1', () => {
    console.log('Waiting for requests...')
})
