import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import styles from "../css-modules/profile.module.css"
import {observer} from "mobx-react-lite";
import Navbar from "../components/Navbar";
import ViewCourse from "../components/ViewCourse";
import {getUserCourses} from "../http/userAPI";

const toNormalDate = (date) => {
    let year = date.substr(0, 4)
    let month = date.substr(5, 2)
    let day = date.substr(8, 2)

    return day + "." + month + "." + year
}

const UserProfile = observer(() => {
    const {user} = useContext(Context)

    const [userCourses, setUserCourses] = useState([])

    let userPhoto = process.env.REACT_APP_API_URL + user.user.photo

    useEffect(() => {
        console.log(courses())
        setUserCourses(courses())
        console.log(userCourses)
    }, [])

    let courses = async () => {
        let data = await getUserCourses(user.user.id)
        return data
    }

    return (
        <div>
            <Navbar/>
            <div  className={ styles.profile }>
                <label className={ user.user.isActivated ? styles.userIsActivatedInvisible : styles.userIsActivated}>Ваша почта не подтверждена, перейдите по ссылке в письме!</label>
                <div className={ styles.divUserInfo }>
                    <div className={ styles.divPhoto }>
                        <img className={ styles.userPhoto } src={userPhoto}></img>
                    </div>
                    <h1 className={ styles.text }>{user.user.login}</h1>
                    <h1 className={ styles.text }>{toNormalDate(user.user.dateBirth)}</h1>
                </div>
            </div>
        </div>
    );
})

export default UserProfile;