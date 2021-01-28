const { Wishlist, User, Material } = require('../models')
const { Op, DataTypes } = require("sequelize")

class Controller {
    static showWishlist(req, res, next) {
        Wishlist.findAll({
            where: { UserId: req.UserId },
            include: {
                model: Material,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({
                    msg: err.message,
                    code: 500,
                    from: 'Controller Cart: show all wishlist'
                })
            })
    }

    static createWishlist(req, res, next) {
        const wishlist = {
            UserId: +req.UserId,
            MaterialId: +req.body.MaterialId
        }

        Wishlist.findOne({
            where: {
                [Op.and]: [
                    { UserId: +req.UserId },
                    { MaterialId: +req.body.MaterialId }
                ]
            }
        })
            .then(data => {
                if (data) {
                    next()
                } else {
                    return Wishlist.create(wishlist)
                }
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next({
                    msg: err.message,
                    code: 500,
                    from: 'Controller Wishlist: create wishlist'
                })
            })
    }

    static deleteWishlist(req, res, next) {
        const id = +req.params.id

        Wishlist.destroy({
            where: { id }
        })
            .then(data => {
                res.status(200).json({ message: 'Item successfully deleted!' })
            })
            .catch(err => {
                next({
                    msg: 'Internal server error',
                    code: 500,
                    from: 'Controller Wishlist: delete wishlist'
                })
            })
    }
}

module.exports = Controller