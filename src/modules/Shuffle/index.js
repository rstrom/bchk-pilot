import React from 'react'
import _ from 'lodash'
import { declare, type } from 'packs'
import seedShuffle from '../global/services/seedShuffle'
import identify from '../global/services/stringHash'
import ColorScheme from '../global/services/colorScheme'

function choose (n, aspects, bucket, seed) {
  return aspects.length > 0 && _.object(
    seedShuffle(aspects.slice(0, n || 3), seed)
      .map((p, i) => [
        [`text_${bucket}${i}`, p],
        [`color_${bucket}${i}`, ColorScheme.index(i)]
      ])
      .reduce((a, b) => a.concat(b))
    )
}

function sample (props) {
  const {
      skip_if_true,
      skip_if_false,
      n,
      aspects,
      bucket,
      seed
    } = props
    // dynamic typing is the devil
    const skip = skip_if_true.reduce((a, b) => a || b, false)
      || skip_if_false.reduce((a, b) => a || !b, false)
    if (skip) {
      return null
    } else {
      return choose(n, aspects, bucket, seed)
    }
}

class Sample extends React.Component {
  static propTypes = {
    skip_if_true: declare(type.Array(type.boolean)),
    skip_if_false: declare(type.Array(type.boolean)),
    bucket: declare(type.string),
    n: declare(type.number),
    aspects: declare(type.array),
    seed: declare(type.string)
  }

  static defaultProps = {
    skip_if_true: [false],
    skip_if_false: [true],
    aspects: ['one','two'],
    bucket: 'a',
    n: 1,
    seed: '$workerID'
  }

  static simulate (props) {
    return sample(props)
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.instaPush(sample(this.props))
  }

  render () { return <div></div> }
}

export default Sample
