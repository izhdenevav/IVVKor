import React, {useContext, useState} from 'react';
import styles from '../css-modules/navbar.module.css';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import BurgerMenu from "./ModalWindows/BurgerMenu";
import Sign from "./ModalWindows/Sign";

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

    const toMaterials = (e) => {
        e.preventDefault()
        navigate('/material')
    }

    const toLogin = (e) => {
        e.preventDefault()
        setAuth(true)
        setSignActive(true)
    }

    const toHome = (e) => {
        e.preventDefault()
        navigate('/')
    }

    const toNews = (e) => {
        e.preventDefault()
        navigate('/news')
    }

    let userPhoto = process.env.REACT_APP_API_URL + user.user.photo

    return (
        <div className={ styles.container }>
            <label onClick={ toHome } className={ styles.name }>IVVkor</label>
            <button type="button" className={ styles.buttonToNews } onClick={toNews}>Новости</button>
            <button type="button" className={ styles.buttonToCourses } onClick={toCourses}>Курсы</button>
            <button type="button" className={ styles.buttonToEducMat } onClick={toMaterials}>Учебные материалы</button>
            <div className={ styles.search__div }>
                <input type="text" className={ styles.search__input } placeholder="Введите текст для поиска..."/>
                <button className={ styles.search__button }>🔎</button>
            </div>
            <img onClick={() => setMenuActive(true) } className={ user.isAuth ? styles.userImg : styles.userImgInvisible } src={userPhoto}/>
            <button type="button" className={ user.isAuth ? styles.buttonSignInInvisible : styles.buttonSignIn } onClick={toLogin}>Вход</button>
            <BurgerMenu isActive={menuActive} setActive={setMenuActive}/>
            <Sign active={signActive} isAuth={isAuth} setActive={setSignActive} setAuth={setAuth}/>
        </div>
    );
})

export default Navbar;