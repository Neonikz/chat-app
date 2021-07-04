import React from 'react'
import { time } from '../helpers/time'

export const IncomingMessage = ({ msg }) => {

    

    return (
         <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ msg.message }</p>
                    <span className="time_date">{ time( msg.createdAt ) }</span>
                </div>
            </div>
        </div>
    )
}
