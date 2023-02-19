import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import styles from "../css-modules/profile.module.css"

const toNormalDate = (date) => {
    let year = date.substr(0, 4)
    let month = date.substr(5, 2)
    let day = date.substr(8, 2)

    return day + "." + month + "." + year
}

const UserProfile = () => {
    const {user} = useContext(Context)

    const navigate = useNavigate()

    const signOut = async (e) => {
        e.preventDefault()
        user.setUser({})
        user.setIsAuth(false)
        navigate('/')
    }


    return (
        <form className={ styles.profile }>
            <div className={ styles.navBar }>
                <button className={ styles.homeButton } type="button" onClick={signOut}>Выйти</button>
            </div>
            <div className={ styles.divUserInfo }>
                <div className={ styles.divPhoto }>
                    <img className={ styles.userPhoto } src={process.env.REACT_APP_API_URL + user._user.photo}></img>
                </div>
                <h1 className={ styles.text }>{user._user.login}</h1>
                <h1 className={ styles.text }>{toNormalDate(user._user.dateBirth)}</h1>
                <button className={ styles.redButton } >ред.</button>

            </div>
        </form>
    );
};

export default UserProfile;