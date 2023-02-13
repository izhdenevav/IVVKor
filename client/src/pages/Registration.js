import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {registration} from "../http/userAPI";

const Registration = () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/')
    }

    const click = async () => {
        let data
        try {
            data = await registration(email, login, password)
            user.setUser(data)
            user.setIsAuth(true)
            navigate('/profile')
        } catch (e) {
            alert(e.response.data.message())
            console.log(e.response.data.message())
        }
    }

    return (
            <form>
                <h2>Регистрация</h2>
                <div>
                    <input placeholder='Введите email...' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input placeholder='Введите логин...' value={login} onChange={e => setLogin(e.target.value)}/>
                </div>
                <div>
                    <input type={"password"} placeholder='Введите пароль...' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    Есть аккаунт? <NavLink to='/login'>Войти в аккаунт</NavLink>
                </div>
                <button onClick={click} type="button">Зарегистрироваться</button>
                <button onClick={toHome}>На главную</button>
            </form>
    );
};

export default Registration;