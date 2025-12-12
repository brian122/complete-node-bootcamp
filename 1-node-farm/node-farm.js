/////////////////////////////////////////////
//Core Modules
//https://nodejs.org/docs/latest/api/
//https://stackoverflow.com/questions/35824135/exact-list-of-node-core-modules
/////////////////////////////////////////////
const fs = require('fs');
const http = require('http')
const url = require('url')

/////////////////////////////////////////////
//Our Modules
//https://nodejs.org/api/modules.html
//Our directory is named modules but lib(short for library) is a commom directory used
//modules don't require .js
//can name the varialbe whatever. We named it the same because we had already written it.
//adding the ./ to the path tells Node not to look in the node_modules directory 
/////////////////////////////////////////////
const replaceTemplate = require('./starter/modules/replaceTemplate') 

/////////////////////////////////////////////
/// File System
/////////////////////////////////////////////

//Blocking, sychronous way
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/output.txt', textOut);
// console.log('File written')

//Non-Blocking, asynchronous way
// fs.readFile('./starter/txt/start.txt', 'utf8', (err, data1) => {
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf8', (err, data2) => {
//         console.log(data2)
//         fs.readFile('./starter/txt/append.txt', 'utf8', (err, data3) => {
//             console.log(data3)

//             fs.writeFile('./starter/txt/final-test.txt', `${data2}\n${data3}`, 'utf8', err => {
//                 console.log('Your file has been written 😁')
//             })
//         })
//     })
// })
// console.log('Will read file!')

//Handle error
// fs.readFile('./starter/txt/starterr.txt', 'utf8', (err, data1) => {
//     if (err) return console.log('ERROR! 🤬')
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf8', (err, data2) => {
//         console.log(data2)
//         fs.readFile('./starter/txt/append.txt', 'utf8', (err, data3) => {
//             console.log(data3)

//             fs.writeFile('./starter/txt/final-test.txt', `${data2}\n${data3}`, 'utf8', err => {
//                 console.log('Your file has been written 😁')
//             })
//         })
//     })
// })
// console.log('Will read file!')


/////////////////////////////////////////////
/// Web Server
/////////////////////////////////////////////

//replaceTemplate function takes in an html string template(tempCard) and a data object product(el) from the dataObj array 
// const replaceTemplate = (temp, product) => {
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
//     output = output.replace(/{%IMAGE%}/g, product.image)
//     output = output.replace(/{%PRICE%}/g, product.price)
//     output = output.replace(/{%FROM%}/g, product.from)
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
//     output = output.replace(/{%QUANTITY%}/g, product.quantity)
//     output = output.replace(/{%DESCRIPTION%}/g, product.description)
//     output = output.replace(/{%ID%}/g, product.id)

//     //if product is not organic then add the CSS not-organic to the div class so that it isn't displayed
//     if(!product.organic) {output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')}
//     //need to return output because arrow funtion has {}
//     return output
//}

//Read the 3 HTML templates into memory as strings when the app starts - This is done only once.
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf8')
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf8')
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf8')

//Read the data from the JSON file into memory when the app starts - This is done only once.
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf8')
//Convert the JSON string (data) into an array of Objects
const dataObj = JSON.parse(data)
//console.log(dataObj)


const server = http.createServer((req, res) => {
    //res.end('Hello from the Web Server!')

    //console.log(req)
    //console.log(req.url)
    //const pathName = req.url

    //console.log(url.parse(req.url, true)) //true allows to parse the query string. (example ?id=0 in localhost:3000/products?id=0)
    const { query, pathname } = url.parse(req.url, true) //uses es6 destructuring https://www.w3schools.com/js/js_destructuring.asp
    

    //Overview Page
    if (pathname === '/' || pathname === '/overview') { //replaced all pathName with pathname
        //set the content type to html
        res.writeHead(200, {'Content-type': 'text/html'})

        //Create a new array cardsHtml. use .map to iterate over each element (el) 
        //and call the callback function replaceTemplate which takes in the tempCard html string and the current el
        //arrow funtion => without {}, implicitly retruns
        //the .join('') method converts the array of objects to a string and separates each product object with and empty string ''
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        //console.log(cardsHtml) //-- to test that the array of product objects is now converted to string

        //replace the {%PRODUCT_CARDS%} placeholder in the tempOverview memory variable of the template-overview.html page
        //assign the updated page to output variable
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        //http respond with the dynamically built template-overview.html page
        res.end(output)

    //Product Page
    } else if (pathname === '/product') {
        //console.log(query)
        res.writeHead(200, {'Content-type': 'text/html'})
        //identify which element in the array of object in dataObj you want.
        const product = dataObj[query.id]
        //replace the tempProduct page in memory using the replaceTemplate function with the specific product data from dataObj
        const output = replaceTemplate(tempProduct, product) 
        //res.end('This is the PRODUCT Page!')
        res.end(output)

    //API 
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json'})
        res.end(data)

        //fs.readFile('./starter/dev-data/data.json')
        // fs.readFile(`${__dirname}/starter/dev-data/data.json`, 'utf8', (err, data) => {
        //     const productData = JSON.parse(data)
        //     console.log(productData)
        //     res.writeHead(200, {'Content-type': 'application/json'})
        //     //res.end('API')
        //     res.end(data)
        // })

    //Not Found
    } else {
        // res.writeHead(404, {'Content-type': 'text/plain', 'my-own-header': 'hello-world'})
        // res.end('Page not found!')
        res.writeHead(404, {'Content-type': 'text/html', 'my-own-header': 'hello-world'})
        res.end('<h1>Page not found!</h1>')
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening to requests on port 3000')
})

