const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if (!req.cookies.token) return next()

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Пользователь не авторизован"})
    }
}