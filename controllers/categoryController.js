const Category = require('../models/Category');

//GET all categories
const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({status: "success", message: "Categories retrieved successfully.", data: categories });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, categories not retrieved", error: error });
    }
}

//GET category by name
const getByName = async (req, res) => {
    try {
        const category = await Category.findOne({name: req.params.name});
        if(!category) {
            return res.status(404).send({status: "failed", message: "Category not found"});
        } else {
            return res.status(200).json({status: "success", message: "Category retrieved successfully.", data: category });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, category not retrieved", error: error });
    }
}


module.exports = { getAll, getByName };