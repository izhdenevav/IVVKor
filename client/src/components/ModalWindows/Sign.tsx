import React, {useContext} from 'react';
import styles from '../../css-modules/signModal.module.css'
import {login, registration} from '../../http/userAPI'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import { Form, Field } from 'react-final-form';
import {ValidationErrors} from "final-form";

type FormValues = {
    email: string;
    login: string;
    password: string;
};

const Sign = observer(({active, setActive, isAuth, setAuth}) => {
    const {user} = useContext(Context)

    const navigate = useNavigate()

    const isValid = (values: FormValues): ValidationErrors => {
        const errors: ValidationErrors = {}

        if (!isAuth) {
            if (!values?.login) {
                errors.login = "Логин не может быть пустым.";
            }
        }

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(values?.email as string)) {
            errors.email = "Неверный формат почты."
        }

        if (!values?.email) {
            errors.email = "Почта не может быть пустой."
        }

        if (!/^([a-z0-9]{6,20})$/.test(values?.password as string)) {
            errors.password = "Пароль должен содержать от 6 до 20 символов и содержать буквы латинского алфавита разного регистра и цифры.";
        }

        if (!values?.password) {
            errors.password = "Пароль не может быть пустым.";
        }

        return errors;
    };

    const changeModals = (e) => {
        e.preventDefault()
        isAuth ? setAuth(false) : setAuth(true)
    }

    const signIn = async(values: FormValues) => {
            if (isAuth) {
                let data = await login(values.email, values.password)
                console.log(data)
                user.setUser(data)
                user.setIsAuth(true)
            } else {
                try {
                    console.log(values)
                    let data = await registration(values.email, values.login, values.password)
                    user.setUser(data)
                    user.setIsAuth(true)
                } catch (err) {
                    alert(err.message)
                }
            }
            navigate("/profile")
    }

    const handleSubmit = (e) => {
        console.log(e)
        signIn(e)
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={isValid}
            render={({handleSubmit}) => (
                <form
                    onSubmit={handleSubmit}
                >
                    <div className={ active ? styles.active : styles.login } onClick={() => setActive(false)} >
                        <div className={ active ? styles.login__contentActive : styles.login__content} onClick={e => e.stopPropagation()}>
                            <div>
                                <Field name="login">
                                    {({input, meta}) => (
                                        <div className={ isAuth ? styles.inputDivHidden : styles.inputDiv}>
                                            <input type="text" className={ styles.inputSign } {...input} placeholder="Введите логин..."/>
                                            {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <Field name="email">
                                    {({input, meta}) => (
                                        <div className={ styles.inputDiv }>
                                            <input className={ styles.inputSign } type="text" {...input} placeholder="Введите электронную почту..."/>
                                            {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <Field name="password">
                                    {({input, meta}) => (
                                        <div className={ styles.inputDiv } >
                                            <input type="text" className={ styles.inputSign } {...input} placeholder="Введите пароль..."/>
                                            {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <label className={ styles.label }>{isAuth ? "Нет аккаунта? " : "Есть аккаунт? "}
                                    <button type="button" className={ styles.changeButton } onClick={changeModals}>{isAuth ? "Зарегистрироваться" : "Войти"}</button>
                                </label>
                            </div>
                            <button className={ styles.signButton } type="submit">{isAuth ? "Войти" : "Зарегистрироваться"}</button>
                        </div>
                    </div>
                </form>
            )}
        />
    );
})

export default Sign;