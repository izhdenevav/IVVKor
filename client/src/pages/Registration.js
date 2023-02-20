import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {registration} from "../http/userAPI";
import styles from "../css-modules/login.module.css"
import {useInput} from "../hooks/useInput";

const Registration = () => {
    const {user} = useContext(Context)
    const email = useInput('', {isEmpty: true, isEmailWrong: true})
    const password = useInput('', {isEmpty: true, isMinLengthWrong: 8, isMaxLength: 20})
    const login = useInput('', {isEmpty: true, isMinLengthWrong: 3, isMaxLength: 20})

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    const click = async (e) => {
        e.preventDefault()
        try {
            let data = await registration(email, login, password)
            user.setUser(data)
            user.setIsAuth(true)
            navigate('/profile')
        } catch (err) {
            alert(err.message)
        }
    }

    return (
            <form className={ styles.login }>
                <button className={ styles.homeButton } onClick={toHome}>На главную</button>
                <div className={ styles.inputDiv }>
                    {(email.isDirty && email.isEmpty) && <div className={ styles.error }>Поле не может быть пустым</div>}
                    {(email.isDirty && email.isEmailWrong) && <div className={ styles.error }>Некорректный email</div>}
                    <input className={ styles.loginInput } placeholder='Введите email...' value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)}/>
                </div>
                <div>
                    {(login.isDirty && login.isEmpty) && <div className={ styles.error }>Поле не может быть пустым</div>}
                    {(login.isDirty && login.isMinLengthWrong) && <div className={ styles.error }>Некорректная длина</div>}
                    {(login.isDirty && login.isMaxLength) && <div className={ styles.error }>Слишком длинный логин</div>}
                    <input className={ styles.loginInput }  placeholder='Введите логин...' value={login.value} onChange={e => login.onChange(e)} onBlur={e => login.onBlur(e)}/>
                </div>
                <div>
                    {(password.isDirty && password.isEmpty) && <div className={ styles.error }>Поле не может быть пустым</div>}
                    {(password.isDirty && password.isMinLengthWrong) && <div className={ styles.error }>Некорректная длина</div>}
                    {(password.isDirty && password.isMaxLength) && <div className={ styles.error }>Слишком длинный пароль</div>}
                    <input className={ styles.loginInput } placeholder='Введите пароль...' value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)}/>
                </div>
                <div>
                    Есть аккаунт? <NavLink to='/login'>Войти в аккаунт</NavLink>
                </div>
                <button className={ styles.finishButton } onClick={click} type="button">Зарегистрироваться</button>
            </form>
    );
};

export default Registration;