const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/user',require('./users'))

console.log('router is set');

module.exports = router;