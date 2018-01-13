import _ from 'lodash';

// const projects = ['p1', 'p2', 'p3'];

const randomIntFromInterval = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Mock data for month task bar chart.
// p1, p2, p3 are projects
const get30Dates = () => {
    return _.times(30, (i) => {
        const p1 = randomIntFromInterval(1, 5);
        console.log(p1);
        const p2 = randomIntFromInterval(1, p1);
        const p3 = ((p1 + p2) >= 8) ? 0 : randomIntFromInterval(1, (p1 - p2));

        return {
            date: (i + 1),
            p1,
            p2,
            p3,
        };
    });
};


export const mockData = get30Dates();
// [
//     { date: '1/01', uv: 4000, pv: 2400, amt: 2400 },
//     { date: '2/01', uv: 3000, pv: 1398, amt: 2210 },
//     { date: '3/01', uv: 2000, pv: 9800, amt: 2290 },
//     { date: '4/01', uv: 2780, pv: 3908, amt: 2000 },
//     { date: '5/01', uv: 1890, pv: 4800, amt: 2181 },
//     { date: '6/01', uv: 2390, pv: 3800, amt: 2500 },
//     { date: '7/01', uv: 3490, pv: 4300, amt: 2100 },
// ];
