import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {findOneCourse} from "../http/courseAPI";

const Course = () => {

    const [course, setCourse] = useState({info: []})
    const {name} = useParams()

    useEffect(() => {
        findOneCourse(name).then(data => setCourse(data))
    }, [])

    return (
        <div>
            <img src={process.env.REACT_APP_API_URL + course.image}></img>
            <h1>{course.name}</h1>
        </div>
    );
};

export default Course;