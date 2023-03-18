const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//GET all users
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({status: "success", message: "Users fetched successfully.", data: users });
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, users not fetched", error: error });
    }
};

//POST create company user
const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check if fields are empty
        if(!name || !email || !password) {
            return res.status(404).send({status: "failed", message: "Please fill all fields"});
        }

        const user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        user.save()
            .then(user => {
                return res.status(200).json({status: "success", message: "User created successfully.", data: user });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, user not created", error: err });
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, user not created", error: error });
    }
};

module.exports = { getAll, create };