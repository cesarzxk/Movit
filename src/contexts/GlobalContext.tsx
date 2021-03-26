import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { createContext, ReactNode } from "react";
import Cookie from 'js-cookie';

type globalContextData ={
    nameProfiler:string;
    lightState: boolean;
    setNameProfiler: (nome)=>void;
    changelight: (state)=>void;

}

export const GlobalContext = createContext({} as globalContextData);

type globalProviderProps = {
    children: ReactNode;

}

export function GlobalProvider({children}:globalProviderProps){
    const [nameProfiler, setNameProfiler] = useState(null);
    const [lightState, setlightState] = useState(false);


    useEffect(()=>{
        if (lightState){
            document.documentElement.style.setProperty('--white','#333');
            document.documentElement.style.setProperty('--background', '#525355');
            document.documentElement.style.setProperty('--gray-line', '#dcdde0');
            document.documentElement.style.setProperty('--text', '#fff');
            document.documentElement.style.setProperty('--text-hihlight', '#b3b9ff');
            document.documentElement.style.setProperty('--title', '#ccc');
            document.documentElement.style.setProperty('--red','#922235');
            document.documentElement.style.setProperty('--green', '#348b1e');
            document.documentElement.style.setProperty('--blue', '#444b9c');
            document.documentElement.style.setProperty('--blue-dark', '#3251d8');
            document.documentElement.style.setProperty('--blue-twitter', '#2aa9e0');
            Cookie.set('darkMod', 'true');
        }else{
            document.documentElement.style.setProperty('--white','#fff');
            document.documentElement.style.setProperty('--background', '#f2f3f5');
            document.documentElement.style.setProperty('--gray-line', '#dcdde0');
            document.documentElement.style.setProperty('--text', '#666666');
            document.documentElement.style.setProperty('--text-hihlight', '#b3b9ff');
            document.documentElement.style.setProperty('--title', '#2e384d');
            document.documentElement.style.setProperty('--red','#e83f5b');
            document.documentElement.style.setProperty('--green', '#4cD62b');
            document.documentElement.style.setProperty('--blue', '#5965E0');
            document.documentElement.style.setProperty('--blue-dark', '#4965E0');
            document.documentElement.style.setProperty('--blue-twitter', '#2aa9e0');
            Cookie.set('darkMod', 'false');
        }
    },[lightState]);



    function changelight(state){
        setlightState(state);
    }


return(
    <GlobalContext.Provider value={{
        nameProfiler,
        lightState,
        setNameProfiler,
        changelight
    }}>
        {children}
    </GlobalContext.Provider>
    )
}