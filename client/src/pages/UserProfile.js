import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import styles from "../css-modules/profile.module.css"

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
        <div>
            <div className={ styles.divPhoto }>
                <img className={ styles.userPhoto } src={process.env.REACT_APP_API_URL + user._user.photo}></img>
            </div>
            <h1>{user._user.login}</h1>
            <h1>{user._user.dateBirth}</h1>
            <button type="button" onClick={signOut}>Выйти</button>
        </div>
    );
};

export default UserProfile;