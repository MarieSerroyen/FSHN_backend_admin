const express = require('express');
const router = express.Router();
const brandController = require('../../../controllers/brandController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), brandController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), brandController.getById);
//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), brandController.create);

module.exports = router;