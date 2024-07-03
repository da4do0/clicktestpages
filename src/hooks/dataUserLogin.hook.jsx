import React, {createContext, useContext, useState} from "react";

const dataUser = createContext();

export const DataUserLogin = ({children})=>{
    const [username, username_set] = useState('');

    const uploadUsername = (name)=>{
        username_set(name);
    }

    return(
        <>
         <dataUser.Provider value={{uploadUsername, username}}>
            {children}
         </dataUser.Provider>
        </>
    )
}

export const useDataUserLogin = () => useContext(dataUser);