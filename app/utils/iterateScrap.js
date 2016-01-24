import routes from '../routes.json';
import { slice } from 'ramda';
import { exec } from 'child_process';

import { forEach } from 'ramda';

const getStopIDFromAllRoutes = forEach((route, index) => {
    const routeID = route.ID;
    const [ dir1, dir2] = route.directions;
    /*
    I set a timeout so that network request are separated. I then break up the
    directions part by placing the second request for stops in the other
    direction to the callback of the first.
     */
    setTimeout(() => {
        exec(`npm run scrap -- ${routeID} ${dir1}`, () => {
            console.log(`Finished route ${routeID} with direction ${dir1}`);
            exec(`npm run scrap -- ${routeID} ${dir2}`, () => {
                console.log(`And other direction ${dir2} for route ${routeID}`);
            });
        });
    }, index * 1000);


});
// should run this in increments at the moment as the first time it crashed
// Chrome lol
let x = 0;
getStopIDFromAllRoutes(slice(x, x+5, routes));
x += 5;
setInterval(() => {
    getStopIDFromAllRoutes(slice(x, x+5, routes));
    x += 5;
}, 10000);
