import React, {useContext, useEffect, useState} from "react";
import {Navigate, BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {check, getUserCourses} from "./http/userAPI";
import {observer} from "mobx-react-lite";

import "./App.css"

const App = observer(() => {
    const {user} = useContext(Context)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        })
    }, [])

    return (
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>

    );
})

export default App;
