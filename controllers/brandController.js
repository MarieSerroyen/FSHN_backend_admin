const Brand = require('../models/Brand');

//GET all brands
const getAll = async (req, res) => {
    try {
        const brands = await Brand.find();
        return res.status(200).json({status: "success", message: "Brands retrieved successfully.", data: brands });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, brands not retrieved", error: error });
    }
};

//GET brand by id
const getById = async (req, res) => {
    try {
        Brand.findOne({_id: req.params.id})
            .then(brand => {
                if(!brand) {
                    return res.status(404).send({status: "failed", message: "Brand not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Brand retrieved successfully.", data: brand });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, brand not retrieved", error: err });
            }
        );
        
    } catch (error) {  
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, brand not retrieved" });
    }
};

//GET brand by name
const getByName = async (req, res) => {
    try {
        Brand.findOne({name: req.params.name})
            .then(brand => {
                if(!brand) {
                    return res.status(404).send({status: "failed", message: "No brand found with this name."});
                } else {
                    return res.status(200).json({status: "success", message: "Brand retrieved successfully.", data: brand });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, brand not retrieved", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, brand not retrieved" });
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
            .then(brand => {
                return res.status(200).json({status: "success", message: "Brand created successfully.", data: brand });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, brand not created", error: err });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, brand not created", error: error });
    }
};

//UPDATE brand information by id
const update = async (req, res) => {
    try {
        Brand.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then(brand => {
                if(!brand) {
                    return res.status(404).send({status: "failed", message: "Brand not found"});
                } else {
                    return res.status(200).json({status: "success", message: "User updated successfully.", data: brand });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, brand not updated", error: err });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, brand not updated", error: error });
    }
};

module.exports = {getAll, getById, getByName, create, update};