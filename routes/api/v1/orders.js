const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/orderController');
const passport = require('../../../passport/passport');

//GET routes

//POST routes
router.post('/', passport.authenticate('jwt', {session: false}), orderController.create);

module.exports = router;