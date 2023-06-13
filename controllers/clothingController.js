const c = require('config');
const Clothing = require('../models/Clothing');
const e = require('express');

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

//GET clothing by store
const getByStore = async (req, res) => {
    try {
        Clothing.find({store: req.params.store})
            .then(clothing => {
                if(!clothing) {
                    return res.status(404).send({status: "failed", message: "No clothing items found from this store."});
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

//GET all categories
const getCategories = async (req, res) => {
    try {
        Clothing.find().distinct('category')
            .then(categories => {
                if(!categories) {
                    return res.status(404).send({status: "failed", message: "No categories found."});
                } else {
                    return res.status(200).json({status: "success", message: "Categories retrieved successfully.", data: categories });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, categories not retrieved", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, categories not retrieved" });
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

//GET clothing by subcategory ID
const getBySubCategory = async (req, res) => {
    try {
        Clothing.find({subCategories: req.params.subcategory})
            .then(clothing => {
                if(!clothing) {
                    return res.status(404).send({status: "failed", message: "No clothing items found within this subcategory."});
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

//GET clothing by collection ID
const getByCollection = async (req, res) => {
    try {
        Clothing.find({collectionStore: req.params.collection})
            .then(clothing => {
                if(!clothing) {
                    return res.status(404).send({status: "failed", message: "No clothing items found within this collection."});
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
        const { name, articleNumber, headImage, modelImage, modelImage2, sizes, colors, price, materials, category, subCategories, collectionStore, brand, description, stock, store } = req.body;

        //Check if fields are empty
        if(!name || !articleNumber || !headImage || !modelImage || !modelImage2 || !sizes || !colors || !price || !materials || !category || !subCategories ||  !brand || !description || !stock || !store) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        } 

        const clothing = new Clothing({ name, articleNumber, headImage, modelImage, modelImage2, sizes, colors, price, materials, category, subCategories, collectionStore, brand, description, stock, store });

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

const getFilteredBySubCategory = async (req, res) => {
    try {
        console.log(req.body);

        let filter = req.body;
        let sort; 
        filter.subCategories = req.params.subcategory;

        if (filter.colors) {
            filter.colors = {$in: filter.colors}
        }

        if (filter.sizes) {
            filter.sizes = {$in: filter.sizes}
        }

        if (filter.sort){
            switch (filter.sort) {
                case 'Lowest price':
                    sort = {price: 1}
                    break;
                case 'Highest price':
                    sort = {price: -1}
                    break;
                case 'New':
                    sort = { "$natural": 1 }
                    break;
                case 'Promo':
                    sort = { "$natural": 1 }
                    break;
                default:
                    sort = { "$natural": 1 }
                    break;
            }
            delete filter.sort;

        } else {
            sort = { "$natural": 1 }
        }

        // if (filter.price) {
        //     filter.price = {$lte: filter.price.max.toString(), $gte: filter.price.min.toString()}
        // }

        console.log(filter);
        
        Clothing.find(filter).sort(sort)

        // Clothing.find({subCategories: req.params.subcategory})
            .then(clothing => {
                if(!clothing) {
                    return res.status(404).send({status: "failed", message: "No clothing items found within this subcategory."});
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

module.exports = { getAll, getById, getByStore, getCategories, getByCategory, getBySubCategory, getByCollection, create, getFilteredBySubCategory, update, addColors, addSizes, deleteClothing };