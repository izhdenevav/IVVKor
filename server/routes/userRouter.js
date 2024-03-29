const Router = require('express')
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/registration', userController.registration) //регистрация
router.post('/login', userController.login) //авторизация
router.get('/auth', authMiddleware, userController.check) //аутентификация
router.get('/activate/:link', userController.activate) //активация аккаунта
router.post('/updateUserInfo', userController.updateUserInfo) //меняем информацию о пользователю
router.delete('/logout', userController.logout) //выходим
router.delete('/deleteAccount', userController.deleteAccount) //удаляем аккаунт
router.post('/addUserCourse', userController.addUserCourse) //добавить курс пользователю
router.post('/getUserCourses', userController.getUserCourses) //получить курсы пользователя
router.post('/updatePassword', userController.updatePassword) //меняем пароль
router.post('/updateEmail', userController.updateEmail) //меняем почту
router.post('/getUser', userController.getUserByLogin) //получаем пользователя по логину
router.post('/certificate', userController.sendCertificate) //отправляем сертификат
router.post('/search', userController.searchUsers) //ищем пользователей

module.exports = router