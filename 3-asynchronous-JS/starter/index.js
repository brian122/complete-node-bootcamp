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

//create a new funtion around the fs.readFile funtion and pass in a file name
//return the promise
//Promise takes in an executer funtion (fs.readFile) that does the async work
//If the promise is resolved, then it calls the resovle funtion with a fullfiled value 
//if the resolved promise is rejected then the reject funtion is called.
const readFilePro = file => {
    return new Promise((resolve, reject) => { 
        fs.readFile(file, (err, data) => {     
            if (err) reject('** ERROR: I could not find that file! **')
            resolve(data)
        })
    })
}

//create a new funtion 
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('** ERROR: Could not write file! **')
            resolve('Success')
        })
    })
}

//Using Async/Await
//async keyword is a special funtion that is asynchronous. They never block the Event Loop.
//They also return a promise
//async functions can have one or more await expressions
//wrap the internal with a try/catch block
const getDogPic = async () => {
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`Breed: ${data}`) //Breed: schnauzer

        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        console.log(res.body.message) //https://images.dog.ceo/breeds/schnauzer/n02097209_1363.jpg

        await writeFilePro('dog-img.txt', res.body.message)
        console.log('Random dog image saved to file!')
    } catch (err) {
        console.log(err)
    }
}
getDogPic()

//using the readFilePro and writeFilePro functions
//These still use Callback functions
/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`) //Breed: schnauzer
        return superagent .get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res => {
        console.log(res.body.message) //https://images.dog.ceo/breeds/schnauzer/n02097209_1363.jpg
        return writeFilePro('dog-img.txt', res.body.message) 
    })
    .then(() => {
        console.log('Random dog image saved to file!')
    })
    .catch(err => {
        console.log(err) 
    }) 
*/


// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`) //Breed: schnauzer

//     // This implements superagent using a callback function
//     // superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
//     //   if (err) return console.log(err.message) 
//     //   console.log(res.body.message)

//     //   fs.writeFile('dog-img.txt', res.body.message, err => {
//     //       if (err) return console.log(err.message)
//     //       console.log('Random dog image saved to file')
//     // })

//     //This implements superagent with a promise
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {
//         console.log(res.body.message) //https://images.dog.ceo/breeds/schnauzer/n02097209_1363.jpg

//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if (err) return console.log(err.message)
//             console.log('Random dog image saved to file')
//         })
//     }).catch (err => {
//         console.log(err.message) 

//    }) 

// })
