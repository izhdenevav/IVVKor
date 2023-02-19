import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../http/userAPI";
import {Context} from "../index";
import styles from "../css-modules/login.module.css";
import {useInput} from "../hooks/useInput";

const Login =  () => {
    const {user} = useContext(Context)

    const email = useInput('', {isEmpty: true, isMinLength: 3})
    const password = useInput('', {isEmpty: true, isMinLength: 8})

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    const sighIn = async (e) => {
        e.preventDefault()
        let data = await login(email, password)
        user.setUser(data)
        user.setIsAuth(true)
        navigate('/profile')
    }

    return (
            <form className={ styles.login }>
                <button className={ styles.homeButton } onClick={toHome}>На главную</button>
                <div className={ styles.inputDiv }>
{/*                    {(email.isError && email.isEmpty) && <div className={ styles.error }></div>}
                    {(email.isError && !email.isMinLength) && <div className={ styles.error }>Некорректная длина</div>}*/}
                    {(email.isError && !email.isEmail) && <div className={ styles.error }>Неправильный email</div>}
                    <input className={ styles.loginInput } placeholder='Введите email...' value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}/>
                </div>
                <div className={ styles.inputDiv }>
                    {(password.isError && password.isEmpty) && <div className={ styles.error }>Поле не может быть пустым</div>}
                    {(password.isError && !password.isMinLength) && <div className={ styles.error }>Некорректная длина</div>}
                    <input className={ styles.loginInput } placeholder='Введите пароль...' value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)}/>
                </div>
                <div>
                    Нет аккаунта? <NavLink to='/registration'>Зарегистрируйся!</NavLink>
                </div>
                <button disabled={!email.inputValid || !password.inputValid} onClick={sighIn} className={ styles.finishButton }>Войти</button>
            </form>
    );
};

export default Login;