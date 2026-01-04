const express = require('express')

const userController = require('./../controllers/userController')


//it is convention to use router
const router = express.Router()
// app 
router
    // .route('/api/v1/users')
    .route('/')  //using the express Router set in Middleware
    .get(userController.getAllUsers)
    .post(userController.createUser)

// app
router
    // .route('/api/v1/users/:id')
    .route('/:id')  //using the express Router set in Middleware
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router