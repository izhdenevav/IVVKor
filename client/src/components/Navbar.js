import React, {useContext, useState} from 'react';
import styles from '../css-modules/navbar.module.css';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Sign from "./ModalWindows/Sign";
import {useNavigate} from "react-router-dom";
import BurgerMenu from "./ModalWindows/BurgerMenu";

const Navbar = observer(() => {
    const {user} = useContext(Context)

    const [modalActive, setModalActive] = useState(false)

    const navigate = useNavigate()

    const toCourses = (e) => {
        e.preventDefault()
        navigate('/courses')
    }

/*    const toProfile = (e) => {
        e.preventDefault()
        navigate('/profile')
    }*/

    const toHome = (e) => {
        e.preventDefault()
        navigate('/')
    }

    let userPhoto = process.env.REACT_APP_API_URL + user._user.photo

    return (
        <div className={ styles.container }>
            <label onClick={ toHome } className={ styles.name }>IVVkor</label>
            <button className={ styles.buttonToCourses } onClick={toCourses}>Курсы</button>
            <img onClick={() => setModalActive(true) } className={ user._isAuth ? styles.userImg : styles.userImgInvisible } src={userPhoto}/>
            <BurgerMenu isActive={modalActive} setActive={setModalActive}/>
        </div>
    );
})

export default Navbar;