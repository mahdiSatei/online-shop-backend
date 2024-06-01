const Cart = require('../models/Cart')

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json({
            type : "success",
            carts
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Somthing went wrong please try again",
            error
        })
    }
}

const getCart = async (req, res) => {

    const {id} = req.params

    try {
        const cart = await Cart.findOne({userId : id})
        if(!cart) {
            res.status(404).json({
                type : "error",
                message : "User dosn't exists"
            })
        } else {
            res.status(200).json({
                type : "success",
                cart
            })
        }
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Somthing went wrong please try again",
            error
        })
    }
}
const createCart = async (req, res) => {

    const newCart = new Cart(req.body)
    
    try {
        const savedCart = await newCart.save()
        res.status(200).json({
            type : "success",
            message : "Cart created successfully",
            savedCart   
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Somthing went wrong please try again",
            error
        })
    }
}

const updateCart = async (req, res) => {
    const id = req.params.id
    const existing = await Cart.findOne({userId : id})
    if(!existing){
        res.status(404).json({
            type : "error",
            message : "Cart doesn't exists"
        })
    } else {
        try {
            const updatedCart = await Cart.findOneAndUpdate({userId : id}, {
                $set : req.body
            },
                {new : true}
            )
            res.status(200).json({
                type : "success",
                message : "Cart updated successfuly",
                updatedCart
            })
        } catch (error) {
            res.status(500).json({
                type : "error",
                message : "Something went wrong please try again",
                error
            })  
        }
    }
}

const deleteCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({userId : req.params.id});
        res.status(200).json({
            type: "success",
            message: "Cart has been deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            err
        })
    }
}

module.exports = {
    getAllCarts,
    getCart,
    deleteCart,
    updateCart,
    createCart
}