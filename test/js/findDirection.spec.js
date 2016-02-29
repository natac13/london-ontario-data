import { Map } from 'immutable'
import { expect } from 'chai'

import findDirection from '../../app/js/findDirection'
import directionMap from '../../app/constants/directionMap'

describe('findDirection Function', () => {
  it('should return the return a function given just the first argument of directionMap', () => {
    const actual = findDirection(directionMap)
    expect(typeof actual).to.equal('function')
  })

  it('should return an object with the direction and arrow as properties when given both directionMap and a number', () => {
    const ltcDirection = '2'
    const actual = findDirection(directionMap, ltcDirection)
    const expected = Map({
      heading: 'N',
      arrow: 'up'
    })
    expect(actual).to.equal(expected)
  })

  it('second test for the above situation with different params', () => {
    const ltcDirection = '1'
    const actual = findDirection(directionMap, ltcDirection)
    const expected = Map({
      heading: 'E',
      arrow: 'right'
    })
    expect(actual).to.equal(expected)
  })

  it('should take in an object with the right structure and still work since it turns the directionMap to an Immutable', () => {
    const ltcDirection = '1'
    const objectDirectionMap = {
      1: {
        direction: 'East',
        arrow: 'right'
      },
      2: {
        direction: 'North',
        arrow: 'up'
      }
    }
    const actual = findDirection(objectDirectionMap, ltcDirection)
    const expected = Map({
      heading: 'E',
      arrow: 'right'
    })
    expect(actual).to.equal(expected)
  })
})

