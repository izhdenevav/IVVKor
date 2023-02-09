const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, unique: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    photo: {type: DataTypes.STRING, defaultValue: "default-user.png"},
    dateBirth: {type: DataTypes.DATE, defaultValue: "01.01.2000"}
})

const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true}
})

const UserCourse = sequelize.define('userCourse', {
})

User.belongsToMany(Course, {through: UserCourse})
Course.belongsToMany(User, {through: UserCourse})

module.exports = {
    User,
    Course
}