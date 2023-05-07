const Router = require('express')
const courseController = require('../controllers/CourseController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/add', checkRole('ADMIN'), courseController.addCourse) //создать курс
router.delete('/delete', checkRole('ADMIN'), courseController.deleteCourse) //удалить курс
router.get('/all', courseController.getAll) //все курсы
router.get('/:name', courseController.getOne) //конкретный курс

module.exports = router