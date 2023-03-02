import React, {useContext, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styles from "../css-modules/home.module.css";
import Sign from "../components/ModalWindows/Sign";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Quote from "../components/Quote";
import Navbar from "../components/Navbar";

const Home = observer(() => {
    const {user} = useContext(Context)

    const [modalActive, setModalActive] = useState(false)
    const [isAuth, setAuth] = useState(true)

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
        <div>
            <Navbar setAuth={() => setAuth()} isAuth={isAuth} setModaleActive={() => setModalActive()} modalActive={modalActive}/>
            <div className={ styles.containerMain }>
                <Quote korean={"세상에서 보고싶은 변화가 있다면 당신 스스로 그 변화가 되어라"} russian={"Стань тем самым изменением, которое хочешь видеть в мире"}></Quote>
            </div>
            <div className={ styles.containerSignIn }>
                <button className={ user._isAuth ? styles.buttonSignInInvisible : styles.buttonSignIn } onClick={ toLoginPage }>Вход</button>
                <button className={ user._isAuth ? styles.buttonSignInInvisible : styles.buttonSignIn } onClick={ toRegistrationPage }>Регистрация</button>
            </div>
            <Sign active={modalActive} setActive={setModalActive} isAuth={isAuth} setAuth={setAuth}/>
        </div>
    );
})

export default Home;