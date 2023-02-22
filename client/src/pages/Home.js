import React, {useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styles from "../css-modules/home.module.css";

const Home = () => {
    const navigate = useNavigate()

    const toRegistrationPage = (e) => {
        e.preventDefault()
        navigate('/registration')
    }

    const toLoginPage = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    const toCourses = (e) => {
        e.preventDefault()
        navigate('/courses')
    }

    return (
            <form className={ styles.home }>
                <div className={ styles.homeToProfileDiv }>
                    <button className={ styles.loginButtons } onClick={toLoginPage}>Вход</button>
                    <button className={ styles.loginButtons } onClick={toRegistrationPage}>Регистрация</button>
                </div>
                <div className={ styles.divHome }>
                    <div className={ styles.divQuote }>
                        <h1 className={ styles.homeKoreanWords }>세상에서 보고싶은 변화가 있다면 당신 스스로 그 변화가 되어라</h1>
                        <h2 className={ styles.homeRussianWords }>Стань тем самым изменением, которое хочешь видеть в мире</h2>
                    </div>
                </div>
                <button className={ styles.coursesButton } onClick={toCourses}>Я готов к изменениям!</button>
            </form>
    );
};

export default Home;