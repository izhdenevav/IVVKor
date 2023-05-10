import React, {useContext} from 'react';
import styles from '../css-modules/userInformation.module.css';
import {Context} from "../index";

const toNormalDate = (date) => {
    let year = date.substr(0, 4)
    let month = date.substr(5, 2)
    let day = date.substr(8, 2)

    return day + "." + month + "." + year
}
const UserInformation = () => {
    const {user} = useContext(Context)

    let userPhoto = process.env.REACT_APP_API_URL + user.user.photo



    return (
        <div className={ styles.main__container }>
            <div className={ styles.profile_information__container }>
                <label className={ styles.text }>Редактировать личную информацию: </label>
                <div>
                    <div className={ styles.button__container }>
                        <label className={ styles.text }>{user.user.login}</label>
                        <button className={ styles.button }>Изменить логин</button>
                    </div>
                    <div className={ styles.button__container }>
                        <img className={ styles.img } src={ userPhoto }/>
                        <button className={ styles.button }>Изменить аватарку</button>
                    </div>
                    <div className={ styles.button__container }>
                        <label className={ styles.text }>{toNormalDate(user.user.dateBirth)}</label>
                        <button className={ styles.button }>Изменить дату рождения</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInformation;