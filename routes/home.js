const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controller/home_controller');

router.post('/', homeController.home);
router.get('/', homeController.home);

module.exports = router;