import {makeAutoObservable} from "mobx";

export default class UserStore {

    isAuth: boolean
    user: []

    constructor() {
        this.isAuth = false
        this.user = []
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: []) {
        this.user = user
    }

    // get isAuth() {
    //     return this.isAuth
    // }
    //
    // get user() {
    //     return this.user
    // }
}