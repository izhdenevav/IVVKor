import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {getAllCourses} from "../http/courseAPI";
import styles from "../css-modules/courses.module.css"

const Courses = () => {
    const {course} = useContext(Context)

    useEffect(() => {
        getAllCourses().then(data => course.setCourses(data))
        console.log(getAllCourses())
    }, [])

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    return (
        <form>
            <div>
                <button onClick={toHome}>На главную</button>
            </div>
            <ul className={ styles.coursesUL }>
                {course.courses.map(course => <li key={course.name}>{course.name}</li>)}
            </ul>
        </form>
    );
};

export default Courses;