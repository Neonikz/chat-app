import React, { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchWhitoutToken, fetchWhitToken } from '../helpers/fetch';
import { types } from '../types/types';

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
    const { dispatch } = useContext( ChatContext );


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

    // Checkea si existe o no el token
    const checkToken = useCallback( async() => {

        const token = localStorage.getItem('token');

        // Si el token no existe
        if ( !token ){
            setAuth({
                checking: false,
                logged: false,
            })
            return false;
        }

        const resp = await fetchWhitToken('login/renew');
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
        }else{
            setAuth({                
                uid: null,
                checking: false,
                logged: false,
            });

            return false;
        }

    }, []);

    //Funcion para deslogear
    const logout = () => {
        localStorage.removeItem('token');
        //Borrar el chatState
        dispatch({ type: types.dropChatState });

        setAuth({                
            uid: null,
            checking: false,
            logged: false,
            name: null,
            email: null,
        })

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
