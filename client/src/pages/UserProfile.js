import React, {useContext} from 'react';
import {Context} from "../index";

const UserProfile = () => {
    const {user} = useContext(Context)

    return (
        <div>
            <h1>{user.login}</h1>
            <button>ВЫЙТИ</button>
        </div>
    );
};

export default UserProfile;