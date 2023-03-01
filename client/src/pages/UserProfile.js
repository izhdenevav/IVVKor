import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import styles from "../css-modules/profile.module.css"
import {observer} from "mobx-react-lite";

const toNormalDate = (date) => {
    let year = date.substr(0, 4)
    let month = date.substr(5, 2)
    let day = date.substr(8, 2)

    return day + "." + month + "." + year
}

const UserProfile = observer(() => {
    const {user} = useContext(Context)

    const navigate = useNavigate()

    const signOut = async (e) => {
        e.preventDefault()
        user.setUser({})
        user.setIsAuth(false)
        navigate('/')
    }

    const toHome = () => {
        navigate('/')
    }

    let userPhoto = process.env.REACT_APP_API_URL + user._user.photo


    return (
        <form className={ styles.profile }>
            <div className={ styles.navBar } onClick={toHome}>
                <button className={ styles.homeButton } onClick={signOut}>Выйти</button>
                <button>На главную</button>
            </div>
            <div className={ styles.divUserInfo }>
                <div className={ styles.divPhoto }>
                    <img className={ styles.userPhoto } src={userPhoto}></img>
                </div>
                <h1 className={ styles.text }>{user._user.login}</h1>
                <h1 className={ styles.text }>{toNormalDate(user._user.dateBirth)}</h1>
                <button className={ styles.redButton } >ред.</button>
            </div>
        </form>
    );
})

export default UserProfile;