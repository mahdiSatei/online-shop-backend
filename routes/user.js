const express = require('express')
const router = express.Router()

const {isAdminVerifire, accessLevelVerifier} = require('../middleware/verifyToken')

const {
    getAllUsers, 
    getSingleUser, 
    updateUser, 
    deleteUser,
    getStatus
} = require('../controllers/user')

router.route('/').get(isAdminVerifire, getAllUsers)
router.route('/status').get(isAdminVerifire, getStatus)
router.route('/:id').get(isAdminVerifire, getSingleUser).put(accessLevelVerifier, updateUser).delete(isAdminVerifire, deleteUser)

module.exports = router