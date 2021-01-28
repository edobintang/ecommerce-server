const { History } = require('../models')

class Controller {
    static showHistory(req, res, next) {
        History.findAll({
            where: { UserId: +req.UserId }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({
                    msg: 'Internal server error',
                    code: 500,
                    from: 'Controller History: show history'
                })
            })
    }

    static createHistory(req, res, next) {
        const { description, amount } = req.body

        let descString = ''
        for (let i = 0; i < description.length; i++) {
            const data = description[i]

            descString = descString + `${data.Material.name} : ${data.quantity}` + "\n"
        }

        const history = {
            description: descString,
            amount,
            UserId: +req.UserId
        }

        History.create(history)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next({
                    msg: err.message,
                    code: 500,
                    from: 'Controller History: create history'
                })
            })
    }

    static deleteAll(req, res, next) {
        const UserId = +req.UserId

        History.destroy({
            where: { UserId }
        })
            .then(data => {
                res.status(200).json({ message: 'Items successfully deleted!' })
            })
            .catch(err => {
                next({
                    msg: 'Internal server error',
                    code: 500,
                    from: 'Controller History: delete history'
                })
            })
    }
}

module.exports = Controller