const express = require('express');
const router = express.Router();
const subCategoryController = require('../../../controllers/subCategoryController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/',passport.authenticate('jwt', {session:false}),subCategoryController.getAll);
router.get('/:id',passport.authenticate('jwt', {session:false}),subCategoryController.getById);
router.get('/name/:name',passport.authenticate('jwt', {session:false}),subCategoryController.getByName);
router.get('/store/:store',passport.authenticate('jwt', {session:false}),subCategoryController.getByStore);
router.get('/category/:category',passport.authenticate('jwt', {session:false}),subCategoryController.getByCategory);

//POST routes
router.post('/',passport.authenticate('jwt', {session:false}),subCategoryController.createSubCategory);

//PUT routes
router.put('/:id',passport.authenticate('jwt', {session:false}),subCategoryController.updateSubCategory);

//DELETE routes
router.delete('/:id',passport.authenticate('jwt', {session:false}),subCategoryController.deleteSubCategory);

module.exports = router;