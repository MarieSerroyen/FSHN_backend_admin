const express = require('express');
const router = express.Router();
const categoryController = require('../../../controllers/categoryController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), categoryController.getAll);

//POST routes

//PUT routes

//DELETE routes

module.exports = router;