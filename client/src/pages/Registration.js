import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {registration} from "../http/userAPI";
import styles from "../css-modules/login.module.css"

const Registration = () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

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
                <div>
                    <input className={ styles.loginInput } placeholder='Введите email...' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input className={ styles.loginInput }  placeholder='Введите логин...' value={login} onChange={e => setLogin(e.target.value)}/>
                </div>
                <div>
                    <input className={ styles.loginInput }  type={"password"} placeholder='Введите пароль...' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    Есть аккаунт? <NavLink to='/login'>Войти в аккаунт</NavLink>
                </div>
                <button className={ styles.finishButton } onClick={click} type="button">Зарегистрироваться</button>
            </form>
    );
};

export default Registration;