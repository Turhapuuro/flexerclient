import moment from 'moment';


export const formatHours = (date) => {
    return moment(date).format('HH:mm');
};

export const formatProjectTotalHours = (time) => {
    return moment.duration(time, 'hours');
};

export const timeToDecimal = (time) => {
    const [hours, minutes] = time.split(':');
    return parseFloat(parseInt(hours, 10) + '.' + parseInt((minutes / 6) * 10, 10));
};

export const getDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
};

export const hourAndMinuteStringToMinutes = (timeString) => {
    const hoursAndMinutes = timeString.split(':');
    let totalMinutes = parseInt(hoursAndMinutes[1], 10) || 0;
    if (hoursAndMinutes[0]) {
        totalMinutes += (parseInt(hoursAndMinutes[0], 10) * 60);
    }
    return totalMinutes;
};

export const addLeftZero = (number) => {
    return ((number < 10 && number >= 0) ? '0' : '') + number;  
};

export const minutesToHoursAndMinutes = (minutes) => {
    var hours = addLeftZero(Math.floor(Math.abs(minutes) / 60));  
    minutes = addLeftZero(Math.abs(minutes) % 60);

    return `${hours}:${minutes}`;
};

export const getHoursAndMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    // const hours = hoursAndMinutes[0];
    // const minutes = hoursAndMinutes[1];

    return { hours, minutes };
}

export const getDateTime = (timeString) => {
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

export const sortDatesDescOrder = (dateArray, sortKey) => {
    return dateArray.sort((a, b) => (moment(b[sortKey]) - moment(a[sortKey])));
};
