import React, { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchWhitToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from '../types/types';

export const SidebarChatItem = ({ user }) => {

    const { name, online } = user;
    const { chatState, dispatch } = useContext( ChatContext );
    const { activeChat } = chatState;

    //Funcion para activar el chat
    const onClick = async() => {
        dispatch({
            type: types.activeChat,
            payload: user.uid
        })

        //Cargar mensajes de la base de datos
        const resp = await fetchWhitToken(`messages/${user.uid}`);

        dispatch({
            type: types.loadMessages,
            payload: resp.messages
        });

        //Scroll de mensajes
        scrollToBottom('messages');
    }

    return (
        <div 
            className={`chat_list ${ (user.uid === activeChat) && 'active_chat' }`}
            onClick={ onClick }
        >
            <div className="chat_people">
                <div className="chat_img"> 
                {/*cambiar imagen por primera letra del nombre  charAt(0) */}
                    <div className="chat_chart">
                        { name.charAt(0) }
                    </div>
                </div>
                <div className="chat_ib">
                    <h5>{ name }</h5>
                    {
                        online
                            ?<span className="text-success">Online</span>
                            :<span className="text-danger">Offline</span>
                    }                    
                </div>
            </div>
        </div>
    )
}
