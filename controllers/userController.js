const User = require('../models/User');


//POST create company user
const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({ name, email, password });

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


module.exports.create = create;