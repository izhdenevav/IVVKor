import React from 'react';
import styles from "../css-modules/home.module.css";
import {observer} from "mobx-react-lite";
import Quote from "../components/Quote";
import Navbar from "../components/Navbar";

const Home = observer(() => {

    return (
        <div>
            <Navbar/>
            <div className={ styles.containerMain }>
                <Quote korean={"세상에서 보고싶은 변화가 있다면 당신 스스로 그 변화가 되어라"} russian={"Стань тем самым изменением, которое хочешь видеть в мире"}></Quote>
            </div>
        </div>
    );
})

export default Home;