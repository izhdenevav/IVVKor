import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    );
};

export default AppRouter;