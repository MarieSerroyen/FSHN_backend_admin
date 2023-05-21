const express = require('express');
const router = express.Router();
const collectionController = require('../../../controllers/collectionController');
const passport = require('../../../passport/passport');

//GET routes


//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), collectionController.createCollection);


//PUT routes


//DELETE routes

module.exports = router;