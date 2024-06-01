const express = require('express')
const router = express.Router()

const {
    getAllOrders,
    getSingleOrder,
    deleteOrder,
    createOrder,
    updateOrder
} = require('../controllers/order')

const { authenticationVerifier, accessLevelVerifier, isAdminVerifire } = require('../middleware/verifyToken')

router.route('/').get(isAdminVerifire, getAllOrders).post(authenticationVerifier, createOrder)
router.route('/:id').get(accessLevelVerifier, getSingleOrder).delete(isAdminVerifire, deleteOrder).put(isAdminVerifire, updateOrder)

module.exports = router

