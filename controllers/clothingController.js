const Clothing = require('../models/Clothing');

//GET clothing by id
const getById = async (req, res) => {
    try {
        Clothing.findOne({_id: req.params.id})
            .then(clothing => {
                if(!clothing) {
                    return res.status(404).send({status: "failed", message: "Clothing not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Clothing retrieved successfully.", data: clothing });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, clothing not retrieved", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing not retrieved" });
    }
};

//POST new clothing information
const create = async (req, res) => {
    try {
        const { name, articleNumber, image, sizes, colors, price, materials, category, brand } = req.body;

        //Check if fields are empty
        if(!name || !articleNumber || !image || !sizes || !colors || !price || !materials || !category || !brand) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
        }

        const clothing = new Clothing({ name, articleNumber, image, sizes, colors, price, materials, category, brand });

        clothing.save()
            .then(clothing => {
                return res.status(200).json({status: "success", message: "Clothing created successfully.", data: clothing });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, clothing not created", error: err });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, clothing not created", error: error });
    }
};

module.exports = { getById, create };