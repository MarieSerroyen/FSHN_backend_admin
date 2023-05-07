const Clothing = require('../models/Clothing');

//GET all clothing with filter
const getAll = async (req, res) => {
    try {
        const clothing = await Clothing.find(req.query);
        return res.status(200).json({status: "success", message: "Clothing items retrieved successfully.", data: clothing });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing items not retrieved", error: error });
    }
};

//GET clothing by id
const getById = async (req, res) => {
    try {
        Clothing.findOne({_id: req.params.id})
            .then(clothing => {
                if(!clothing) {
                    return res.status(404).send({status: "failed", message: "Clothing item not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Clothing item retrieved successfully.", data: clothing });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, clothing item not retrieved", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing item not retrieved" });
    }
};

//GET clothing by brand
const getByBrand = async (req, res) => {
    try {
        Clothing.find({brand: req.params.brand})
            .then(clothing => {
                if(!clothing) {
                    return res.status(404).send({status: "failed", message: "No clothing items found with this brand."});
                } else {
                    return res.status(200).json({status: "success", message: "Clothing items retrieved successfully.", data: clothing });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, clothing items not retrieved", error: err });
            }
        );
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing items not retrieved" });
    }
};

//GET clothing by category
const getByCategory = async (req, res) => {
    try {
        Clothing.find({category: req.params.category})
            .then(clothing => {
                if(!clothing) {
                    return res.status(404).send({status: "failed", message: "No clothing items found within this category."});
                } else {
                    return res.status(200).json({status: "success", message: "Clothing items retrieved successfully.", data: clothing });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, clothing items not retrieved", error: err });
            }
        );
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing items not retrieved" });
    }
};

//POST new clothing information
const create = async (req, res) => {
    try {
        const { name, articleNumber, headImage, subImages, sizes, colors, price, materials, category, brand, description, stock, store } = req.body;

        //Check if fields are empty
        if(!name || !articleNumber || !headImage || !subImages || !sizes || !colors || !price || !materials || !category || !brand || !description || !stock || !store) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        }

        const clothing = new Clothing({ name, articleNumber, headImage, subImages, sizes, colors, price, materials, category, brand, description, stock, store });

        clothing.save()
            .then(clothing => {
                return res.status(200).json({status: "success", message: "Clothing item created successfully.", data: clothing });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, clothing item not created", error: err });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing item not created", error: error });
    }
};

//UPDATE clothing information by id
const update = async (req, res) => {
    try {
        Clothing.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(clothing => {
            if(!clothing) {
                return res.status(404).send({status: "failed", message: "Clothing item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Clothing item updated successfully.", data: clothing });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, clothing item not updated", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing not updated", error: error });
    }
};

//UPDATE add colors to clothing by id
const addColors = async (req, res) => {
    try {
        Clothing.findByIdAndUpdate({_id: req.params.id}, {$push: {colors: req.body.colors}})
        .then(clothing => {
            if(!clothing) {
                return res.status(404).send({status: "failed", message: "Clothing item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Clothing item updated successfully.", data: clothing });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, clothing item not updated", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing not updated", error: error });
    }
};

//UPDATE add sizes to clothing by id
const addSizes = async (req, res) => {
    try {
        Clothing.findByIdAndUpdate({_id: req.params.id}, {$push: {sizes: req.body.sizes}})
        .then(clothing => {
            if(!clothing) {
                return res.status(404).send({status: "failed", message: "Clothing item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Clothing item updated successfully.", data: clothing });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, clothing item not updated", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing not updated", error: error });
    }
};

//DELETE clothing by id
const deleteClothing = async (req, res) => {
    try {
        Clothing.findByIdAndDelete({_id: req.params.id})
        .then(clothing => {
            if(!clothing) {
                return res.status(404).send({status: "failed", message: "Clothing item not found"});
            } else {
                return res.status(200).json({status: "success", message: "Clothing item deleted successfully.", data: clothing });
            }
        })
        .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, clothing item not deleted", error: err });
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing not deleted", error: error });
    }
};

module.exports = { getAll, getById, getByBrand, getByCategory, create, update, addColors, addSizes, deleteClothing };