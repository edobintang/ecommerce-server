const route = require('express').Router()
const Controller = require('../controllers/wishlist-controller')
const { authentication, authorizationWishlist } = require('../middlewares/auth')

// routng and endpoints
route.use(authentication)

route.get('/wishlists', Controller.showWishlist)
route.post('/wishlists', Controller.createWishlist)
route.delete('/wishlists/:id', authorizationWishlist, Controller.deleteWishlist)

module.exports = route