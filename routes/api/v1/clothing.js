const express = require('express');
const router = express.Router();
const clothingController = require('../../../controllers/clothingController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), clothingController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), clothingController.getById);
router.get('/brand/:brand', passport.authenticate('jwt', {session:false}), clothingController.getByBrand);

//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), clothingController.create);

//PUT routes

//DELETE routes

module.exports = router;