const SubCategory = require('../models/subCategory');

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

//POST new subCategory information
const createSubCategory = async (req, res) => {
    try {
        const { name, image, store } = req.body;

         //Check if fields are empty
         if(!name || !image || !store) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        }

        const subCategory = new SubCategory({ name, image, store});

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
module.exports = { getAll, createSubCategory };