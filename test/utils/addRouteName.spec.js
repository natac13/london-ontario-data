import 'babel-polyfill'
import { expect } from 'chai'
import { addRouteName } from '../../app/utils/scrapStops'
console.log(addRouteName);

describe('addRouteName function', () => {
  it('should return an object with a property of routeName with the value from the route.json file', (done) => {
    const state = {
      route: '06'
    }
    const expected = {
      routeName: 'Richmond',
      route: '06'
    }
    const actual = addRouteName(state)
    expect(actual).to.deep.equal(expected)

    done()
  })
})

