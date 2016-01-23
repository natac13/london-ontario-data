[![Build Status](https://travis-ci.org/natac13/london-ontario-data.svg?branch=master)](https://travis-ci.org/natac13/london-ontario-data) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# london-ontario-data


A project that came up as an idea at a local meetup. London Ontario Data Visualizations! Project uses React, Redux, and will use D3 when I learn it.

The meetup was for **functional programming** so this project is going to try and be as functional as it can be. 

### Start the app locally
```
// after cloning 
npm install

// to run the app
npm start
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