const express = require('express')
const router = express.Router()

const authController = require('../app/controller/authController')

// Register User
router.post('/register', authController.registerUser)

// Login User
router.post('/login', authController.loginUser)

module.exports = router