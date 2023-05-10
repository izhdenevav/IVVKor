import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(private user: [] = [], private isAuth: boolean = false, private isActivated: boolean = false) {
        this.user = user
        this.isAuth = isAuth
        this.isActivated = isActivated
        makeAutoObservable(this)
    }
}

//
// export default class UserStore {
//
//     isAuth: boolean
//     user: []
//
//     constructor() {
//         this.isAuth = false
//         this.user = []
//         makeAutoObservable(this)
//     }
//
//     setIsAuth(bool: boolean) {
//         this.isAuth = bool
//     }
//
//     setUser(user: []) {
//         this.user = user
//     }
// }