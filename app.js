const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


app.use(routes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})