const express = require('express')
const exphbs = require('express-handlebars')


const app = express()


app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  res.send('app.js')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})