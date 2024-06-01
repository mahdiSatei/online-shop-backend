const User = require('../models/User')
const bycrpt = require('bcrypt')

const getAllUsers = async (req, res) => {
    
    try {
        const query = req.query.new

        const users = query ? await User.find().sort({_id : -1}).limit(5) : await User.find()
        
        res.status(200).json({
            type : "success",
            users
        })
        
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went wrong please try again",
            error
        })
    }

}

const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...data} = user._doc
        res.status(200).json({
            type : "success",
            ...data
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went wrong please try again",
            error
        })
    }
}


const getStatus = async (req, res) => {
   
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { $match : { 
                createdAt: { $gte: lastYear }
            }},
            { $project: { 
                month: { $month: "$createdAt"}
            }},
            { $group : {
                _id: "$month", 
                total: { $sum: 1},
            }}
        ]);
        res.status(200).json({
            type: "success",
            data
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went wrong please try again",
            error
        })
    }
}

const updateUser = async (req, res) => {
    
    if(!req.body.password || !req.body.name) {
        return res.status(500).json({
            type : "error",
            message : "Somthing went wrong"
        })
    }
    
    req.body.password = await bycrpt.hash(req.body.password, 10)
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new : true})
        res.status(200).json({
            type : "success",
            message : "User updated successfuly!",
            updatedUser
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went wrong please try again",
            error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            type : "success",
            message : "User deleted successfuly"
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went wrong please try again",
            error
        })
    }
}

module.exports = {getAllUsers, getSingleUser, updateUser, deleteUser, getStatus}