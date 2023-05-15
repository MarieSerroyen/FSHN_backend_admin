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

//POST new category information
const createCategory = async (req, res) => {
    try {
        const { name, image, store } = req.body;

         //Check if fields are empty
         if(!name || !image || !store) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        }

        const category = new Category({ name, image, store});

        category.save()
            .then(category => {
                return res.status(200).json({status: "success", message: "Category created successfully.", data: category });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, category item not created", error: err });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, category item not created", error: error });
    }
};


module.exports = { getAll, getByName, createCategory };