const express = require('express');
const router = express.Router();
const passport = require ('passport');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');
const user = require('../controllers/userController');

router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync (user.registerUser));

router.route('/login')
    .get(user.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), user.loginUser);

router.get('/logout', user.logoutUser);
module.exports = router;