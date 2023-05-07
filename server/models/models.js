const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, unique: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    photo: {type: DataTypes.STRING, defaultValue: "default-user.png"},
    dateBirth: {type: DataTypes.DATE, defaultValue: "01.01.2000"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    isBlocked: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true},
    image: {type: DataTypes.STRING, defaultValue: "default-course.png"},
    description: {type: DataTypes.TEXT},
    rating: {type: DataTypes.DECIMAL(1, 1), defaultValue: 0.0}
})

const UserCourse = sequelize.define('userCourse', {
    progress: {type: DataTypes.INTEGER, defaultValue: 0},
    courseMark: {type: DataTypes.INTEGER, defaultValue: 0}
})

const EducationalMaterials = sequelize.define('educationalMaterials', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    fileName: {type: DataTypes.STRING}
})

const CourseComplaints = sequelize.define('courseComplaints', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    topic: {type: DataTypes.TEXT},
    status: {type: DataTypes.STRING, defaultValue: "Подана"}
})

const UserComplaints = sequelize.define('userComplaints', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    topic: {type: DataTypes.TEXT},
    status: {type: DataTypes.STRING, defaultValue: "Подана"}
})

User.belongsToMany(Course, {through: UserCourse})
Course.belongsToMany(User, {through: UserCourse})

Course.hasMany(EducationalMaterials)

Course.hasMany(CourseComplaints)

User.hasMany(UserComplaints)

module.exports = {
    User,
    Course,
    UserCourse,
    EducationalMaterials,
    CourseComplaints,
    UserComplaints
}