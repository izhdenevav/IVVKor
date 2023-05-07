import React from 'react';
import styles from '../css-modules/security.module.css';

const Security = () => {
    return (
        <div className={ styles.main__container }>
            <div className={ styles.new_password__div }>
                <label className={ styles.text }>Изменить пароль: </label>
                <input className={ styles.new_password__input } placeholder="Введите новый пароль..."/>
                <input className={ styles.new_password__input } placeholder="Повторите новый пароль..."/>
                <button className={ styles.new_password__button }>Изменить пароль</button>
            </div>
        </div>
    );
};

export default Security;