const express = require('express')
const router = express.Router()

const {
    getAllProducts,
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct
} = require('../controllers/product')
 
const { isAdminVerifire } = require('../middleware/verifyToken')

router.route('/').get(getAllProducts).post(isAdminVerifire, createProduct)   
router.route('/:id').get(getProduct).delete(isAdminVerifire, deleteProduct).put(isAdminVerifire, updateProduct)

module.exports = router