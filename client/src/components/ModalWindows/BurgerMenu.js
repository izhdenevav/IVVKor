import React, {useContext} from 'react';
import styles from '../../css-modules/burgerMenu.module.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

const BurgerMenu = observer(({isActive, setActive}) => {
    const {user} = useContext(Context)

    const cookies = new Cookies()

    let userPhoto = process.env.REACT_APP_API_URL + user._user.photo

    const navigate = useNavigate()

    const signOut = async (e) => {
        e.preventDefault()
        user.setUser({})
        user.setIsAuth(false)
        navigate('/')
    }

    const toProfile = () => {
        navigate('/profile')
    }

    const toRedactProfile = () => {
        navigate('/h')
    }

    return (
        <div onClick={() => setActive(false)} className={ isActive ? styles.active : styles.menu }>
            <div className={ isActive ? styles.menu__contentActive : styles.menu__content } >
                <div className={ styles.divUser }>
                    <label className={ styles.loginUser }>{user._user.login}</label>
                    <img className={ styles.imgUser } src={userPhoto}/>
                </div>
                <div className={ styles.divItem }>
                    <button onClick={ toProfile } className={ styles.buttonItem }>Профиль</button>
                </div>
                <div className={ styles.divItem }>
                    <button onClick={ toRedactProfile } className={ styles.buttonItem }>Настройки</button>
                </div>
                <div className={ styles.divItem }>
                    <button onClick={ signOut } className={ styles.buttonItem }>Выйти</button>
                </div>
            </div>
        </div>
    );
})

export default BurgerMenu;