const SubCategory = require('../models/SubCategory');

//GET all subCategories
const getAll = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        return res.status(200).json({status: "success", message: "SubCategories retrieved successfully.", data: subCategories });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, subCategories not retrieved", error: error });
    }
}

//GET subCategory by id
const getById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findOne({_id: req.params.id});
        if(!subCategory) {
            return res.status(404).send({status: "failed", message: "Sub category not found"});
        } else {
            return res.status(200).json({status: "success", message: "Sub category retrieved successfully.", data: subCategory });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, sub category not retrieved", error: error });
    }
}

//GET subCategory by name
const getByName = async (req, res) => {
    try {
        const subCategory = await SubCategory.findOne({name: req.params.name});
        if(!subCategory) {
            return res.status(404).send({status: "failed", message: "Sub category not found"});
        } else {
            return res.status(200).json({status: "success", message: "Sub category retrieved successfully.", data: subCategory });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, sub category not retrieved", error: error });
    }
}

//GET subCategory by store
const getByStore = async (req, res) => {
    try {
        const subCategory = await SubCategory.find({store: req.params.store});
        if(!subCategory) {
            return res.status(404).send({status: "failed", message: "Sub category not found"});
        } else {
            return res.status(200).json({status: "success", message: "Sub category retrieved successfully.", data: subCategory });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, sub category not retrieved", error: error });
    }
}

//GET subCategory by category
const getByCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.find({category: req.params.category});
        if(!subCategory) {
            return res.status(404).send({status: "failed", message: "Sub category not found"});
        } else {
            return res.status(200).json({status: "success", message: "Sub category retrieved successfully.", data: subCategory });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, sub category not retrieved", error: error });
    }
}
    

//POST new subCategory information
const createSubCategory = async (req, res) => {
    try {
        const { name, image, store, category } = req.body;

         //Check if fields are empty
         if(!name || !image || !store || !category) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        }

        const subCategory = new SubCategory({ name, image, store, category});

        subCategory.save()
            .then(subCategory => {
                return res.status(200).json({status: "success", message: "Sub category created successfully.", data: subCategory });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, sub category item not created", error: err });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, sub category item not created", error: error });
    }
};

//UPDATE subCategory information
const updateSubCategory = async (req, res) => {
    try {
        SubCategory.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(subCategory => {
            if(!subCategory) {
                return res.status(404).send({status: "failed", message: "Sub category item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Sub category item updated successfully.", data: subCategory });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, sub category item not updated", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, category not updated", error: error });
    }
};

//DELETE subCategory information
const deleteSubCategory = async (req, res) => {
    try {
        SubCategory.findByIdAndDelete({_id: req.params.id})
        .then(subCategory => {
            if(!subCategory) {
                return res.status(404).send({status: "failed", message: "Sub category item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Sub category item deleted successfully.", data: subCategory });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, sub category item not deleted", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, sub category not deleted", error: error });
    }
};       

module.exports = { getAll, getById, getByName, getByStore, getByCategory, updateSubCategory, deleteSubCategory, createSubCategory };