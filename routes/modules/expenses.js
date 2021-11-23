const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// register new handlebars function
const exphbs = require('express-handlebars')
let recordCategoryId = 0
let hbs = exphbs.create({})
hbs.handlebars.registerHelper('if_eq', function (a, options) {
  if (a === recordCategoryId) {
    return options.fn(this)
  }
})

// create new expense page
router.get('/new', (req, res) => {
  Category.find()
    .sort({ 'id': 'asc' })
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
    .catch(err => console.log(err))
})

// edit expense page
router.get('/:id/edit', (req, res) => {
  let allCategories = []
  Category.find()
    .sort({ 'id': 'asc' })
    .lean()
    .then(categories => {
      allCategories = categories
    })
    .catch(err => console.log(err))

  const id = req.params.id
  const userId = req.user.id

  Record.findOne({ id, userId })
    .populate('category')
    .lean()
    .then(record => {
      // render edit page and set restaurant's current category as default
      recordCategoryId = record.categoryId
      record.date = record.date.toDateString()
      // console.log(record.categoryId)
      // console.log(allCategories.id)
      res.render('edit', { record, allCategories })
    })
    .catch(err => console.log(err))
})

// edit expense
router.put('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  Record.findOne({ id, userId })
    .then(record => {
      Object.assign(record, req.body)
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// delete record
router.delete('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  Record.findOne({ id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router