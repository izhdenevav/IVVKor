import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const RedactProfile = observer(() => {
    const {user} = useContext(Context)

    return (
        <div>

        </div>
    );
})

export default RedactProfile;