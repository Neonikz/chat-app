import React from 'react'
import { time } from '../helpers/time'

export const OutgoingMessage = ({ msg }) => {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ msg.message }</p>
                <span className="time_date"> { time( msg.createdAt ) }</span>
            </div>
        </div>
    )
}
