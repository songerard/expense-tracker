const express = require('express')
const exphbs = require('express-handlebars')
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
  secret: 'process.env.SESSION_SECRET',
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


const PORT = 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})