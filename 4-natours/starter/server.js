//mongoose is mongodb driver and ODM library
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
//the environment varialbe needs to be before the app file
const app = require('./app')

//Environment Variables
console.log(app.get('env')) //set by express
// console.log(process.env) //process is a core module

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

// //create a tour schema
// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'A tour must have a name'],
//     unique: true
//   },
//   rating: {
//     type: Number,
//     default: 4.5
//   },
//   price: {
//     type: Number,
//     required: [true, 'A tour must have a price']
//   }
// })
// //create a model. Convention is alway use upper case on model names and variables 
// const Tour = mongoose.model('Tour', tourSchema)

//create a new document (row) out of the Tour model
// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 497
// })

//test adding a document to the MongoDB
// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 933
// })

// testTour.save().then(doc => {
//   console.log(doc)
// }).catch(err => {
//   console.log('*** TOUR SAVE ERROR! ***', err)
// })

/////////////////////////////////////////////
/// Web Server
/////////////////////////////////////////////
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
