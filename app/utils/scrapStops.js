import xRay from 'x-ray';
const xray = xRay();

import { map, slice, indexOf } from 'ramda';
import { writeFile } from 'fs';

const getRouteID = (link) => {
    const start = indexOf('r=', link) + 2;
    const end = start + 2;
    return slice(start, end, link);

};
const getDirection = (link) => {
    const start = indexOf('d=', link) + 2;
    const end = start + 1;
    return slice(start, end, link);
};

const getStopID = (link) => {
    const start = indexOf('s=', link) + 2;
    return slice(start, link.length, link);
};

const convertData = map((obj) => {
    return {
        name: obj.name,
        route: getRouteID(obj.link),
        direction: getDirection(obj.link),
        stop: getStopID(obj.link)
    };
});

const routeID = process.argv[2];
const direction = process.argv[3];
console.log(`Getting StopID data for route: ${routeID}, heading in the ${direction} direction`);

xray(`http://www.ltconline.ca/webwatch/MobileAda.aspx?r=${routeID}&d=${direction}`, 'a',
    [{
        name: '@html',
        link: '@href'
    }]
)((err, result) => {
    if (err) throw err;
    // gets rid of the back link, Mobile Live Arrival Times and WebWatch Home
    result = slice(0, result.length - 3, result);

    const toFile = `app/resources/Stops/${routeID}-${direction}.json`;
    writeFile(
        toFile,
        JSON.stringify(convertData(result), null, 4),
        () => {
            console.log(`Done with ${toFile}`);
        }
    );
});
