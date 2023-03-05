const Router = require('express')
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/registration', userController.registration) //регистрация
router.post('/login', userController.login) //авторизация
router.get('/auth', authMiddleware, userController.check) //аутентификация
router.post('/redPhoto', userController.redUserPhoto) //меняем фото
router.delete('/logout', userController.logout) //выходим



module.exports = router