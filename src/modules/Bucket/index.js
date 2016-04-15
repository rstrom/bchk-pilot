import React from 'react'
import { declare, type } from 'packs'
import identify
from '../global/services/stringHash'
import ColorScheme from '../global/services/colorScheme'

function create (aspects, bucket) {
  return _.object(aspects
    .map((a, i) => [
      [`aspect_${bucket}_${i}`, `${identify(a)}`],
      [`text_${identify(a)}`, a],
      [`color_${identify(a)}`, ColorScheme.index(i)]
    ])
    .reduce((a, b) => a.concat(b))
    .sort(([k1, v1], [k2, v2]) => k1 > k2 ? 1 : -1)
  )
}

class Bucket extends React.Component {
  static propTypes = {
    aspects: declare(type.array),
    bucket: declare(type.string)
  }

  static defaultProps = {
    aspects: ['one', 'two', 'three'],
    bucket: 'a',
  }

  static simulate ({ aspects, bucket }) {
    return create(aspects, bucket)
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const { push, aspects, bucket } = this.props
    push(create(aspects, bucket))
  }

  render () { return <div></div> }
}

export default Bucket