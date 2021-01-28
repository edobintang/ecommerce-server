const { User, Material, Cart } = require('../models')
const { Op, DataTypes } = require("sequelize")

class Controller {
    static showCart(req, res, next) {
        Cart.findAll({
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
                    from: 'Controller Cart: show all cart'
                })
            })
    }

    static addToCart(req, res, next) {
        const { MaterialId, amount } = req.body
        const UserId = req.UserId

        Cart.findOne({
            where: {
                [Op.and]: [
                    { UserId },
                    { MaterialId }
                ]
            }
        })
            .then(data => {
                if (!data) {
                    const cart = {
                        UserId,
                        MaterialId,
                        quantity: +amount
                    }

                    return Cart.create(cart)
                } else {
                    let lastQuantity = +data.quantity
                    let newQuantity = lastQuantity + (+amount)

                    const cartUpdated = {
                        UserId,
                        MaterialId,
                        quantity: newQuantity
                    }

                    return Cart.update(cartUpdated, {
                        where: {
                            [Op.and]: [
                                { UserId },
                                { MaterialId }
                            ]
                        }
                    })
                }
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next({
                    msg: err.message,
                    code: 500,
                    from: 'Controller Cart: create cart'
                })
            })
    }

    static updateQuantity(req, res, next) {
        const { amount } = req.body
        const id = +req.params.id

        Cart.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    next({
                        msg: 'Item not found!',
                        code: 401,
                        from: 'Controller Cart: update amount cart'
                    })
                } else {
                    const cart = {
                        UserId: data.UserId,
                        MaterialId: data.MaterialId,
                        quantity: +amount
                    }

                    return Cart.update(cart, {
                        where: { id }
                    })
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({
                    msg: err.message,
                    code: 500,
                    from: 'Controller Cart: update amount cart'
                })
            })
    }

    static deleteCart(req, res, next) {
        const id = +req.params.id

        Cart.destroy({
            where: { id }
        })
            .then(data => {
                res.status(200).json({ message: 'Item successfully deleted!' })
            })
            .catch(err => {
                next({
                    msg: 'Internal server error'
                })
            })
    }

    static deleteAll(req, res, next) {
        const UserId = +req.UserId

        Cart.destroy({
            where: { UserId }
        })
        .then(data => {
            res.status(200).json({ message: 'Items successfully deleted!' })
        })
        .catch(err => {
            next({
                msg: 'Internal server error',
                code: 500,
                from: 'Controller Cart: delete cart by user id'
            })
        })
    }
}

module.exports = Controller