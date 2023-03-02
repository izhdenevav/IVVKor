import React, {useContext} from 'react';
import {Context} from "../index";
import styles from "../css-modules/profile.module.css"
import {observer} from "mobx-react-lite";
import Navbar from "../components/Navbar";

const toNormalDate = (date) => {
    let year = date.substr(0, 4)
    let month = date.substr(5, 2)
    let day = date.substr(8, 2)

    return day + "." + month + "." + year
}

const UserProfile = () => {
    const {user} = useContext(Context)

    let userPhoto = process.env.REACT_APP_API_URL + user._user.photo

    return (
        <div className={ styles.profile }>
            <Navbar/>
            <div className={ styles.divUserInfo }>
                <div className={ styles.divPhoto }>
                    <img className={ styles.userPhoto } src={userPhoto}></img>
                </div>
                <h1 className={ styles.text }>{user._user.login}</h1>
                <h1 className={ styles.text }>{toNormalDate(user._user.dateBirth)}</h1>
            </div>
        </div>
    );
};

export default UserProfile;