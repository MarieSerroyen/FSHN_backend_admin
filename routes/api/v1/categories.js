const express = require('express');
const router = express.Router();
const categoryController = require('../../../controllers/categoryController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), categoryController.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), categoryController.getById);
router.get('/name/:name', passport.authenticate('jwt', {session:false}), categoryController.getByName);
router.get('/store/:store', passport.authenticate('jwt', {session:false}), categoryController.getByStore);

//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), categoryController.createCategory);

//PUT routes
router.put('/:id', passport.authenticate('jwt', {session:false}), categoryController.updateCategory);

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session:false}), categoryController.deleteCategory);

module.exports = router;