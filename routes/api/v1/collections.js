const express = require('express');
const router = express.Router();
const collectionController = require('../../../controllers/collectionController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), collectionController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), collectionController.getById);
router.get('/name/:name', passport.authenticate('jwt', {session:false}), collectionController.getByName);


//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), collectionController.createCollection);


//PUT routes


//DELETE routes

module.exports = router;