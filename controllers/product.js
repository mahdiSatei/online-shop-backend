const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
    
    try {
        const products = await Product.find()
        res.status(200).json({
            type : "success",
            products
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went wrong please try again",
            error
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if(!product) {
            res.status(404).json({
                type : "error",
                message : "Product doesn't exists"
            })
        } else {
            res.status(200).json({
                type : "success",
                product
            })
        }
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went wrong please try again",
            error
        })
    }
}

const createProduct = async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json({
            type : "success",
            message : "Product created successfuly",
            savedProduct
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went wrong please try again",
            error
        })
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id
    const existing = await Product.findById(id)
    if(!existing){
        res.status(404).json({
            type : "error",
            message : "Product doesn't exists"
        })
    } else {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, {
                $set : req.body
            },
                {new : true}
            )
            res.status(200).json({
                type : "success",
                message : "Product updated successfuly",
                updatedProduct
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

const deleteProduct = async (req, res) => {
    const existing = await Product.findById(req.params.id);
    if (!existing) {
        res.status(200).json({
            type: "error",
            message: "Product doesn't exists"
        })
    } else {
        try {
            await Product.findOneAndDelete(req.params.id);
            res.status(200).json({
                type: "success",
                message: "Product has been deleted successfully"
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    }
}


module.exports = {getAllProducts, getProduct, createProduct, updateProduct, deleteProduct}