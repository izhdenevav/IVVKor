const Router = require('express')
const courseController = require('../controllers/CourseController')

const router = new Router()

router.post('/add', courseController.addCourse) //добавить курс
router.delete('/delete', courseController.deleteCourse) //удалить курс
router.get('/all', courseController.getAll) //все курсы
router.get('/:name', courseController.getOne) //конкретный курс

module.exports = router