const Order = require('../models/Order');
const generator = require('generate-serial-number');

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

//GET order by id
const getById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        return res.status(200).json({status: "success", message: "Order retrieved successfully.", data: order });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, order not retrieved", error: error });
    }
}

//GET order by order number
const getByOrderNumber = async (req, res) => {
    try {
        const order = await Order.findOne({orderNumber: req.params.orderNumber});
        return res.status(200).json({status: "success", message: "Order retrieved successfully.", data: order });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, order not retrieved", error: error });
    }
}

//GET order by store id
const getByStoreId = async (req, res) => {
    try {
        const order = await Order.find({storeId: req.params.storeId});
        return res.status(200).json({status: "success", message: "Order retrieved successfully.", data: order });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, order not retrieved", error: error });
    }
}

//GET order by client number
const getByClientNumber = async (req, res) => {
    try {
        const order = await Order.find({clientNumber: req.params.clientNumber});
        return res.status(200).json({status: "success", message: "Order retrieved successfully.", data: order });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, order not retrieved", error: error });
    }
}

//POST new order
const create = (req, res) => {
    try {
        const { storeId, productIds, clientNumber, amount, status } = req.body;
        const orderNumber = generator.generate(4);

         //Check if fields are empty
         if(!storeId || !productIds || !clientNumber || !amount) {
            return res.status(404).send({status: "failed", message: "Please fill in required fields"});
            }

            const order = new Order({ storeId, productIds, clientNumber, orderNumber, amount, status });

            order.save()
                .then(order => {
                    return res.status(200).json({status: "success", message: "Order created successfully.", data: order });
                })
                .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, order not created", error: err });
                });

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, order not created", error: error });
    }
}

//PUT update order
const update = async (req, res) => {
    try {
        Order.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then(order => {
                if(!order) {
                    return res.status(404).send({status: "failed", message: "Order not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Order updated successfully.", data: order });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, order not updated", error: err });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, order not updated", error: error });
    }
}

//DELETE order
const deleteOrder = async (req, res) => {
    try {
        Order.findByIdAndDelete({_id: req.params.id})
            .then(order => {
                if(!order) {
                    return res.status(404).send({status: "failed", message: "Order not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Order deleted successfully.", data: order });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, order not deleted", error: err });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, order not deleted", error: error });
    }
}


module.exports = {getAll, getById, getByOrderNumber, getByStoreId, getByClientNumber, create, update, deleteOrder };