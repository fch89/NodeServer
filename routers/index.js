// 引入modules
const express = require('express')
//
const router = express.Router()
//引入user router
const user =require('./user.js')(router)

router.get('/', (req, res, next) => {
  res.json({
    status: '0',
    title: 'Demo',
    msg: 'api server',
    result: 'success'
  })
})
//

module.exports =router;