import { Converter } from 'csvtojson'

const converter = new Converter({
  toArrayString: true
})
console.log(__dirname)
converter.on('end_parsed', function (jsonArray) {
  console.log(jsonArray) // here is your result jsonarray
})
import fs from 'fs'
// read from file
fs.createReadStream('app/resources/routeNames.csv')
  .pipe(converter)
  .pipe(fs.createWriteStream('app/resources/routeNames.json'))
