import moment from 'moment';


export const time = ( date ) => {

    const now = moment( date );

    return now.format('HH:mm a | MMMM Do');

}