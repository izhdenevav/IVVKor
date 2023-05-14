import React, {useContext, useState} from 'react';
import styles from '../css-modules/userSettings.module.css'
import {Context} from "../index";
import {sendCertificate, updateUserInfo} from "../http/userAPI";

const UserSettings = () => {
    const {user} = useContext(Context)

    const [isChecked, setIsChecked] = useState(false);
    const [selectedImage, setSelectedImage] = useState("")
    const [certificate, setCertificate] = useState(null)
    const [result, setResult] = useState("")

    const showImage = (e) => {
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
        setCertificate(e.target.files[0])
    }

    const send = async() => {
        try {
            await sendCertificate(user.user.id, user.user.login, certificate)
            setResult("Успешно отправлено!")
        } catch (err) {
            setResult(err.message)
        }
    }

    return (
        <div className={ styles.main__container }>
            <div className={ styles.role__container}>
                <div className={ styles.checkbox__container }>
                    <label className={ styles.checkbox__label }>Подтвердить уровень знания языка
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
                <button onClick={ send } className={ styles.button }>Отправить</button>
                <label className={ styles.error } value={ result } ></label>
            </div>
        </div>
    );
};

export default UserSettings;