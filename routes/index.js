const express = require('express');
const router = express.Router();

const userController = require('../controller/user_controller');

router.get('/', userController.signin);
router.use('/home', require('./home'));
router.use('/users', require('./user'));

module.exports = router;