/////////////////////////////////////////////
//Core Modules
/////////////////////////////////////////////
//arguments is an array in JavaScript. It contains all of the values passed into a function
//The 5 arguments of the Wrapper function: (exports, require, module, --filename, --dirname)
console.log(arguments)
console.log(require('module').wrapper)

/////////////////////////////////////////////
//Developer Modules
/////////////////////////////////////////////
//module.exports
const C = require('./test-module-1')
const calc1 = new C()
console.log(calc1.add(2,5))


//exports
//const calc2 = require('./test-module-2')
// console.log(calc2.add(4, 4))
// console.log(calc2.multiply(4, 4))

//ES6 Destructuring way. They have to be the exact same name as the original object
//But you don't have to import all of them
//This creates a variable for add, multiply, divide
const { add, multiply, divide } = require('./test-module-2')
console.log(add(4, 4))
console.log(multiply(4, 4))


//caching
//Here we require it then immediately call the funtion with ()
//results will show that 'Hello from the 3rd module' is only logged once because the module is cached
//So the next time it is called, it doesn't have to reload the module, it can simply use the cached result
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()



/////////////////////////////////////////////
//NPM Modules - 3rd Party
/////////////////////////////////////////////