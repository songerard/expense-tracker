const db = require('../../config/mongoose')
const User = require('../user')
const userSeed = require('./json/user.json')
const bcrypt = require('bcryptjs')

// add category seeder to mongodb
db.once('open', () => {
  Promise.all(userSeed.map(seed => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seed.password, salt))
      .then(hash => {
        seed.password = hash
        return User.create(seed)
      })
      .catch(err => console.log(err))
  }))
    .then(() => {
      console.log('User seeds created.')
      process.exit()
    })
    .catch(err => console.log(err))
})