const express = require('express')
const router = express.Router()


// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login action
router.post('/login', (req, res) => {
  res.send('login')
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register action
router.post('/register', (req, res) => {
  res.send('register')
})

// logout
router.get('/logout', (req, res) => {
  res.send('logout')
})


module.exports = router