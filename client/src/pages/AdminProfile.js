import React, {useContext, useState} from 'react';
import Navbar from "../components/Navbar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import styles from "../css-modules/adminProfile.module.css"
import CreateCourse from "../components/ModalWindows/CreateCourse";

const AdminProfile = observer(() => {
    const {user} = useContext(Context)

    const [isCourseModalActive, setCourseModalActive] = useState(false)

    return (
        <div className={ styles.container }>
            <Navbar/>
            <div className={ styles.page }>
                <label className={ styles.greeting } >Добро пожаловать, администратор {user.user.login}!</label>
                <ul className={ styles.button__container }>
                    <li><button onClick={() => setCourseModalActive(true)} className={ styles.button }>Добавить курс</button></li>
                    <li><button onClick={() => console.log(isCourseModalActive)} className={ styles.button }>Добавить учебные материалы</button></li>
                </ul>
                <CreateCourse isActive={isCourseModalActive} setActive={setCourseModalActive}/>
            </div>
        </div>
    );
})

export default AdminProfile;