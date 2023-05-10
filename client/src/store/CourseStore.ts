import {makeAutoObservable} from "mobx";

export default class CourseStore {
    constructor(private courses: [] = []) {
        this.courses = []
        makeAutoObservable(this)
    }
}