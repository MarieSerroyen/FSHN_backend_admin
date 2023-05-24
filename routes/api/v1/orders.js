const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/orderController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session: false}), orderController.getAll);

//POST routes
router.post('/', passport.authenticate('jwt', {session: false}), orderController.create);

//PUT routes

//DELETE routes

module.exports = router;