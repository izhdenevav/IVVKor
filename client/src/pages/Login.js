import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../http/userAPI";
import {Context} from "../index";

const Login = () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    const click = async () => {
        let data = await login(email, password)
        user.setUser(data)
        user.setIsAuth(true)
        navigate('/profile')
    }

    return (
        <>
            <form>
                <h2>Авторизация</h2>
                <div>
                    <input placeholder='Введите email...' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type={"password"} placeholder='Введите пароль...' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    Нет аккаунта? <NavLink to='/registration'>Зарегистрируйся!</NavLink>
                </div>
                <button onClick={click} type="button">Войти</button>
                <button onClick={toHome}>На главную</button>
            </form>
        </>
    );
};

export default Login;