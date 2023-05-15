const express = require('express');
const router = express.Router();
const categoryController = require('../../../controllers/categoryController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), categoryController.getAll);
router.get('/:name', passport.authenticate('jwt', {session:false}), categoryController.getByName);

//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), categoryController.createCategory);

//PUT routes
router.put('/:id', passport.authenticate('jwt', {session:false}), categoryController.updateCategory);

//DELETE routes

module.exports = router;