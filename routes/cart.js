const express = require('express')
const router = express.Router()

const {
    getAllCarts,
    getCart,
    deleteCart,
    updateCart,
    createCart
} = require('../controllers/cart')

const { authenticationVerifier, accessLevelVerifier, isAdminVerifire} = require('../middleware/verifyToken')

router.route('/').get(isAdminVerifire, getAllCarts).post(authenticationVerifier, createCart)
router.route('/:id').get(accessLevelVerifier, getCart).delete(accessLevelVerifier, deleteCart).put(accessLevelVerifier, updateCart)

module.exports = router