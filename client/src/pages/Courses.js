import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {getAllCourses} from "../http/courseAPI";
import styles from "../css-modules/courses.module.css"
import ViewCourse from "../components/ViewCourse";

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
            <ul>
                {course.courses.map(course => <ViewCourse course={course}></ViewCourse>)}
            </ul>
        </form>
    );
};

export default Courses;