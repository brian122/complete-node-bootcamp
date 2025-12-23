///////////////////////////////////////////
//with callbacks inside of callbacks
//going to read the dog breed from dog.txt
//do an http request to get random image
//save image to another file dog-img.txt
/////////////////////////////////////////://

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
const superagent = require('superagent')

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`)

   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
    if (err) return console.log(err.message) 
    console.log(res.body.message)

    fs.writeFile('dog-img.txt', res.body.message, err => {
        if (err) return console.log(err.message)
        console.log('Random dog image saved to file')
    })

   }) 
   
})
