import xorshift from 'xorshift'
import md5 from 'md5'
const XorShift = xorshift.constructor

// @param {string} seed
export default (arr, seed) => {
  const hash = md5(seed)
  const seed432 = [
    parseInt(hash.slice(24, 32), 32),
    parseInt(hash.slice(16, 24), 32),
    parseInt(hash.slice(8, 16), 32),
    parseInt(hash.slice(0, 8), 32)
  ]
  const rng = new XorShift(seed432) // seed432 4x32bit array

  // Fisher-Yates h/t mbostock
  var m = arr.length
  var temp
  var i

  while (m) {
    i = Math.floor(rng.random() * m--)

    temp = arr[m]
    arr[m] = arr[i]
    arr[i] = temp
  }

  return arr
}
