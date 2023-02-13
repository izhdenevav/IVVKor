import React, {useContext} from 'react';
import {Context} from "../index";

const Profile = () => {
    const {user} = useContext(Context)

    return (
        <div>
            <h1>LOGIN</h1>
            <button>ВЫЙТИ</button>
        </div>
    );
};

export default Profile;