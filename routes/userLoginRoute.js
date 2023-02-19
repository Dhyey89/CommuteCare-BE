const express = require('express');
const router = express.Router();
const userController = require('../controllers/userLoginController');



router.post('/userLogin', userController.login);

module.exports = router;