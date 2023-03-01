import React, {useContext, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styles from "../css-modules/home.module.css";
import Sign from "../components/ModalWindows/Sign";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Home = observer(() => {
    const {user} = useContext(Context)

    const [modalActive, setModalActive] = useState(false)
    const [isAuth, setAuth] = useState(true)

    const navigate = useNavigate()

    const toCourses = () => {
        navigate('/courses')
    }

    const toLoginPage = (e) => {
        e.preventDefault()
        setAuth(true)
        setModalActive(true)
    }

    const toRegistrationPage = (e) => {
        e.preventDefault()
        setAuth(false)
        setModalActive(true)
    }

    return (
        <form className={ styles.home }>
            <div className={ styles.homeToProfileDiv }>
                <button className={ user._isAuth ? styles.loginButtonsInvisible : styles.loginButtons } onClick={toLoginPage}>Вход</button>
                <button className={ user._isAuth ? styles.loginButtonsInvisible : styles.loginButtons } onClick={toRegistrationPage}>Регистрация</button>
            </div>
            <div>
                <div className={ styles.divQuote }>
                    <h1 className={ styles.homeKoreanWords }>세상에서 보고싶은 변화가 있다면 당신 스스로 그 변화가 되어라</h1>
                    <h2 className={ styles.homeRussianWords }>Стань тем самым изменением, которое хочешь видеть в мире</h2>
                </div>
            </div>
            <button className={ styles.coursesButton } onClick={toCourses}>Я готов к изменениям!</button>
            <Sign active={modalActive} setActive={setModalActive} isAuth={isAuth} setAuth={setAuth}/>
        </form>
    );
})

export default Home;