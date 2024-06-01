const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticationVerifier = (req, res, next) => {
    
    const authHeader = req.headers.Authorization || req.headers.authorization
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if(err) {
                return res.status(401).json("Invalid user")
            } 
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("You are not authorized")
    }
}

const accessLevelVerifier = (req, res, next) => {
    authenticationVerifier(req, res, ()=> {
        if (req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not allowed to perform this task")
        }
    })
}

const isAdminVerifire = (req, res, next) => {
    authenticationVerifier(req, res, ()=> {
        if (req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not allowed to perform this task")
        }
    })
} 

module.exports = {authenticationVerifier, accessLevelVerifier, isAdminVerifire}