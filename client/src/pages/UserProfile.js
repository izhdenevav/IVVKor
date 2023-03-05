import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import styles from "../css-modules/profile.module.css"
import {observer} from "mobx-react-lite";
import Navbar from "../components/Navbar";
import ViewCourse from "../components/ViewCourse";
import {getUserCourses} from "../http/userAPI";
import CourseStore from "../store/CourseStore";

const toNormalDate = (date) => {
    let year = date.substr(0, 4)
    let month = date.substr(5, 2)
    let day = date.substr(8, 2)

    return day + "." + month + "." + year
}

const UserProfile = observer(() => {
    const {user, userCourses} = useContext(Context)

    useEffect(() => {
        getUserCourses(user._user.id).then(data => userCourses.setCourses(data))
    }, [])

    console.log("fff " + userCourses)

    let userPhoto = process.env.REACT_APP_API_URL + user._user.photo

    return (
        <div>
            <Navbar/>
            <div  className={ styles.profile }>
                <div className={ styles.divUserInfo }>
                    <div className={ styles.divPhoto }>
                        <img className={ styles.userPhoto } src={userPhoto}></img>
                    </div>
                    <h1 className={ styles.text }>{user._user.login}</h1>
                    <h1 className={ styles.text }>{toNormalDate(user._user.dateBirth)}</h1>
                </div>
                <div className={ styles.ulCourses }>
                    <ul>
                        {userCourses.courses.map(userCourse => <ViewCourse key={userCourse.name} course={userCourse}></ViewCourse>)}
                    </ul>
                </div>
            </div>
        </div>
    );
})

export default UserProfile;