import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    const [socket, setSocket] = useState(null);
    const [ online, setOnline ] = useState(false);


    //Funcion para conectar el socket
    const connectSocket = useCallback( () => {
        
        const token = localStorage.getItem('token');

        const temporalSocket = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });
        setSocket( temporalSocket );
    },[ serverPath ]);

    //Funcion para desconectar el socket
    const disconnectSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online,
        connectSocket,
        disconnectSocket
    }
}
