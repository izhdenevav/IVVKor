const bcrypt = require('bcrypt')
const {User, UserCourse, Course, ConfirmationRequests} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const path = require('path')
const uuid = require('uuid')
const mailService = require('../service/mailService')
const {Op} = require("sequelize");

const TOKEN_COOKIE_NAME = 'token';

const generateToken = (id, email, login, role, photo, dateBirth, lpl, isActivated, isBlocked) => {
    return jwt.sign(
        {id, email, login, role, photo, dateBirth, lpl, isActivated, isBlocked},
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


        const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth, user.lpl, user.isActivated, user.isBlocked)

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
            let user = await User.findOne({where: {activationLink}})
            if (!user) {
                return next(ApiError.badRequest("Некорректная ссылка активации"))
            }

            const email = user.email

            await User.update({isActivated: true}, {where: {email: email}})

            user = await User.findOne({where: {email}})

            const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth, user.lpl, user.isActivated, user.isBlocked)

            res.cookie(TOKEN_COOKIE_NAME, token, {
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                path: '/'
            });

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

        const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth, user.lpl, user.isActivated, user.isBlocked)

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

        const courses = await User.findOne({
            where: {id},
            include: Course
        })

        return res.json(courses)
    }

    async logout(req, res) {
        res.clearCookie(TOKEN_COOKIE_NAME)
        res.end()
    }

    async check(req, res) {
        return res.json()
    }

    async updateUserInfo(req, res, next) {
        try {
            let {email, login, dateBirth} = req.body

            const {photo} = req.files

            let fileName = login + ".png"

            await photo.mv(path.resolve(__dirname, '..', 'static', fileName))

            await User.update({photo: login + ".png", login: login, dateBirth: dateBirth}, {where: {email: email}})

            let user = await User.findOne({where: {email: email}})

            const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth, user.lpl, user.isActivated, user.isBlocked)

            res.cookie(TOKEN_COOKIE_NAME, token, {
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                path: '/'
            })

            res.end()
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updatePassword(req, res, next) {
        let {email, oldPassword, newPassword} = req.body

        let user = await User.findOne({where: {email}})

        if (!bcrypt.compareSync(oldPassword, user.password)) {
            return next(ApiError.badRequest("Неправильный пароль!"))
        }

        await User.update({password: newPassword}, {where: {email: email}})

        res.end()
    }

    async updateEmail(req, res) {
        let {id, email} = req.body

        const activationLink = uuid.v4()

        await User.update({email: email, activationLink: activationLink}, {where: {id: id}})

        await mailService.sendActivationMail(email, `${process.env.API_URL}/ivvkor/user/activate/${activationLink}`)

        const user = await User.findOne({where: {email}})

        const token = generateToken(user.id, user.email, user.login, user.role, user.photo, user.dateBirth, user.lpl, user.isActivated, user.isBlocked)

        res.cookie(TOKEN_COOKIE_NAME, token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            path: '/'
        })

        res.end()
    }

    async deleteAccount(req, res) {
        const {email} = req.body

        // const user = await User.findOne({where: {email: email}})

        // if (!bcrypt.compareSync(password, user.password)) {
        //
        // }

        await User.destroy({where: {email: email}})

        res.end()
    }

    async getUserByLogin(req, res) {
        const {login} = req.body

        const user = await User.findOne({where: {login}})

        return res.json({id: user.id, login: user.login, dateBirth: user.dateBirth, lpl: user.lpl, photo: user.photo})
    }

    async sendCertificate(req, res) {
        const {userId, login} = req.body

        const {certificate} = req.files

        const examCertificate = login + "_certificate"

        await certificate.mv(path.resolve(__dirname, '..', 'static', examCertificate))

        await ConfirmationRequests.create({userId, examCertificate})

        res.end()
    }

    async searchUsers(req, res, next) {
        const {text} = req.body

        const result  = await User.findAll( {where: {
                login: {
                    [Op.startsWith]: text
                }
        }})

        if (!result) {
            return next(ApiError.badRequest("Ничего не найдено!"))
        }

        return res.json(result)
    }
}

module.exports = new UserController()