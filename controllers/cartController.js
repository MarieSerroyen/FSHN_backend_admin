const Cart = require('../models/Cart');
const generator = require('generate-serial-number');

//GET all carts
const getAll = async (req, res) => {
    try {
        const carts = await Cart.find();
        return res.status(200).json({status: "success", message: "Carts retrieved successfully.", data: carts });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, carts not retrieved", error: error });
    }
}

//GET cart by id
const getById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        return res.status(200).json({status: "success", message: "Cart retrieved successfully.", data: cart });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, cart not retrieved", error: error });
    }
}

//GET order by order number
/*const getByOrderNumber = async (req, res) => {
    try {
        const order = await Order.findOne({orderNumber: req.params.orderNumber});
        return res.status(200).json({status: "success", message: "Order retrieved successfully.", data: order });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, order not retrieved", error: error });
    }
}*/

//GET cart by store id
const getByStoreId = async (req, res) => {
    try {
        const cart = await Cart.find({storeId: req.params.storeId});
        return res.status(200).json({status: "success", message: "Cart retrieved successfully.", data: cart });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, cart not retrieved", error: error });
    }
}

//GET cart by client number
const getByClientNumber = async (req, res) => {
    try {
        const cart = await Cart.find({clientNumber: req.params.clientNumber});
        return res.status(200).json({status: "success", message: "Cart retrieved successfully.", data: cart });
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, cart not retrieved", error: error });
    }
}


//POST new order information
const create = async (req, res) => {
    try {
        const { storeId, productId, amount, clientNumber, size, color, name, price, image } = req.body;
        //const orderNumber = generator.generate(10);

        //Check if fields are empty
        if(!storeId || !productId || !clientNumber) {
            return res.status(404).send({status: "failed", message: "Please fill all fields"});
        }

        const cart = new Cart({ storeId, productId, amount, clientNumber, size, color, name, price, image });

        cart.save()
            .then(cart => {
                return res.status(200).json({status: "success", message: "Cart created successfully.", data: cart });
            })
            .catch(err => {
            return res.status(400).send({status: "failed", message: "Something went wrong, cart not created", error: err });
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", message: "Something went wrong, cart not created", error: error });
    }
}

//UPDATE order information
const update = async (req, res) => {
    try {
        Cart.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then(cart => {
                if(!cart) {
                    return res.status(404).send({status: "failed", message: "Cart not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Cart updated successfully.", data: cart });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, cart not updated", error: err });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, order not updated", error: error });
    }
}

//DELETE order information
const deleteCart = async (req, res) => {
    try {
        Cart.findByIdAndDelete({_id: req.params.id})
            .then(cart => {
                if(!cart) {
                    return res.status(404).send({status: "failed", message: "Cart not found"});
                } else {
                    return res.status(200).json({status: "success", message: "Cart deleted successfully.", data: cart });
                }
            })
            .catch(err => {
                return res.status(400).send({status: "failed", message: "Something went wrong, cart not deleted", error: err });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "failed", message: "Something went wrong, cart not deleted", error: error });
    }
}



module.exports = { getAll, getById, getByStoreId, getByClientNumber, create, update, deleteCart };