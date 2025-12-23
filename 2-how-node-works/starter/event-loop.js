
/////////////////////////////////////////////////////////////////
//These are automatically offloaded to the Thread Pool
/////////////////////////////////////////////////////////////////
const fs = require('fs')
const crypto = require('crypto')

const start = Date.now()

//Set the libuv Thread Pool size
//process.env.UV_THREADPOOL_SIZE = 2

/////////////////////////////////////////////////////////////////
//In this example they are not running inside of the Event Loop
//They need to be inside of a callback function
/////////////////////////////////////////////////////////////////
setTimeout(() => console.log('Timer 1 finished'), 0)
setImmediate(() => console.log('Immediate 1 finished'))

fs.readFile('test-file.txt', () => {
    console.log('I/O finished')
    console.log('-----------------')
    console.log('In the Event Loop')
    console.log('-----------------')

    setTimeout(() => console.log('Timer 2 finished'), 0)
    setTimeout(() => console.log('Timer 3 finished'), 3000)
    setImmediate(() => console.log('Immediate 2 finished'))

    process.nextTick(() => console.log('Process.nextTick'))

    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted')
    // })
    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted')
    // })
    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted')
    // })
    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted')
    // })

  
    //These use the synchronous method. They will block the Thread Pool.
    //Notice they don't use a callback function
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
    console.log(Date.now() - start, 'Password encrypted')
  
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
    console.log(Date.now() - start, 'Password encrypted')
    
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
    console.log(Date.now() - start, 'Password encrypted')
    
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
    console.log(Date.now() - start, 'Password encrypted')
    
})

console.log('-----------------')
console.log('Outside the Event Loop')
console.log('-----------------')
console.log('Hello from the top-level code')
