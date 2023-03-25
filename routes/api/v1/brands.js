const express = require('express');
const router = express.Router();
const brandController = require('../../../controllers/brandController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), brandController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), brandController.getById);
router.get('/name/:name', passport.authenticate('jwt', {session:false}), brandController.getByName);

//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), brandController.create);

//PUT routes
router.put('/:id', passport.authenticate('jwt', {session:false}), brandController.update);

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session:false}), brandController.deleteBrand);

module.exports = router;