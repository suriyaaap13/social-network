const express = require('express');

const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile',userController.profile);

console.log('user router is working');
module.exports = router;