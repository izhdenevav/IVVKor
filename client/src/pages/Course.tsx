import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {findOneCourse} from "../http/courseAPI";
import Navbar from "../components/Navbar";
import {Context} from "../index";
import styles from "../css-modules/coursePage.module.css"
import {observer} from "mobx-react-lite";
import {addUserCourse, getUserCourses} from "../http/userAPI";

const Course = observer(() => {
    const {user, userCourses} = useContext(Context)

    const [course, setCourse] = useState({})
    const [isAdded, setAdded] = useState(false)

    const {name} = useParams()

    console.log(name)

    useEffect(() => {
        getCourse()
    }, [])

    let getCourse = async () => {
        let data = await findOneCourse(name)
        setCourse(data)
    }

    useEffect(() => {
        if (user.user.id) {
            checkIsAdded()
        }
    }, [])

    let checkIsAdded = async () => {
        let data = await getUserCourses(user.user.id)
        for (let userCourse of data) {
            if (userCourse.name === name) {
                setAdded(true)
            }
        }
    }

    const addCourse = async(e) => {
        e.preventDefault()
        await addUserCourse(user.user.id, course.id)
        setAdded(true)
    }

    return (
        <div>
            <Navbar/>
            <div className={ styles.coursePage }>
                <div className={ styles.courseHeader }>
                    <div className={ styles.h1Img }>
                        <h1 className={ styles.name }>{course.name}</h1>
                        <img className={ styles.imgCourse } src={process.env.REACT_APP_API_URL + course.image}></img>
                    </div>
                    <div className={ styles.dcrpBtn }>
                        <div>
                            <label className={ styles.description }>{course.description}</label>
                        </div>
                        <button onClick={ addCourse } className={ user.isAuth && user.user.role !== "ADMIN" && !isAdded ? styles.buttonAdd : styles.buttonAdd__invisible }>Пройти</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Course;