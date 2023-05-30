const express = require('express');
const router = express.Router();
const clothingController = require('../../../controllers/clothingController');
const passport = require('../../../passport/passport');

//GET routes
router.get('/', passport.authenticate('jwt', {session:false}), clothingController.getAll);
router.get('/categories', passport.authenticate('jwt', {session:false}), clothingController.getCategories);
router.get('/:id', passport.authenticate('jwt', {session:false}), clothingController.getById);
router.get('/brand/:brand', passport.authenticate('jwt', {session:false}), clothingController.getByBrand);
router.get('/category/:category', passport.authenticate('jwt', {session:false}), clothingController.getByCategory);
router.get('/subcategory/:subcategory', passport.authenticate('jwt', {session:false}), clothingController.getBySubCategory);

//POST routes
router.post('/', passport.authenticate('jwt', {session:false}), clothingController.create);

//PUT routes
router.put('/:id', passport.authenticate('jwt', {session:false}), clothingController.update);
router.put('/colors/:id', passport.authenticate('jwt', {session:false}), clothingController.addColors);
router.put('/sizes/:id', passport.authenticate('jwt', {session:false}), clothingController.addSizes);

//DELETE routes
router.delete('/:id', passport.authenticate('jwt', {session:false}), clothingController.deleteClothing);

module.exports = router;