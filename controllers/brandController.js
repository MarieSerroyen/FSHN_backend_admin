const Brand = require('../models/Brand');

//GEt all brands
const getAll = async (req, res) => {
    try {
        const brands = await Brand.find();
        return res.status(200).json({status: "success", message: "Brands retrieved successfully.", data: brands });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, brands not retrieved", error: error });
    }
};

//POST new brand information
const create = async (req, res) => {
    try {
        const { name, logo, primaryColor, secondaryColor, slogan } = req.body;

        //Check if fields are empty
        if(!name || !logo || !primaryColor) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        }

        const brand = new Brand({ name, logo, primaryColor, secondaryColor, slogan });

        brand.save()
            .then(user => {
                return res.status(200).json({status: "success", message: "User created successfully.", data: user });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, user not created", error: err });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, brand not created", error: error });
    }
};

module.exports = {getAll, create};