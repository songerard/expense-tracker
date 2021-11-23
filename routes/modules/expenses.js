const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// create new expense page
router.get('/new', (req, res) => {
  const userId = 1
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
    .catch(err => console.log(err))
})

// add new expense into mongodb
router.post('/', (req, res) => {
  const userId = req.user.id
  let {
    name,
    date,
    amount,
    categoryId
  } = req.body

  Record.create({
    name,
    date,
    amount,
    userId,
    categoryId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})



module.exports = router