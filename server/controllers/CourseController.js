const {Course} = require('../models/models')
const ApiError = require('../error/ApiError')

class CourseController {
    async deleteCourse(req, res) {

    }

    async addCourse(req, res) {
        const {name} = req.body
        const course = await Course.create({name})
        return res.json(course)
    }

    async getAll(req, res) {
        const courses = await Course.findAll()
        return res.json(courses)
    }

    async getOne(req, res) {
        const {name} = req.params
        const course = await Course.findOne(
            {
                where: {name}
            }
        )
        return res.json(course)
    }
}

module.exports = new CourseController()