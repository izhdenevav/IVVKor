const Router = require('express')
const userController = require('../controllers/UserController')

const router = new Router()

router.post('/registration', userController.registration) //регистрация
router.post('/login', userController.login) //авторизация
router.get('/auth', userController.check) //аутентификация

module.exports = router