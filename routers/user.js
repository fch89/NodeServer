const userData = require('../mock/userData')

module.exports = (router) => {
  router.get('/api/user', (req, res, next) => {
    res.json(userData)
  })
}