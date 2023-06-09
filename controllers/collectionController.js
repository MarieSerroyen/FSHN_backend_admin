const Collection = require('../models/Collection');

//GET all collections
const getAll = async (req, res) => {
    try {
        const collections = await Collection.find();
        return res.status(200).json({status: "success", message: "Collections retrieved successfully.", data: collections });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, collections not retrieved", error: error });
    }
}

//GET collection by id
const getById = async (req, res) => {
    try {
        const collection = await Collection.findOne({_id: req.params.id});
        if(!collection) {
            return res.status(404).send({status: "failed", message: "Collection not found"});
        } else {
            return res.status(200).json({status: "success", message: "Collection retrieved successfully.", data: collection });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, collection not retrieved", error: error });
    }
}

//GET collection by name
const getByName = async (req, res) => {
    try {
        const collection = await Collection.findOne({name: req.params.name});
        if(!collection) {
            return res.status(404).send({status: "failed", message: "Collection not found"});
        } else {
            return res.status(200).json({status: "success", message: "Collection retrieved successfully.", data: collection });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, collection not retrieved", error: error });
    }
}

//GET collection by store
const getByStore = async (req, res) => {
    try {
        const collection = await Collection.find({store: req.params.store});
        if(!collection) {
            return res.status(404).send({status: "failed", message: "Collection not found"});
        } else {
            return res.status(200).json({status: "success", message: "Collection retrieved successfully.", data: collection });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, collection not retrieved", error: error });
    }
}

//POST new collection information
const createCollection = async (req, res) => {
    try {
        const { name, image, store } = req.body;

         //Check if fields are empty
         if(!name || !image || !store) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        }

        const collection = new Collection({ name, image, store});

        collection.save()
            .then(collection => {
                return res.status(200).json({status: "success", message: "Collection created successfully.", data: collection });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, collection item not created", error: err });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, collection item not created", error: error });
    }
};

//UPDATE collection information
const updateCollection = async (req, res) => {
    try {
        Collection.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(collection => {
            if(!collection) {
                return res.status(404).send({status: "failed", message: "Collection item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Collection item updated successfully.", data: collection });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, collection item not updated", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, category not updated", error: error });
    }
};

//DELETE collection information
const deleteCollection = async (req, res) => {
    try {
        Collection.findByIdAndDelete({_id: req.params.id})
        .then(collection => {
            if(!collection) {
                return res.status(404).send({status: "failed", message: "Collection item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Collection item deleted successfully.", data: collection });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, collection item not deleted", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, collection not deleted", error: error });
    }
};         


module.exports = { getAll, getById, getByName, getByStore, createCollection, updateCollection, deleteCollection };