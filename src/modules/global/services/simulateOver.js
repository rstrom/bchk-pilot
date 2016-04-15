import http from 'superagent'
import _ from 'lodash'

import load from './lazy'
import echo from './echo'

function assignProps (params, table) {
  return  _(params)
    .map((v, k) => [k, echo(v, table)])
    .object()
    .value()
}

function simulateOver (table, queue, index=0) {
  if (!queue.length) {
    return table
  } else {
    const component = load(queue[0].type)
    component.defaultProps = component.defaultProps ? component.defaultProps : {}
    component.defaultProps = _.assign(component.defaultProps, assignProps(queue[0], table))
    const simulated = component.simulate({ ...component.defaultProps, index })
    return simulateOver({...table, ...simulated}, queue.slice(1), index + 1)
  }
}

export default simulateOver