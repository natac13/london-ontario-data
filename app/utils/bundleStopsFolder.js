import routes from '../routes.json';
import { reduce, concat } from 'ramda';
import { writeFile } from 'fs';

// const sample = take(5, routes);

const routeMap = reduce((acc, route) => {
  const routeID = route.ID;
  const [ dir1, dir2 ] = route.directions;
  const bothDirections = concat(
    require(`../Stops/${routeID}-${dir1}.json`),
    require(`../Stops/${routeID}-${dir2}.json`)
  );
  return acc.concat(bothDirections);
}, []);

writeFile(
  'app/resources/allStops.json',
  JSON.stringify(routeMap(routes), null, 4),
  (err) => {
    if (err) throw err;
    console.log('Done putting all stops together');
  }
);