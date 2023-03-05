import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {getAllCourses} from "../http/courseAPI";
import styles from "../css-modules/courses.module.css"
import ViewCourse from "../components/ViewCourse";
import {observer} from "mobx-react-lite";
import Navbar from "../components/Navbar";

const Courses = observer(() => {
    const {course} = useContext(Context)

    useEffect(() => {
        getAllCourses().then(data => course.setCourses(data))
    }, [])

    console.log(course)

    return (
        <div>
            <Navbar/>
            <ul>
                {course.courses.map(course => <ViewCourse key={course.name} course={course}></ViewCourse>)}
            </ul>
        </div>
    );
})

export default Courses;