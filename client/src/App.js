import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {check, getUserCourses} from "./http/userAPI";
import {observer} from "mobx-react-lite";

const App = observer(() => {
        const {user} = useContext(Context)
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
            }).finally(() => setLoading(false))
        }, [])


        return (
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        );
    }

)

export default App;
