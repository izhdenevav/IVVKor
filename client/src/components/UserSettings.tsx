import React, {useContext, useState} from 'react';
import styles from '../css-modules/userSettings.module.css'
import {Context} from "../index";

const UserSettings = () => {
    const {user} = useContext(Context)

    const [isChecked, setIsChecked] = useState(false);
    const [selectedImage, setSelectedImage] = useState("")
    const [photo, setPhoto] = useState(null)

    const showImage = (e) => {
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
        setPhoto(e.target.files[0])
    }

    return (
        <div className={ styles.main__container }>
            <div className={ styles.role__container}>
                <div className={ styles.checkbox__container }>
                    <label className={ styles.checkbox__label }>Вы хотите стать учителем?
                        <input onChange={() => {setIsChecked(!isChecked)}} type="checkbox"/>
                        <svg
                            className={ isChecked ? styles.checkbox__active : styles.checkbox }
                            aria-hidden="true"
                            viewBox="0 0 15 11"
                            fill="none"
                        >
                            <path
                                d="M1 4.5L5 9L14 1"
                                strokeWidth="2"
                                stroke={isChecked ? "#fff" : "none"}
                            />
                        </svg>
                    </label>
                </div>
                <div className={ isChecked ? styles.img__container : styles.img__container__invisible}>
                    <img className={ styles.img } src={ selectedImage }/>
                    <div className={ styles.file__upload }>
                        <label>Выбрать сертификат</label>
                        <input type="file" onChange={(e) => showImage(e)}/>
                    </div>
                </div>
                <button className={ styles.button }>Отправить заявку</button>
            </div>
        </div>
    );
};

export default UserSettings;