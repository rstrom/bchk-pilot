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
    high_point: declare(type.string),
    low_warn: declare(type.number),
    high_warn: declare(type.number),
    warn_text: declare(type.string)
  }

  static defaultProps = {
    instructions: ['first condition true', 'second condition true'],
    instruct_conditions: ['$policy_aspects', true],
    text_go_back: 'Go Back',
    rating_tip: 'Move the slider to set your rating',
    rating_confirm: 'Confirm Rating',
    low_point: 'extremely low',
    high_point: ' extremely high',
    min_point: 'the lowest you can imagine',
    max_point: ' the highest you can imagine',
    low_warn: 8,
    high_warn: 92,
    warn_text: 'Notice that ratings above 75 or below 25 are beyond extreme. Move the slider to set your rating, or confirm your rating if you are satisfied with this rating.',
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
    const {
      low_warn,
      high_warn,
      warn_text
    } = this.props
    const { warning } = this.state
    if (!warning && (aspect.rating >=  high_warn || aspect.rating <=  low_warn)) {
      this.setState({
        warning: warn_text
      })
    } else {
      this.props.push({
        [`rating_${aspect.code}`]: aspect.rating,
        [`rating_${aspect.code}_t`]: Date.now(),
        [`rating_${aspect.code}_confirmed`]: Date.now()
      })
    }
  }

  render () {
    const { rating, warning } = this.state
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

    console.log(aspect.text)
    return (
      <div style={[styles.container]}>
        <div style={[styles.instructions]}>
          <Markdown
            source={
              instructions
                .replace(
                  /\[aspect\]/, aspect.text.replace(/\s+$/, '')
                )
            }
          />
        </div>
        {
          warning && <div style={[
            styles.instructions,
            { backgroundColor: '#ff9' }
          ]}>
            {warning}
          </div>
        }
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
          key={aspect.text}
        />
        <div style={[styles.bottom]}>
          <Button
            align={'start'}
            background={'rgba(255,255,255,0)'}
            text={text_go_back}
            handler={() => {
              history.back()
            }}
          />
        </div>
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
  },
  bottom: {
    ...gstyles.padding(2, 0, 0, 0)
  }
}

export default Index
