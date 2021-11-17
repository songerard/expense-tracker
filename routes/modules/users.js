const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


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
  const { loginName, displayName, password, confirmPassword } = req.body
  const errors = []
  if (!loginName || !displayName || !password || !confirmPassword) {
    errors.push('請輸入顯示名稱、登入名稱、密碼及確認密碼')
  }
  if (password !== confirmPassword) {
    errors.push('密碼及確認密碼不一致')
  }
  if (errors.length) {
    return res.render('register', { errors, loginName, displayName, password, confirmPassword })
  }
  User.findOne({ loginName })
    .then(user => {
      if (user) {
        errors.push('這登入名稱已經注冊過了')
        return res.render('register', { errors, loginName, displayName, password, confirmPassword })
      }

      // use bcryptjs to encrypt password
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          loginName,
          displayName,
          password: hash
        }))
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    })
})

// logout
router.get('/logout', (req, res) => {
  res.send('logout')
})


module.exports = router