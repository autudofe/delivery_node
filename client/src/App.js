import React, {useContext, useEffect, useState} from 'react';
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import {Navigate, Route, Routes} from "react-router-dom";
import {observer} from 'mobx-react-lite';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import Trucking from "./components/Trucking/Trucking";
import {Context} from "./index";

const App = () => {
    const {authStore} = useContext(Context)
    const {isAuth} = authStore;
    const [user, setUser] = useState(false);

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            authStore.checkAuth();
        }
    }, [])

    /*if (store.isLoading){
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );

    }*/

    return (
        <div>

            {authStore.isLoading?
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            :
            ''}


            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate replace to={isAuth ? "/trucking/profile" : "/login"}/>
                    }
                />

                {isAuth && <Route
                    path="/login"
                    element={
                        <Navigate replace to={"/trucking/profile"}/>
                    }
                />}

                {isAuth && <Route
                    path="/register"
                    element={
                        <Navigate replace to={"/trucking/profile"}/>
                    }
                />}

                {isAuth && <Route
                    path="/forgotPassword"
                    element={
                        <Navigate replace to={"/trucking/profile"}/>
                    }
                />}

                {!isAuth && <Route
                    path="/trucking"
                    element={
                        <Navigate replace to={"/login"}/>
                    }
                />}


                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>

                <Route path="*" element={isAuth ? <Trucking/> : <Login/>}/>

                {/*<Route path="/trucking/:id" element={<CharactersList/>}/>*/}
            </Routes>

        </div>
    );
};

export default observer(App);