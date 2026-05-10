const express = require('express');
const passport = require('passport');
const router = express.Router();

const userControllers = require('../controllers/UserController');

router.post('/signup', userControllers.signup );
router.post('/login', userControllers.login );




 
module.exports = router;