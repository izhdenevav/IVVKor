import React from 'react';
import {useNavigate} from "react-router-dom";
import '../css-modules/Home.css';

const Home = () => {
    const navigate = useNavigate()

    const toRegistrationPage = () => {
        navigate('/registration')
    }

    const toLoginPage = () => {
        navigate('/login')
    }

    const toCourses = () => {
        alert("ЖОПА")
        //navigate('/courses')
    }

    return (
        <>
            <form>
                <div className="homeToProfileDiv">
                    <button className="loginButtons" onClick={toLoginPage}>Вход</button>
                    <button className="loginButtons" onClick={toRegistrationPage}>Регистрация</button>
                </div>
                <h1 className="homeKoreanWords">세상에서 보고싶은 변화가 있다면 당신 스스로 그 변화가 되어라</h1>
                <h2 className="homeRussianWords">Стань тем самым изменением, которое хочешь видеть в мире</h2>
                <button onClick={toCourses}>Начать</button>
            </form>
        </>
    );
};

export default Home;