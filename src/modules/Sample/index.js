import React from 'react'
import _ from 'lodash'
import { declare, type } from 'packs'
import identify from '../global/services/stringHash'
import ColorScheme from '../global/services/colorScheme'

function choose (n, aspects, bucket) {
  return aspects.length > 0 && _.object(
      _.sample(aspects, n || 3)
      .map((p, i) => [
        [`aspect_${bucket}_${i}`, p],
        [`color_${bucket}_${i}`, ColorScheme.index(i)]
      ])
      .reduce((a, b) => a.concat(b))
    )
}

function sample (props) {
  const {
      push,
      skip_if_true,
      skip_if_false,
      n,
      aspects,
      bucket
    } = props
    // dynamic typing is the devil
    const skip = skip_if_true.reduce((a, b) => a || b, false)
      || skip_if_false.reduce((a, b) => a || !b, false)
    console.log(skip_if_true, skip_if_false)
    if (skip) {
      return null
    } else {
      return choose(n, aspects, bucket)
    }
}

class Sample extends React.Component {
  static propTypes = {
    skip_if_true: declare(type.Array(type.boolean)),
    skip_if_false: declare(type.Array(type.boolean)),
    bucket: declare(type.string),
    n: declare(type.number),
    aspects: declare(type.array)
  }

  static defaultProps = {
    skip_if_true: [false],
    skip_if_false: [true],
    aspects: ['one','two'],
    bucket: 'a',
    n: 1
  }

  static simulate (props) {
    return sample(props)
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    console.log('mount', this.props)
    this.props.push(sample(this.props))
  }

  componentWillReceiveProps (props) {
    console.log('receiving')
    props.push(sample(props))
  }

  render () { return <div></div> }
}

export default Sample