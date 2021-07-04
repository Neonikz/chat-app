import React, { useReducer } from 'react';
import { createContext } from "react";
import { chatReducer } from './chatReducer';


export const ChatContext = createContext();

const initialState = {
    uid: '',
    activeChat: null, //UID del user al que yo quiero mandarle msgs
    users: [],  //Son  los users de la db
    messages: [], //El chat seleccionado
}

export const ChatProvider = ({ children }) => {

    const [ chatState , dispatch ] = useReducer( chatReducer, initialState );

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            { children }
        </ChatContext.Provider>
    )
}
