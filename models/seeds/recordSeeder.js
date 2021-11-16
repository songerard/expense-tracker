const db = require('../../config/mongoose')
const Record = require('../record')
const recordSeed = require('./json/record.json')

// add record seeder to mongodb
db.once('open', () => {
  Promise.all(recordSeed)
    .then(() => {
      return Record
        .create(recordSeed)
        .catch(err => console.log(err))
    })
    .then(() => {
      console.log('Record seeds created.')
      process.exit()
    })
    .catch(err => console.log(err))
})