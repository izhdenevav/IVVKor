import React from 'react';
import styles from "../css-modules/home.module.css";
import {observer} from "mobx-react-lite";
import Navbar from "../components/Navbar";

const Home = observer(() => {

    return (
        <div className={ styles.container }>
            <Navbar/>
        </div>
    );
})

export default Home;