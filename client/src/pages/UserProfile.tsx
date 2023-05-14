import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import styles from "../css-modules/profile.module.css"
import {observer} from "mobx-react-lite";
import Navbar from "../components/Navbar";
import {getUserByLogin, getUserCourses} from "../http/userAPI";
import {useParams} from "react-router-dom";

const UserProfile = observer(() => {
    const {login} = useParams()

    const {user} = useContext(Context)

    const [alien, setAlien] = useState(null)

    useEffect(() => {
        if (login) {
            getUserByLogin(login as string).then(data => {
                setAlien(data)
            })
        } else {
            setAlien(null)
        }
    })

    let photo = alien ? alien.photo : user.user.photo

    let userPhoto = process.env.REACT_APP_API_URL + photo

    return (
        <div>
            <Navbar/>
            <div  className={ styles.profile }>
                <label className={ user.user.isActivated || alien ? styles.userIsActivatedInvisible : styles.userIsActivated}>Ваша почта не подтверждена, перейдите по ссылке в письме!</label>
                <div className={ styles.info__container}>
                    <div className={ styles.divUserInfo }>
                        <div className={ styles.divPhoto }>
                            <img className={ styles.userPhoto } src={ userPhoto }></img>
                        </div>
                        <h1 className={ styles.text }>{ alien ? alien.login : user.user.login }</h1>
                        <h1 className={ styles.text }>{ alien ? alien.dateBirth : user.user.dateBirth }</h1>
                    </div>
                    <div className={ styles.lpl__container }>
                        <h1 className={ styles.text }>Гып:</h1>
                        <h1 className={ styles.text }>{ alien ? alien.lpl : user.user.lpl }</h1>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default UserProfile;