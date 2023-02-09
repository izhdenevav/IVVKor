import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";

const Registration = () => {

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    return (
            <form>
                <h2>Регистрация</h2>
                <div>
                    <input placeholder='Введите email...'/>
                </div>
                <div>
                    <input placeholder='Введите логин...'/>
                </div>
                <div>
                    <input type={"password"} placeholder='Введите пароль...'/>
                </div>
                <div>
                    Есть аккаунт? <NavLink to='/login'>Войти в аккаунт</NavLink>
                </div>
                <button type="button">Зарегистрироваться</button>
                <button onClick={toHome}>На главную</button>
            </form>
    );
};

export default Registration;