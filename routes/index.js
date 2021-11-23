const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')


const home = require('./modules/home')
const users = require('./modules/users')
const expenses = require('./modules/expenses')


// redirect request
router.use('/users', users)
router.use('/expenses', authenticator, expenses)
router.use('/', authenticator, home)
// router.use('/', home)



module.exports = router