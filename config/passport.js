const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')


module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // Configuration LocalStrategy
  passport.use(new LocalStrategy({
    usernameField: 'loginName',
    passReqToCallback: true
  }, (req, loginName, password, done) => {
    User.findOne({ loginName })
      .then(user => {
        if (!user) {
          req.flash('warningMsg', '這電郵仍未註冊過')
          req.flash('loginName', loginName)
          req.flash('password', password)
          return done(null, false)
        }
        return bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              req.flash('warningMsg', '密碼錯誤')
              req.flash('loginName', loginName)
              req.flash('password', password)
              return done(null, false)
            }
            return done(null, user)
          })
      })
      .catch(err => done(err))
  }))


  // serialize and deserialize user instances to and from the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findOne({ id })
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}

