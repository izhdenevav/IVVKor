import React, {useContext, useState, useHistory} from 'react';
import styles from '../../css-modules/signModal.module.css'
import {login, registration} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const Sign = observer(({active, setActive, isAuth, setAuth}) => {
    const {user} = useContext(Context)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [userLogin, setUserLogin] = useState('')
    const [password, setPassword] = useState('')

    const changeModals = (e) => {
        e.preventDefault()
        isAuth ? setAuth(false) : setAuth(true)
    }

    const sighIn = async () => {
        if (isAuth) {
            let data = await login(email, password)
            user.setUser(data)
            user.setIsAuth(true)
        } else {
            try {
                let data = await registration(email, userLogin, password)
                user.setUser(data)
                user.setIsAuth(true)
            } catch (err) {
                alert(err.message)
            }
        }
        navigate('/profile')
    }

    return (
        <div className={ active ? styles.active : styles.login } onClick={() => setActive(false)}>
            <div className={ active ? styles.login__contentActive : styles.login__content} onClick={e => e.stopPropagation()}>
                <div>
                    <div className={ styles.inputDiv }>
                        <input className={ styles.inputSign } placeholder='Введите email...' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className={ isAuth ? styles.inputDivHidden : styles.inputDiv}>
                        <input className={ styles.inputSign }  placeholder='Введите логин...' value={userLogin} onChange={e => setUserLogin(e.target.value)}/>
                    </div>
                    <div className={ styles.inputDiv  }>
                        <input className={ styles.inputSign } placeholder='Введите пароль...' value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label className={ styles.label }>{isAuth ? "Нет аккаунта? " : "Есть аккаунт? "}
                        <button className={ styles.changeButton } onClick={changeModals}>{isAuth ? "Зарегистрироваться" : "Войти"}</button>
                    </label>
                </div>
                <button onClick={sighIn} className={ styles.signButton }>{isAuth ? "Войти" : "Зарегистрироваться"}</button>
            </div>
        </div>
    );
})

export default Sign;