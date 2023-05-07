const bcrypt = require('bcrypt')
const {User, UserCourse, Course} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const path = require('path')
const uuid = require('uuid')
const mailService = require('../service/mailService')

const TOKEN_COOKIE_NAME = 'token';

const generateToken = (id, email, login, role, photo, dateBirth, isActivated, isBlocked) => {
    return jwt.sign(
        {id, email, login, role, photo, dateBirth, isActivated, isBlocked},
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
        const activationLink = uuid.v4()


        const user = await User.create({email, login, password: hashPassword, role, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/ivvkor/user/activate/${activationLink}`)


        const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth, user.isActivated, user.isBlocked)

        res.cookie(TOKEN_COOKIE_NAME, token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            path: '/'
        });

        res.end()
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            const user = await User.findOne({where: {activationLink}})
            if (!user) {
                return next(ApiError.badRequest("Некорректная ссылка активации"))
            }

            user.isActivated = true

            await user.save()

            return res.redirect(process.env.CLIENT_URL)
        } catch (err) {
            console.log(err.message)
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.badRequest("Такого пользователя не существует!"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest("Неправильный пароль!"))
        }

        const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth, user.isActivated, user.isBlocked)

        res.cookie(TOKEN_COOKIE_NAME, token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            path: '/'
        })

        res.end()
    }

    async addUserCourse(req, res) {
        const {userId, courseId} = req.body

        await UserCourse.create({userId, courseId})

        res.end()
    }

    async getUserCourses(req, res) {
        const {id} = req.body

        const user = await User.findOne({
            where: {id},
            include: Course
        })

        return res.json(user.courses)
    }

    async logout(req, res) {
        res.clearCookie(TOKEN_COOKIE_NAME)
        res.end()
    }

    async check(req, res) {
        return res.json()
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