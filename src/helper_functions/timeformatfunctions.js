import moment from 'moment';

const formatHours = (date) => {
    return moment(date).format('HH:mm');
}

const getDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
}

const hourAndMinuteStringToMinutes = (timeString) => {
    console.log(timeString);
    const hoursAndMinutes = timeString.split(':');
    let totalMinutes = parseInt(hoursAndMinutes[1], 10) || 0;
    if (hoursAndMinutes[0]) {
        totalMinutes += (parseInt(hoursAndMinutes[0], 10) * 60);
    }
    return totalMinutes;
};

const addLeftZero = (number) => {
    return ((number < 10 && number >= 0) ? '0' : '') + number;  
}

const minutesToHoursAndMinutes = (minutes) => {
    var hours = addLeftZero(Math.floor(Math.abs(minutes) / 60));  
    minutes = addLeftZero(Math.abs(minutes) % 60);

    return `${hours}:${minutes}`;
};

const getHoursAndMinutes = (timeString) => {
    const hoursAndMinutes = timeString.split(':');
    const hours = hoursAndMinutes[0];
    const minutes = hoursAndMinutes[1];

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

const sortDatesDescOrder = (dateArray, sortKey) => {
    return dateArray.sort((a, b) => (moment(b[sortKey]) - moment(a[sortKey])));
};

export {
    formatHours,
    getDate,
    hourAndMinuteStringToMinutes,
    minutesToHoursAndMinutes,
    getHoursAndMinutes,
    getDateTime,
    sortDatesDescOrder
};
