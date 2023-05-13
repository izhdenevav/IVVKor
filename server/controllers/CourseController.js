const {Course, User} = require('../models/models')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const path = require("path");

class CourseController {
    async deleteCourse(req, res) {
        const {name} = req.body

        await Course.destroy({where: {name}})

        fs.unlink('../server/static/' + `${name}` + '.png', err => {
            if(err) console.log(err)
            console.log('Файл успешно удалён')
        });

        res.end()
    }

    async addCourse(req, res) {
        const {name, description} = req.body

        const {courseImage} = req.files
        let image = name + ".png"

        await courseImage.mv(path.resolve(__dirname, '..', 'static', image))

        const course = await Course.create({name, image, description})

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