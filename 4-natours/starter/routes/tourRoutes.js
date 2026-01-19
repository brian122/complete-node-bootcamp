/////////////////////////////////////////////
//Core Modules
/////////////////////////////////////////////
const fs = require('fs')
const express = require('express')

//could have used destructuring but then have to name each function
//const { getAllTours, creatTour, ... } = require('./../controllers/tourController')
//if used then don't need tourController. on the function calls in the http router below
const tourController = require('./../controllers/tourController')

//convention is to name it router
const router = express.Router()

//Param Middleware
// router.param('id', tourController.checkID)

//app
router
    // .route('/api/v1/tours')
    .route('/')  //using the express Router set in Middleware
    .get(tourController.getAllTours)
    // .post(tourController.checkBody, tourController.createTour)
    .post(tourController.createTour)

// app
router
    // .route('/api/v1/tours/:id')
    .route('/:id') //using the express Router set in Middleware
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router