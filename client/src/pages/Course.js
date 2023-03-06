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

    useEffect(() => {
        findOneCourse(name).then(data => setCourse(data))
    }, [])

/*
    useEffect(() => {
        if (user.user.id) {
            getUserCourses(user.user.id).then(data => {
                for (let userCourse of data) {
                    if (userCourse.name === course.name) {
                        setAdded(true)
                    }
                }
            })
        }
    }, [])*/

    const addCourse = async(e) => {
        e.preventDefault()
        await addUserCourse(user.user.id, course.id)
    }

    return (
        <div>
            <Navbar/>
            <div className={ styles.coursePage }>
                <div>
                    <h1>{course.name}</h1>
                    <img className={ styles.imgCourse } src={process.env.REACT_APP_API_URL + course.image}></img>
                </div>
                <button onClick={ addCourse } className={ user.isAuth ? styles.buttonAdd : styles.buttonAdd__invisible }>Пройти</button>
            </div>
        </div>
    );
})

export default Course;