import {makeAutoObservable} from "mobx";

export default class CourseStore {

    courses: []

    constructor() {
        this.courses = []
        makeAutoObservable(this)
    }

    setCourses(courses) {
        this.courses = courses
    }
}