import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import AuthStore from "./store/authStore";
import LoadStore from "./store/loadStore";
import TruckStore from "./store/truckStore";
import { SnackbarProvider } from 'notistack';


const authStore = new AuthStore();
const loadStore = new LoadStore();
const truckStore = new TruckStore();

export const Context = createContext({
    authStore,
    loadStore,
    truckStore,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{authStore, loadStore, truckStore}}>
        <BrowserRouter>
            <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
            <App/>
            </SnackbarProvider>
        </BrowserRouter>
    </Context.Provider>

);


