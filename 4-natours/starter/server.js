const app = require('./app')

/////////////////////////////////////////////
/// Web Server
/////////////////////////////////////////////
const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})