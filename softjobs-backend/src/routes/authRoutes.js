const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const validateToken = require('../middlewares/validateToken');
const validateCredentials = require('../middlewares/validateCredenctials');

const router = express.Router();

router.post('/usuarios', validateCredentials, register); 
router.post('/login', validateCredentials, login);       
router.get('/usuarios', validateToken, getUser);        

module.exports = router;
