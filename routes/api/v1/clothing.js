const express = require('express');
const router = express.Router();
const clothingController = require('../../../controllers/clothingController');
const passport = require('../../../passport/passport');

//GET routes

//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), clothingController.create);
//PUT routes

//DELETE routes

module.exports = router;