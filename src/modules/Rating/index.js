import React from 'react'
import Radium from 'radium'
import _ from 'lodash'
import { declare, type } from 'packs'
import Markdown from 'react-remarkable'
import identify from '../global/services/stringHash'
import Rate from './RateAspect'
import Button from '../global/components/Button'

@Radium
class Index extends React.Component {
  static propTypes = {
    aspect: declare(
      type.Object({
        text: type.string,
        color: type.string,
        code: type.string,
        rating: type.number
      })
    ),
    instructions: declare(type.string),
    instruct_conditions: declare(type.Array(type.boolean)),
    text_go_back: declare(type.string),
    rating_tip: declare(type.string),
    rating_confirm: declare(type.string),
    min_point: declare(type.string),
    max_point: declare(type.string),
    low_point: declare(type.string),
    high_point: declare(type.string)
  }

  static defaultProps = {
    instructions: [
    `**Instructions**

Consider **the lives of people in your nation** over the last year. On average, how would you rate the following aspects of **the lives of people in your nation** during the last year? Please use a scale from 0 to 100, where 0 is the least amount of the aspect you could possibly imagine in anyone’s life and 100 is the most you could possibly imagine in anyone’s life. Notice that ratings above 75 or below 25 are beyond extreme.
`,
    `**Instructions**

Consider **your life** over the last year. On average, how would you rate the following aspects of **your life** during the last year? Please use a scale from 0 to 100, where 0 is the least amount of the aspect you could possibly imagine in anyone’s life and 100 is the most you could possibly imagine in anyone’s life. Notice that ratings above 75 or below 25 are beyond extreme.
`
],
    instruct_conditions: ['$policy_aspects', true],
    text_go_back: 'Go Back',
    rating_tip: 'Move the slider to set your rating',
    rating_confirm: 'Confirm Rating',
    low_point: 'extremely low',
    high_point: ' extremely high',
    min_point: 'the least you could possibly imagine',
    max_point: ' the most you could possibly imagine',
    aspect: {
      text: 'aspect text',
      color: '#f77',
      code: 'a_0'
    }
  }

  static simulate (props) {
    const { aspect } = props
    return {
      [`rating_${aspect.code}`]: _.sample(_.range(0,101)),
      [`rating_${aspect.code}_t`]: 0,
      [`rating_${aspect.code}_confirmed`]: 0
    }
  }

  constructor (props) {
    super(props)
    const { rating } = props.aspect

    this.state = {
      rating: !isNaN(rating) && rating || undefined
    }
  }

  confirmRating (aspect) {
    this.props.push({
      [`rating_${aspect.code}`]: aspect.rating,
      [`rating_${aspect.code}_t`]: Date.now(),
      [`rating_${aspect.code}_confirmed`]: Date.now()
    })
  }

  render () {
    const { rating } = this.state
    const {
      aspect,
      text_go_back,
      rating_tip,
      rating_confirm,
      min_point,
      max_point,
      low_point,
      high_point
    } = this.props

    const instructions = this.props.instructions
      .filter((t, i) => this.props.instruct_conditions[i])[0]

    return (
      <div style={[styles.container]}>
        <div style={[styles.instructions]}>
          <Markdown
            source={instructions}
          />
          <Button
            text={text_go_back}
            handler={() => {
              history.back()
            }}
          />
        </div>
        <Rate
          aspect={{
            ...aspect,
            rating
          }}
          handleRating={rating => this.setState({ rating })}
          handleConfirm={::this.confirmRating}
          rateText={rating_tip}
          confirmText={rating_confirm}
          minPoint={min_point}
          maxPoint={max_point}
          lowPoint={low_point}
          highPoint={high_point}
        />
      </div>
    )
  }
}

import gstyles from '../global/styles'
const styles = {
  ...gstyles,
  instructions: {
    ...gstyles.panel,
    ...gstyles.padding(1, 2, 1, 2),
    marginBottom: '2rem'
  },
  container: {
    marginTop: 30,
    userSelect: 'none'
  }
}

export default Index
