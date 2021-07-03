import React, { createContext, useCallback, useState } from 'react';
import { fetchWhitoutToken } from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
}


export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(initialState);


    //Funcion para logear
    const login = async( email, password ) => {

        const resp = await fetchWhitoutToken('login', { email, password }, 'POST');

        if( resp.ok ){
            localStorage.setItem('token',resp.token);
            const { user } = resp
            setAuth({                
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            })

        }

        return resp.ok;

    }

    //Funcion para registrar
    const register = async ( name, email, password ) => {
        
        const resp = await fetchWhitoutToken('login/new', { name, email, password }, 'POST');
        if( resp.ok ){
            localStorage.setItem('token',resp.token);
            const { user } = resp
            setAuth({                
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            })
            return true;
        }

        return resp.msg;
    }

    const checkToken = useCallback( () => {

    }, []);

    const logout = () => {
        
    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            checkToken,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
