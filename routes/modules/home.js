const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

let uniqueCategoryList = []

// home page
router.get('/', (req, res) => {
  const userId = req.user.id
  Record.find({ userId })
    .lean()
    .populate('category')
    .sort({ 'date': 'desc', 'categoryId': 'asc' })
    .then(records => {
      // get unique category list for current user
      records.forEach(record => {
        let obj = {
          "categoryId": record.categoryId,
          "categoryName": record.category.name
        }
        uniqueCategoryList.push(obj)
      })
      uniqueCategoryList = uniqueObjArray(uniqueCategoryList)

      // get total amount for all expenses or filtered expenses
      let totalAmount = 0
      totalAmount = sumTotalOfDb(records)

      // modify date format
      records.forEach(record => {
        record.date = record.date.toDateString()
      })

      // render index page
      res.render('index', { records, totalAmount, uniqueCategoryList })
    })
    .catch(err => console.log(err))
})


// filter expenses
router.get('/filter/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId
  const userId = req.user.id

  if (categoryId === 'all') {
    res.redirect('/')
  } else {
    Record.find({ userId, categoryId })
      .lean()
      .populate('category')
      .sort({ 'date': 'desc', 'categoryId': 'asc' })
      .then(records => {
        // get total amount for all expenses or filtered expenses
        let totalAmount = 0
        totalAmount = sumTotalOfDb(records)

        // modify date format
        records.forEach(record => {
          record.date = record.date.toDateString()
        })

        // render index page
        res.render('index', { records, totalAmount, uniqueCategoryList })
      })
      .catch(err => console.log(err))
  }
})


function uniqueObjArray(array) {
  return [...new Map(array.map((item) => [item["categoryId"], item])).values(),]
}

function sumTotalOfDb(records) {
  let totalAmount = 0
  records.forEach(record => {
    totalAmount = totalAmount + record.amount
  })
  return totalAmount
}

module.exports = router