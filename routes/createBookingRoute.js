const express = require('express');
//const { body } = require('express-validator/check');

const bookingController = require('../controllers/createBookingController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
//const moment= require("moment");


router.post('/book', isAuth, bookingController.createBooking);


module.exports = router;