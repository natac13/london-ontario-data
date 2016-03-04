[![Build Status](https://travis-ci.org/natac13/london-ontario-data.svg?branch=master)](https://travis-ci.org/natac13/london-ontario-data) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# london-ontario-data

This is a project to create a better experience for the local transit users. When a person is at a bus stop they see a sign that has the stopID and a few route numbers. This application allows the user to input the stopID and see the routes that are coming to that stop by name. There is a list of route links generated that when navigated, shows the arrival times of the next 3 bus. The app requires scrapping the current site for the data via the `href` of the `<a>` tags on their simple page.


### Start the app locally
```
// after cloning 
npm install

// to run the app
npm start
```
This will start the app on port 3087 and will be wrapped with nodemon so that it will restart whenever one of the server side files changes. The client changes are handled with hot modules reloading via webpack. 

### Demo of Production
Will launch the app in its demo mode. This connects to mongoLab for the db. Still wrapped in nodemon. However webpack is not building this on the fly and therefore a build needs to run first
```
npm run build  

npm run start:demo
```


### Testing 
```
npm test
// or watch
npm run test:watch
```

### Contributing
Please use commitizen for you git commits. I have found this forces me to think about my commits and write meaningful versions.
There is a prompt which will guide you thought the process. Please not the short description (2nd prompt) is cropped at 100 chars, including the scope (1st prompt). Therefore the body of your commit is in the long description (3rd prompt). To close an open issue use `close [issueNumber]` in the closing section (4th prompt).
```
// after staging modifications, instead of running git commit
// please use
npm run commit
```


### Scrapping Stop Data 
I have written a little cli-script using [x-ray](https://github.com/lapwinglabs/x-ray) that will take in the routeID (eg. 06, 23 or 07) and a direction (eg. 1, 2, 3 or 4) to scrap for StopID data. This will then be written to a `.json` file with the signature `[routeID]-[direction].json`

To run the script right now is done manually inputting the routeID and direction.
```
npm run scrap -- [routeID] [direction]
// eg Richmond Northbound
npm run scrap -- 06 2
// eg Dundas Eastbound
npm run scrap -- 02 1
```

I would like to automate this process by grabbing the `route.json` file which includes the routeID and a directions array. Allowing me to iterate this process.

### Deploy to Github pages
```
npm run deploy
```

## Licence

MIT