import React, {useContext, useState} from 'react';
import styles from '../css-modules/security.module.css';
import {Context} from "../index";
import {deleteAccount, logout, updatePassword} from "../http/userAPI";
import {useNavigate} from "react-router-dom";
import {ValidationErrors} from "final-form";
import { Form, Field } from 'react-final-form';

type FormValues = {
    password: string;
    repeatedPassword: string;
    email: string;
};

const Security = () => {
    const {user} = useContext(Context)

    const [oldPassword, setOldPassword] = useState("")
    const [result, setResult] = useState("")

    const isValid = (values: FormValues): ValidationErrors => {
        const errors: ValidationErrors = {}

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(values?.email as string)) {
            errors.email = "Неверный формат почты."
        }

        if (!values?.email) {
            errors.email = "Почта не может быть пустой."
        }

        if (!/^([a-z0-9]{6,20})$/.test(values?.password as string)) {
            errors.password = "Пароль должен содержать от 6 до 20 символов и содержать буквы латинского алфавита разного регистра и цифры."
        }

        if (!values?.password) {
            errors.password = "Пароль не может быть пустым."
        }

        if (values?.password === oldPassword) {
            errors.password = "Ваш новый пароль совпадает со старым"
        }

        if (values?.repeatedPassword !== values?.password) {
            errors.repeatedPassword = "Вы написали не тот пароль, попробуйте снова"
        }

        return errors
    }

    const update = async(values: FormValues) => {
        try {
                await updatePassword(user.user.email, oldPassword, values.password)
                setResult("Вы успешно сменили пароль!")
                setOldPassword("")
                setResult("")
                values.password = ""
                values.repeatedPassword = ""
        } catch (err) {
            setResult(err.message)
        }
    }

    const navigate = useNavigate()

    const deleteAcc = async() => {
        try {
            await deleteAccount(user.user.email)
            await logout()
            user.user = []
            user.isAuth = false
            navigate('/')
        } catch (err) {
            alert(err.message)
        }
    }

    const handleSubmit = (e) => {
        update(e)
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={isValid}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div className={ styles.new_password__div }>
                        <label className={ styles.text }>Изменить пароль: </label>
                        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={ styles.new_password__input } placeholder="Введите старый пароль..."/>
                        <div>
                            <Field name="password">
                                {({input, meta}) => (
                                    <div>
                                        <input type="password" className={ styles.new_password__input } {...input} placeholder="Введите новый пароль..."/>
                                        {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div>
                            <Field name="repeatedPassword">
                                {({input, meta}) => (
                                    <div>
                                        <input type="password" className={ styles.new_password__input } {...input} placeholder="Повторите новый пароль..."/>
                                        {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <label className={ styles.error }>{result}</label>
                        <button type="submit" className={ styles.new_password__button }>Сохранить</button>
                    </div>
                    <div className={ styles.email__div }>
                        <label className={ styles.email__label }>Изменить почту: </label>
                        <div>
                            <Field name="email" initialValue={user.user.email}>
                                {({input, meta}) => (
                                    <div>
                                        <input type="text" className={ styles.email__input } {...input}/>
                                        {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <button type="button" className={ styles.email__button }>Сохранить</button>
                    </div>
                    <div>
                        <button onClick={deleteAcc} className={ styles.new_password__button }>Удалить профиль</button>
                    </div>
                </form>
            )}
        />
    );
};

export default Security;