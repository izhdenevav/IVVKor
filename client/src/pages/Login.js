import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../http/userAPI";
import {Context} from "../index";
import styles from "../css-modules/login.module.css";
import {useInput} from "../hooks/useInput";


const Login =  () => {
    const {user} = useContext(Context)

    const email = useInput('', {isEmpty: true, isEmailWrong: true})
    const password = useInput('', {isEmpty: true, isMinLengthWrong: 8, isMaxLength: 20})


    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    const sighIn = async (e) => {
        e.preventDefault()
        let data = await login(email.value, password.value)
        user.setUser(data)
        user.setIsAuth(true)
        navigate('/profile')
    }

    return (
            <form className={ styles.login }>
                <button className={ styles.homeButton } onClick={toHome}>На главную</button>
                <div className={ styles.inputDiv }>
                    {(email.isDirty && email.isEmpty) && <div className={ styles.error }>Поле не может быть пустым</div>}
                    {(email.isDirty && email.isEmailWrong) && <div className={ styles.error }>Некорректный email</div>}
                    <input className={ styles.loginInput } placeholder='Введите email...' value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}/>
                </div>
                <div className={ styles.inputDiv }>
                    {(password.isDirty && password.isEmpty) && <div className={ styles.error }>Поле не может быть пустым</div>}
                    {(password.isDirty && password.isMinLengthWrong) && <div className={ styles.error }>Некорректная длина</div>}
                    {(password.isDirty && password.isMaxLength) && <div className={ styles.error }>Слишком длинный пароль</div>}
                    <input className={ styles.loginInput } placeholder='Введите пароль...' value={ password.value } onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)}/>
                </div>
                <div>
                    Нет аккаунта? <NavLink to='/registration'>Зарегистрируйся!</NavLink>
                </div>
                <button onClick={sighIn} className={ styles.finishButton }>Войти</button>
            </form>
    );
};

export default Login;