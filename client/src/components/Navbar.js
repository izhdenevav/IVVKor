import React, {useContext, useState} from 'react';
import styles from '../css-modules/navbar.module.css';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Sign from "./ModalWindows/Sign";
import {useNavigate} from "react-router-dom";
import BurgerMenu from "./ModalWindows/BurgerMenu";

const Navbar = observer(() => {
    const {user} = useContext(Context)

    const [menuActive, setMenuActive] = useState(false)
    const [signActive, setSignActive] = useState(false)
    const [isAuth, setAuth] = useState(true)

    const navigate = useNavigate()

    const toCourses = (e) => {
        e.preventDefault()
        navigate('/courses')
    }

    const toLogin = () => {
        setAuth(true)
        setSignActive(true)
    }

    const toHome = (e) => {
        e.preventDefault()
        navigate('/')
    }

    let userPhoto = process.env.REACT_APP_API_URL + user._user.photo

    return (
        <div className={ styles.container }>
            <label onClick={ toHome } className={ styles.name }>IVVkor</label>
            <button className={ styles.buttonToCourses } onClick={toCourses}>Курсы</button>
            <img onClick={() => setMenuActive(true) } className={ user._isAuth ? styles.userImg : styles.userImgInvisible } src={userPhoto}/>
            <button className={ user._isAuth ? styles.buttonSignInInvisible : styles.buttonSignIn } onClick={toLogin}>Вход</button>
            <BurgerMenu isActive={menuActive} setActive={setMenuActive}/>
            <Sign active={signActive} isAuth={isAuth} setActive={setSignActive} setAuth={setAuth}/>
        </div>
    );
})

export default Navbar;