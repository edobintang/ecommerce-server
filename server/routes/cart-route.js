const route = require('express').Router()
const Controller = require('../controllers/cart-controller')
const { authentication, authorizationCart } = require('../middlewares/auth')

// routing ad endpoints
route.use(authentication)

route.get('/carts', Controller.showCart)
route.post('/carts', Controller.addToCart)
route.patch('/carts/:id', authorizationCart, Controller.updateQuantity)
route.delete('/carts/:id', authorizationCart, Controller.deleteCart)
route.delete('/carts', Controller.deleteAll)

module.exports = route