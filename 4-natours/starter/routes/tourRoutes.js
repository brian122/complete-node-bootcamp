/////////////////////////////////////////////
//Core Modules
/////////////////////////////////////////////
const fs = require('fs')
const express = require('express')

const tourController = require('./../controllers/tourController')
//could use destructuring but then have to name each function
//const { getAllTours, creatTour, ... } = require('./../controllers/tourController')


//convention is to name it router
const router = express.Router()
//app
router
    // .route('/api/v1/tours')
    .route('/')  //using the express Router set in Middleware
    .get(tourController.getAllTours)
    .post(tourController.createTour)

// app
router
    // .route('/api/v1/tours/:id')
    .route('/:id') //using the express Router set in Middleware
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router