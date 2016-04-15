import _ from 'lodash'
import RandExp from 'randexp'

const string = {
  of (array) {
    if (!_.every(array, (v) => typeof v === 'string')) {
      return new Error('Array includes non-string')
    }

    return {
      validate: (s) => typeof s === 'string'
        && _.includes(array, s),
      simulate: () => _.sample(array)
    }
  }
} 

const number = {
  of (array) {
    if (!_.every(array, (v) => typeof v === 'number')) {
      return new Error('Array includes NaN')
    }

    return {
      validate: (n) => typeof n === 'number'
        && _.includes(array, n),
      simulate: () => _.sample(array)
    }
  }
}

export default {
  string,
  number
}