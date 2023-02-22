import React from 'react';
import styles from '../css-modules/viewcourse.module.css';
import {useNavigate} from "react-router-dom";

const ViewCourse = ({course}) => {

    const navigate = useNavigate()

    const selectCourse = () => {
        navigate('/course/' + course.name)
    }

    return (
        <div className={ styles.divCourse }>
            <img className={ styles.courseImg } src={process.env.REACT_APP_API_URL + 'default-course.png'}></img>
            <button onClick={selectCourse} className={ styles.buttonCourse }>
                <label className={ styles.courseName }>{course.name}</label>
            </button>
        </div>
    );
};

export default ViewCourse;