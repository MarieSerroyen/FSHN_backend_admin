const User = require('../models/User');


//POST create company user
const create = async (req, res) => {
    const { name, email, password } = req.body;
    
    const user = new User({ name, email, password });

    user.save ( (err, user) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                message: 'Something went wrong. User not created',
                error: err
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'User created successfully',
                data: user
            });
        };
    });
};

module.exports.create = create;