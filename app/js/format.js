import R from 'ramda'
/**
 * capitalize :: String a -> a
 * takes in a string and will return a new string with the first letter upperCased
 * @param  {string} string a string to capitalize
 * @return {string}
 */
export const capitalize = (string) => {
  return R.toUpper(string.slice(0, 1)) + R.toLower(string.slice(1))
}

export const capitalizeEachWord = R.compose(
  R.join(' '),
  R.map(capitalize),
  R.split(' ')
)

export const firstLetter = R.take(1)
