const Store = require('../models/Store');

//GET all stores
const getAll = async (req, res) => {
    try {
        const stores = await Store.find();
        return res.status(200).json({status: "success", message: "Stores retrieved successfully.", data: stores });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, stores not retrieved", error: error });
    }
};

//GET brand by id
const getById = async (req, res) => {
    try {
        Store.findOne({_id: req.params.id})
            .then(store => {
                if(!store) {
                    return res.status(404).send({status: "failed", message: "Store not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Store retrieved successfully.", data: store });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, store not retrieved", error: err });
            }
        );
        
    } catch (error) {  
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, store not retrieved" });
    }
};

//GET brand by name
const getByName = async (req, res) => {
    try {
        Store.findOne({name: req.params.name})
            .then(store => {
                if(!store) {
                    return res.status(404).send({status: "failed", message: "No store found with this name."});
                } else {
                    return res.status(200).json({status: "success", message: "Store retrieved successfully.", data: store });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, store not retrieved", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, store not retrieved" });
    }
};

//POST new brand information
const create = async (req, res) => {
    try {
        const { name, logo, email, phone, primaryColor, secondaryColor, slogan } = req.body;

        //Check if fields are empty
        if(!name || !logo || !email || !phone) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        }

        const store = new Store({ name, logo, email, phone, primaryColor, secondaryColor, slogan });

        store.save()
            .then(store => {
                return res.status(200).json({status: "success", message: "Store created successfully.", data: store });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, store not created", error: err });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, brand not created", error: error });
    }
};

//UPDATE brand information by id
const update = async (req, res) => {
    try {
        Store.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then(store => {
                if(!store) {
                    return res.status(404).send({status: "failed", message: "Store not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Store updated successfully.", data: store });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, store not updated", error: err });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, store not updated", error: error });
    }
};

//DELETE brand by id
const deleteStore = async (req, res) => {
    try {
        Store.findOneAndDelete({_id: req.params.id})
            .then(store => {
                if(!store) {
                    return res.status(404).send({status: "failed", message: "Store not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Store deleted successfully.", data: store }); 
                }

            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, store not deleted", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, store not deleted", error: error });
    }
};

module.exports = { getAll, getById, getByName, create, update, deleteStore };