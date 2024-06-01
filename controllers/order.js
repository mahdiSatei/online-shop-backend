const Order = require('../models/Order')
const { updateCart } = require('./cart')

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({
            type : "success",
            orders
        })
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            error
        })
    }
}

const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findOne({userId : req.params.id})
        if(!order) {
            res.status(404).json({
                type : "error",
                message : "User doesn't exists"
            })
        } else {
            res.status(200).json({
                type : "success",
                order            
            })
        }
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            error
        })
    }
}

const createOrder = async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json({
            type : "success",
            message : "Order created successfully",
            savedOrder
        })
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            error
        })
    }
}

const updateOrder = async (req, res) => {
    
    try {
        const updatedOrder = await Cart.findOneAndUpdate({userId : req.params.id}, {
            $set : req.body
        }, {new : true})

        res.status(200).json({
            type: "success",
            message: "Cart updated successfully",
            updatedOrder
        })

    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            error
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        await Order.findOneAndDelete({userId : req.params.id})
        res.status(200).json({
            type: "success",
            message: "Order has been deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            error
        })
    }
}

module.exports = {
    getAllOrders,
    getSingleOrder,
    deleteOrder,
    createOrder,
    updateOrder
}