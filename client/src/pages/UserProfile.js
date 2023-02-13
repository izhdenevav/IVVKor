import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    const {user} = useContext(Context)

    const navigate = useNavigate()

    const signOut = async () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate('/')
        console.log(user)
    }

    return (
        <div>
            <h1>{user._user.login}</h1>
            <h1>{user._user.dateBirth}</h1>
            <button onClick={signOut}>Выйти</button>
        </div>
    );
};

export default UserProfile;