const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Validator} = require('node-input-validator');
const config = require('config');

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

//GET user by id
const getById = async (req, res) => {
    try {
        User.findOne({_id: req.params.id})
            .then(user => {
                if(!user) {
                    return res.status(404).send({status: "failed", message: "User not found"});
                } else {
                    return res.status(200).json({status: "success", message: "User fetched successfully.", data: user }); 
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, user not fetched", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, user not fetched" });
    }
};

//GET user by name
const getByName = async (req, res) => {
    try {
        User.findOne({name: req.params.name})
            .then(user => {
                if(!user) {
                    return res.status(404).send({status: "failed", message: "No user found with this name."});
                } else {
                    return res.status(200).json({status: "success", message: "User fetched successfully.", data: user });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, user not fetched", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, user not fetched" });
    }
};

//POST create company user
const create = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        //Check if fields are empty
        if(!name || !email || !password) {
            return res.status(404).send({status: "failed", message: "Please fill all fields"});
        }

        const user = new User({ name, email, password, role });

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

//DELETE user by id
const deleteUser = async (req, res) => {
    try {
        User.findOneAndDelete({_id: req.params.id})
            .then(user => {
                if(!user) {
                    return res.status(404).send({status: "failed", message: "User not found"});
                } else {
                    return res.status(200).json({status: "success", message: "User deleted successfully.", data: user }); 
                }

            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, user not deleted", error: err });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, user not deleted" });
    }
};

//POST login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if fields are empty
        if(!email || !password) {
            return res.status(404).send({status: "failed", message: "Please fill all fields"});
        }

        User.findOne({ email: email })
            .then(user => {
                if(!user) {
                    return res.status(404).send({status: "failed", message: "User not found"});
                } else {
                    const isMatch = bcrypt.compare(password, user.password);
        
                    if(!isMatch) {
                        return res.status(400).send({status: "failed", message: "Invalid credentials"});
                    } else {
                        const jwtToken = jwt.sign({ id: user._id }, config.get('jwt.secret'));
        
                        return res.status(200).json({status: "success", message: "User logged in successfully.", data: user, token: jwtToken });
                    }
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, user not logged in", error: err });
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, user not logged in", error: error });
    }
};

//POST change password user
const changePassword = async (req, res) => {
    try {
        const v = new Validator(req.body, {
            old_password: 'required',
            new_password: 'required|minLength:6',
            confirm_password: 'required|same:new_password'
        });

        //Check if passwords match
        const matched = await v.check();

        if (!matched) {
            return res.status(400).send({status: "failed", message: "Passwords don't match", error: v.errors });
        }

        const { old_password, new_password, confirm_password } = req.body;

        //Check if fields are empty
        if(!old_password || !new_password || !confirm_password) {
            return res.status(404).send({status: "failed", message: "Please fill all fields"});
        }

        let user = await User.findOne({ _id: req.params.id });

        const isMatch = await bcrypt.compare(old_password, user.password);

        //Check if old password is correct
        if(!isMatch) {
            return res.status(400).send({status: "failed", message: "Invalid credentials"});
        } else {
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(new_password, salt);

            user.save()
                .then(user => {
                    return res.status(200).json({status: "success", message: "Password changed successfully.", data: user });
                })
                .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, password not changed", error: err });
                });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, password not changed", error: error });
    }
};





module.exports = { getAll, getById, getByName, create, deleteUser, login, changePassword };