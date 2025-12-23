//EXAMPLE - Read a large text file and send it to the client

/////////////////////////////////////////////
//Core Modules
/////////////////////////////////////////////
const fs = require('fs')
//NEW way of creating a Web Server!
const server = require('http').createServer()


/////////////////////////////////////////////
//Listeners
/////////////////////////////////////////////
server.on('request', (req, res) => {
    //Solution 1: Simple read file into variable then once done send to client
    //Node has to load the entire file into memory before it can send
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) { console.log(err) }
    //     res.end(data)
    // })

    //Solution 2: Use Streams
    //instead of creating a variable (like data above) we create a stream to store data chunk by chunk
    // const readable = fs.createReadStream('test-file.txt')
    //a readable stream emits the data event that we can listen to
    //response is also a writable stream
    // readable.on('data', chunk => {
    //     res.write(chunk)
    // })

    // readable.on('end', () => {
    //     res.end()
    // })

    // readable.on('error', err => {
    //     console.log(err)
    //     res.statusCode = 500
    //     res.end('File not Found!')
    // })

    //Solution 3: The readable stream that reads the file is much faster than the 
    //response stream can handle. This creates Back Pressure
    //Use the pipe() operator to pipe the readable stream directly into the writable stream
    //automatically hands the speed of data coming and and data going out
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res)

})

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening...')
})