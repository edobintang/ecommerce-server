const route = require('express').Router()
const Controller = require('../controllers/history-controller')
const { authentication } = require('../middlewares/auth')

// routing and endpoints
route.use(authentication)

route.get('/histories', Controller.showHistory)
route.post('/histories', Controller.createHistory)
route.delete('/histories', Controller.deleteAll)

module.exports = route