const Order = require('../models/Order');

//GET all orders
const getAll = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json({status: "success", message: "Orders retrieved successfully.", data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, orders not retrieved", error: error });
    }
}

//POST new order information
const create = async (req, res) => {
    try {
        const { storeId, productId, amount, orderNumber } = req.body;

        //Check if fields are empty
        if(!storeId || !productId || !orderNumber) {
            return res.status(404).send({status: "failed", message: "Please fill all fields"});
        }

        const order = new Order({ storeId, productId, amount, orderNumber });

        order.save()
            .then(order => {
                return res.status(200).json({status: "success", message: "Order created successfully.", data: order });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, order not created", error: err });
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, order not created", error: error });
    }
}

module.exports = { getAll, create };