const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const path = require('path')

const TOKEN_COOKIE_NAME = 'token';

const generateToken = (id, email, login, role, photo, dateBirth) => {
    return jwt.sign(
        {id, email, login, role, photo, dateBirth},
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
            return next(ApiError.busy('Эта электронная почта занята/Этот логин занят'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, login, password: hashPassword, role})
        const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth)

        res.cookie(TOKEN_COOKIE_NAME, token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            path: '/'
        });

        res.end()
    }

    async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.message('Такого пользователя не существует')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.message('Неправильный пароль')
        }
        const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth)

        console.log(token)

        res.cookie(TOKEN_COOKIE_NAME, token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            path: '/'
        })

        res.end()
    }

    async addUserCourse() {

    }

    async getUserCourse(req, res) {
    }

    async logout(req, res) {
        res.clearCookie(TOKEN_COOKIE_NAME)
        res.end()
    }

    async check(req, res) {
        const token = generateToken(req.body)

        res.cookie(TOKEN_COOKIE_NAME, token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            path: '/'
        });

        res.end()
    }

    async redUserPhoto(req, res, next) {
        try {
            let {email, login} = req.body
            const {photo} = req.files
            let fileName = login + ".png"
            await photo.mv(path.resolve(__dirname, '..', 'static', fileName))

            const user = await User.update({photo: login + ".png"}, {where: {email: email}})

            return res.json(user)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()