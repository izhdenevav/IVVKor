import React from 'react';
import {useNavigate} from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";

const Home = () => {
    const navigate = useNavigate()

    const toRegistrationPage = () => {
        navigate('/registration')
    }

    const toLoginPage = () => {
        navigate('/login')
    }

    const toCourses = () => {
        navigate('/courses')
    }

    return (
        <>
            <form>
                <div>
                    <button onClick={toRegistrationPage}>Регистрация</button>
                    <button onClick={toLoginPage}>Вход</button>
                </div>
                <h1>세상에서 보고싶은 변화가 있다면 당신 스스로 그 변화가 되어라</h1>
                <h1>Стань тем самым изменением, которое хочешь видеть в мире</h1>
                <button onClick={toCourses}>Начать</button>
            </form>
        </>
    );
};

export default Home;