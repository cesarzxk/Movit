import React, { useState } from 'react';
import { createContext, ReactNode } from "react";

type globalContextData ={
    nameProfiler:string;
    setNameProfiler: (nome)=>void;

}

export const GlobalContext = createContext({} as globalContextData);

type globalProviderProps = {
    children: ReactNode;

}

export function GlobalProvider({children}:globalProviderProps){
    const [nameProfiler, setNameProfiler] = useState(null);

return(
    <GlobalContext.Provider value={{
        nameProfiler,
        setNameProfiler,
    }}>
        {children}
    </GlobalContext.Provider>
    )
}