import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    return (
        <>
            <form>
                <h2>Авторизация</h2>
                <div>
                    <input placeholder='Введите email...'/>
                </div>
                <div>
                    <input type={"password"} placeholder='Введите пароль...'/>
                </div>
                <div>
                    Нет аккаунта? <NavLink to='/registration'>Зарегистрируйся!</NavLink>
                </div>
                <button type="button">Войти</button>
                <button onClick={toHome}>На главную</button>
            </form>
        </>
    );
};

export default Login;