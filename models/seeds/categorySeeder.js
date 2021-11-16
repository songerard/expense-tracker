const db = require('../../config/mongoose')
const Category = require('../category')
const categorySeed = require('./json/category.json')

// add category seeder to mongodb
db.once('open', () => {
  Promise.all(categorySeed)
    .then(() => {
      return Category
        .create(categorySeed)
        .catch(err => console.log(err))
    })
    .then(() => {
      console.log('Category seeds created.')
      process.exit()
    })
    .catch(err => console.log(err))
})