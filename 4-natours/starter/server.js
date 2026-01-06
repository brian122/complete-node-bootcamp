const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
//the environment varialbe needs to be before the app file
const app = require('./app')



//Environment Variables
console.log(app.get('env')) //set by express
// console.log(process.env) //process is a core module


/////////////////////////////////////////////
/// Web Server
/////////////////////////////////////////////
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
