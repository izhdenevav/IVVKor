import React from 'react';
import {useNavigate} from "react-router-dom";

const Courses = () => {

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    return (
        <div>
            <button onClick={toHome}>На главную</button>
            <h1>Алфавит</h1>
            <h1>Ассимиляция</h1>
        </div>
    );
};

export default Courses;