import { types } from "../../types/types";

// const initialState = {
//     uid: '',
//     activeChat: null, //UID del user al que yo quiero mandarle msgs
//     users: [],  //Son  los users de la db
//     messages: [], //El chat seleccionado

// }

export const chatReducer = ( state, action ) => {

    switch ( action.type ) {

        case types.usersLoaded:
            return{
                ...state,
                users: [ ...action.payload ]
            }

        case types.activeChat:
            if( state.activeChat === action.payload ) return state;
            return{
                ...state,
                activeChat: action.payload,
                messages:[]
            }

        case types.newMessage:
            if( state.activeChat === action.payload.from ||
                state.activeChat === action.payload.for    
            ){
                return{
                    ...state,
                    messages: [ ...state.messages, action.payload]
                }
            }else{
                return state;
            }

        case types.loadMessages:
            return{
                ...state,
                messages: [ ...action.payload]
            }
        
        case types.dropChatState:
            return{
                uid: '',
                activeChat: null, 
                users: [],  
                messages: [],
            }
            
        default:
            return state;
    }

}