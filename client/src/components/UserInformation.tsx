import React, {useContext, useState} from 'react';
import styles from '../css-modules/userInformation.module.css';
import {Context} from "../index";
import {ValidationErrors} from "final-form";
import {Form, Field} from "react-final-form";
import {createCourse} from "../http/courseAPI";
import {updatePassword, updateUserInfo} from "../http/userAPI";

type FormValues = {
    login: string;
    dateBirth: string;
};

const UserInformation = () => {
    const {user} = useContext(Context)

    let userPhoto = process.env.REACT_APP_API_URL + user.user.photo

    const isValid = (values: FormValues): ValidationErrors => {
        const errors: ValidationErrors = {}

        if (!/^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.]\d{4}$/.test(values?.dateBirth as string)) {
            errors.dateBirth = "Дата рождения ДД.ММ.ГГГГ"
        }

        if (!values?.login) {
            errors.login = "Введите логин!"
        }

        if (!values?.dateBirth) {
            errors.dateBirth = "Введите дату рождения!"
        }

        return errors
    }

    const [selectedImage, setSelectedImage] = useState(userPhoto)
    const [photo, setPhoto] = useState(userPhoto)

    const [result, setResult] = useState("")

    const showImage = (e) => {
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
        setPhoto(e.target.files[0])
    }

    const update = async(values: FormValues) => {
        try {
            await updateUserInfo(user.user.email, values.login, values.dateBirth, photo)
            setResult("Успешно")
        } catch (err) {
            setResult(err.message)
        }
    }

    const handleSubmit = (e) => {
        update(e)
    }

    return (
        <Form
            onSubmit={handleSubmit}
            validate={isValid}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div className={ styles.main__container }>
                        <div className={ styles.profile_information__container }>
                            <label className={ styles.text }>Редактировать личную информацию: </label>
                            <div>
                                <div className={ styles.input__container }>
                                    <div>
                                        <Field name="login" initialValue={user.user.login}>
                                            {({input, meta}) => (
                                                <div>
                                                    <input type="text" className={ styles.input } {...input}/>
                                                    {meta.touched && meta.error && <div className={ styles.error }>{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div>
                                        <Field name="dateBirth" initialValue={user.user.dateBirth}>
                                            {({input, meta}) => (
                                                <div>
                                                    <input type="text" className={ styles.input } {...input}/>
                                                    {meta.touched && meta.error && <div className={ styles.error }>{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                </div>
                                <div className={ styles.img__container }>
                                    <img className={ styles.img } src={ selectedImage }/>
                                    <div className={ styles.file__upload }>
                                        <label>Изменить аватарку</label>
                                        <input type="file" onChange={(e) => showImage(e)}/>
                                    </div>
                                </div>
                                <div className={ styles.button__container }>
                                    <button type="submit" className={ styles.button }>Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        />
    );
};

export default UserInformation;