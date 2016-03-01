import 'babel-polyfill'
import { expect } from 'chai'
import { addRouteName } from '../../server/controllers/helpers'

import Route from '../../server/models/route'

describe('addRouteName async await function', () => {
  it('should return an object with a property of routeName with the value from the mongoose promise', (done) => {
    const state = {
      route: '06'
    }
    const expected = {
      routeName: 'Richmond',
      route: '06'
    }
    const actual = addRouteName(Route, state)
    console.log(actual)
    expect(actual).to.deep.equal(expected)

    done()
  })
})

