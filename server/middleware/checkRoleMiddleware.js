const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, next) {
        if (!req.cookies.token) return next()

        try {
            const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Пользователь не авторизован"})
        }
    }
}

