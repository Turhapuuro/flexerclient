import moment from 'moment';

const formatHours = (date) => {
    return moment(date).format('HH:mm');
}

const getDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
}

const getHoursAndMinutes = (timeString) => {
    const hours = parseInt(timeString.substring(0, 2), 10);
    const minutes = parseInt(timeString.substring(3, 5), 10);
    return { hours, minutes };
}

const getDateTime = (timeString) => {
    // Expected timeString format 'hh:mm'
    // Does not handle time in format 1:00 yet.
    const { hours, minutes } = getHoursAndMinutes(timeString);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

export {formatHours, getDate, getHoursAndMinutes, getDateTime};