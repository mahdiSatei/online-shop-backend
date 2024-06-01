const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bycrpt = require('bcrypt')

require('dotenv').config()

const createUser = async (req, res)=> {

    const {name, email, password} = req.body
    
    if(!name || !email || !password) {
        return res.status(500).json({
            type : "error",
            message : "Something went worng please try again"})
    }

    const hashPassword = await bycrpt.hash(password, 10)

    const newUser = new User({
        name : name,
        email : email,
        password : hashPassword,
    })

    try {
        const user = await newUser.save()
        res.status(200).json({
            type : "success",
            message : "User has been created successfuly",
            user
        })
    } catch (error) {
        res.status(500).json({
            type : "error",
            message : "Something went worng please try again",
            error
        })
    }
}
const loginUser = async (req, res) => {

    const {email, password} = req.body
    const user = await User.findOne({email : email})

    if(!user){
        return res.status(500).json({
            type : "error",
            message : "Invalid email or password"
        })
    }

    const checkPassword = await bycrpt.compare(password, user.password)

    if(!checkPassword){
        res.status(500).json({
            type : "error",
            message : "Invalid email or password"
        })
    } else {

        const accessToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        }, process.env.JWT_ACCESS_TOKEN,
        {'expiresIn' : '1d'} 
        )

        const {password, ...date} = user._doc

        res.status(200).json({
            type : "success",
            message : "Successfuly logged in",
            ...date,
            accessToken
        })
    }
}
module.exports = {createUser, loginUser}