import React, {useContext, useMemo, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../http/userAPI";
import {Context} from "../index";
import styles from "../css-modules/login.module.css";

const Login =  () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputValid, setInputValid] = useState(true)

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    const click = async (e) => {
        e.preventDefault()
        let data = await login(email, password)
        user.setUser(data)
        user.setIsAuth(true)
        navigate('/profile')
    }


    return (
            <form className={ styles.login }>
                <button className={ styles.homeButton } onClick={toHome}>На главную</button>
                <input className={ styles.loginInput } placeholder='Введите email...'/>
                <input className={ styles.loginInput } type={"password"} placeholder='Введите пароль...'/>
{/*                <input className={ styles.loginInput } placeholder='Введите email...' value={email} onChange={e => setEmail(e.target.value)}/>
                <input className={ styles.loginInput } type={"password"} placeholder='Введите пароль...' value={password} onChange={e => setPassword(e.target.value)}/>*/}
                <div>
                    Нет аккаунта? <NavLink to='/registration'>Зарегистрируйся!</NavLink>
                </div>
                <button disabled={inputValid} className={ styles.finishButton } onClick={click} type="button">Войти</button>
            </form>
    );
};

export default Login;