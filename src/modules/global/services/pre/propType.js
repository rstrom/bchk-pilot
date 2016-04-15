import _ from 'lodash'
import PreType from './type'

const propTypify = (t) => {
  return (props, propName, componenName) => {
    if (!props) {
      return t
    }
    else if (!t.validate(props[propName])) {
      return new Error(`${propName} does not validate.`)
    }
  }
}

export default _(PreType)
  .map((typeInits, typeName) => [
      typeName,
      _(typeInits)
        .map((init, initName) => [
          initName,
          (value) => {
            return propTypify(init(value))
          }
        ])
        .object()
        .value()
    ]
  )
  .object()
  .value()