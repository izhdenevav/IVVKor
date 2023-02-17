import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../http/userAPI";
import {Context} from "../index";
import "../css-modules/Login.css";

const Login =  () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        <>
            <form>
                <div>
                    <div>
                        <input className="loginInput" placeholder='Введите email...' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <input className="loginInput" type={"password"} placeholder='Введите пароль...' value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div>
                    Нет аккаунта? <NavLink to='/registration'>Зарегистрируйся!</NavLink>
                </div>
                <button type="button" onClick={click} type="button">Войти</button>
                <button type="submit"  onClick={toHome}>На главную</button>
            </form>
        </>
    );
};

export default Login;