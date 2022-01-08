const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')


const home = require('./modules/home')
const users = require('./modules/users')
const expenses = require('./modules/expenses')
const auth = require('./modules/auth')


// redirect request
router.use('/auth', auth)
router.use('/users', users)
router.use('/expenses', authenticator, expenses)
router.use('/', authenticator, home)



module.exports = router