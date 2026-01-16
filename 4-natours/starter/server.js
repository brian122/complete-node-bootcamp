//mongoose is mongodb driver
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
//the environment varialbe needs to be before the app file
const app = require('./app')

//create a variable to hold our mongoDB connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
//using mongoose connect method to connect to our mongoDB 
//pass in our connection string from env files
mongoose.connect(DB).then((con) => {
  console.log(con.connection);
  console.log('DB connection successfull!');
});

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
