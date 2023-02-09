const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')

const generateToken = (id, email, login, role) => {
    return jwt.sign(
        {id, email, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, login, password, role} = req.body
        if (!email || !password || !login) {
            return next(ApiError.badRequest('Пустые данные'))
        }
        const candidate = await User.findOne({where: {email} || {login}})
        if (candidate) {
            return next(ApiError.badRequest('Эта электронная почта занята/Этот логин занят'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, login, password: hashPassword, role})
        const token = generateToken(user.id, user.email, user.login, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Такого пользователя не существует'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неправильный пароль'))
        }
        const token = generateToken(user.id, user.email, user.login, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateToken(req.user.id, req.user.email, req.user.login, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()