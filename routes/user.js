const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/user_controller');



router.get('/signup', userController.signup);
router.get('/login', userController.signin);

router.post('/create', userController.create);

router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/login'
}), userController.createSession);


router.get('/sign-out', userController.destroySession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), userController.createSession);


router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/users/sign-in' }), userController.createSession);



module.exports = router;