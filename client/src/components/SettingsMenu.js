import React from 'react';
import styles from '../css-modules/settingsMenu.module.css';

const SettingsMenu = () => {
    return (
        <div className={ styles.container }>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>Личная информация</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>Конфиденциальность и безопасность</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
            <div className={ styles.menu__div }>
                <button className={ styles.menu__button }>...</button>
            </div>
        </div>
    );
};

export default SettingsMenu;