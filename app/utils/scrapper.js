/*
Leave commented since it will override the current file which I have made
manual changes to. Thanks. Sean Campbell
 */
// import { takeLast, map } from 'ramda';
// import xRay from 'x-ray';
// import { writeFile } from 'fs';
// import { capitalizeEachWord } from '../../js/format';

// const xray = xRay();
// const getRouteID = takeLast(2);
// const convertData = map((obj) => {
//     return {
//         ...obj,
//         name: capitalizeEachWord(obj.name),
//         ID: getRouteID(obj.ID)
//     };
// });

// /*** routeIDs and names */
// xray('http://www.ltconline.ca/webwatch/MobileADA.aspx', 'a',
//     [{
//         ID: '@href',
//         name: '@html'
//     }]
// )((err, result) => {
//     writeFile(
//         'app/resources/routes.json',
//         JSON.stringify(convertData(result), null, 4),
//         () => {
//             console.log('Data saved');
//         });
// });
