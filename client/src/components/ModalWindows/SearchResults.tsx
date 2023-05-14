import React, {useEffect, useState} from 'react';
import {searchUsers} from "../../http/userAPI";
import styles from "../../css-modules/searchResults.module.css";
import {useNavigate} from "react-router-dom";

const SearchResults = ({isActive, setActive, text}) => {
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    const search = async () => {
        const data = await searchUsers(text)
        setUsers(data)
    }

    useEffect(() => {
        search()
    })

    const navigateToUser = (login: string) => {
        navigate('/profile/' + login)
    }

    return (
        <div onClick={() => setActive(false)} className={ isActive ? styles.container__active : styles.container }>
            <div className={ isActive ? styles.menu__contentActive : styles.menu__content }>
                <ul className={ styles.user__ul }>
                    {users.map(user => <div className={ styles.user__container } onClick={() => navigateToUser(user.login)}>
                        <img className={ styles.user__img } src={process.env.REACT_APP_API_URL + user.photo}/>
                        <label className={ styles.user__label }>{user.login}</label>
                    </div>)}
                </ul>
            </div>
        </div>
    );
};

export default SearchResults;