import _ from 'lodash';

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Mock data for month task bar chart.
// p1, p2, p3 are project names.
export const getRandomizedMonthlyProjectData = (dayCount = 30) => {
    return _.times(dayCount, (i) => {
        const p1 = randomIntFromInterval(1, 5);
        const p2 = randomIntFromInterval(1, p1);
        const p3 = ((p1 + p2) >= 8) ? 0 : randomIntFromInterval(1, (p1 - p2));

        return {
            date: (i + 1),
            p1,
            p2,
            p3,
            total: p1 + p2 + p3,
        };
    });
};
