import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { ChatContext } from './chat/ChatContext';

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, connectSocket, disconnectSocket } = useSocket('http://localhost:8080');
    const { auth } = useContext( AuthContext );
    const { dispatch } = useContext( ChatContext );


    //Si se esta loggeado conectarse al socket
    useEffect(() => {
        if( auth.logged ){
            connectSocket();
        }
    }, [ auth, connectSocket ]);

    //Si se esta deslogeado desconectarse del socket
    useEffect(() => {
        if( !auth.logged ){
            disconnectSocket();
        }
    }, [ auth, disconnectSocket ]);

    //Escuchar los cambios en los usuarios conectados
    useEffect(() => {
        socket?.on( 'user-list', users => {
            dispatch({
                type: types.usersLoaded,
                payload: users
            });
        });
    }, [ socket, dispatch ]);

    //Escuchar mensajes personales
    useEffect(() => {
        socket?.on('personal-message', (message) => {
            
            dispatch({
                type: types.newMessage,
                payload: message
            })

            scrollToBottomAnimated('messages');

        });
    }, [ socket, dispatch ]);


    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}