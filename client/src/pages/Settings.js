import React, {useContext} from 'react';
import Navbar from "../components/Navbar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import SettingsMenu from "../components/SettingsMenu";
import UserInformation from "../components/UserInformation";
import styles from "../css-modules/settings.module.css"
import Security from "../components/Security";

const Settings = observer(() => {
    const {user} = useContext(Context)

    return (
        <div>
            <Navbar/>
            <div className={ styles.page__container }>
                <SettingsMenu/>
                <Security/>
            </div>
        </div>
    );
})

export default Settings;