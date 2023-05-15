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

//GET category by id
const getById = async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id});
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

//GET category by store
const getByStore = async (req, res) => {
    try {
        const category = await Category.find({store: req.params.store});
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

//UPDATE category information
const updateCategory = async (req, res) => {
    try {
        Category.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(category => {
            if(!category) {
                return res.status(404).send({status: "failed", message: "Category item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Category item updated successfully.", data: category });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, category item not updated", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, category not updated", error: error });
    }
};

//DELETE category information
const deleteCategory = async (req, res) => {
    try {
        Category.findByIdAndDelete({_id: req.params.id})
        .then(category => {
            if(!category) {
                return res.status(404).send({status: "failed", message: "Category item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Category item deleted successfully.", data: category });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, category item not deleted", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, category not deleted", error: error });
    }
};         


module.exports = { getAll, getById, getByName, getByStore, createCategory, updateCategory, deleteCategory };