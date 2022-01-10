const express = require('express')
const exphbs = require('express-handlebars')
// require dotenv (before routes)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
const bodyParser = require('body-parser')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const methodOverride = require('method-override')

const app = express()


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.successMsg = req.flash('successMsg')
  res.locals.warningMsg = req.flash('warningMsg')
  res.locals.loginName = req.flash('loginName')
  res.locals.password = req.flash('password')
  next()
})
app.use(express.static('public'))
app.use(routes)

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  // res.status(500).send('Something broke!')
  res.render('error')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})