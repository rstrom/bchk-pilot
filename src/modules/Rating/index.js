import React from 'react'
import Radium from 'radium'
import _ from 'lodash'
import { declare, type } from 'packs'
import Markdown from 'react-remarkable'
import identify from '../global/services/stringHash'
import store from './store'
import Rate from './RateAspect'
import Rated from './RatedAspects'

@Radium
class Index extends React.Component {
  static propTypes = {
    aspects: declare(
      type.Array(
        type.Object({
          text: type.string,
          color: type.string,
          code: type.string
        })
      )
    ),
    instructions: declare(type.string),
    instruct_conditions: declare(type.Array(type.boolean)),
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
    rating_tip: 'Move the slider to set your rating',
    rating_confirm: 'Confirm Rating',
    low_point: 'extremely low',
    high_point: ' extremely high',
    min_point: 'the least you could possibly imagine',
    max_point: ' the most you could possibly imagine',
    aspects: [{
      text: 'one',
      color: '#f77',
      code: 'a_0'
    }, {
      text: 'two',
      color: '#7f7',
      code: 'a_1'
    }, {
      text: 'three',
      color: '#77f',
      code: 'a_2'
    }]
  }

  static simulate (props) {
    return props.aspects
      .map((a) => {
        return {
          [`rating_${a.code}`]: _.sample(_.range(0,101)),
          [`rating_${a.code}_t`]: 0,
          [`rating_${a.code}_confirmed`]: 0
        }
      })
      .reduce((a, b) => { return { ...a, ...b } }, {})
  }

  constructor (props) {
    super(props)
    this.state = store.getState()
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentDidMount () {
    store.dispatch({
      type: 'SET_ASPECTS',
      aspects: this.props.aspects
        .map((a, i) => {
          return {
            ...a,
            index: i
          }
        })
    })
  }

  componentDidUpdate () {
    if (this.state.index < 0) {
      this.props.push(this.state.response)
    }
  }

  render () {
    const { aspects, rated, index } = this.state
    const {
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
        </div>
        {
          // index === -1 after all aspects rated
          index > -1 &&
          <Rate
            aspect={aspects[index]}
            handleRating={
              (p) => store.dispatch({
                type: 'CHANGE_RATING',
                rating: p
              })
            }
            handleConfirm={
              (a) => store.dispatch({
                type: 'CONFIRM_RATING',
                aspect: a
              })
            }
            rateText={rating_tip}
            confirmText={rating_confirm}
            minPoint={min_point}
            maxPoint={max_point}
            lowPoint={low_point}
            highPoint={high_point}
          />
        }
        {
          // if any aspects are rated
          rated.length &&
          rated.reduce((a, b) => a || b) &&
          <Rated
            aspects={
              aspects
                .filter((a, i) => rated[i])
            }
            editRating={
              (i) => store.dispatch({
                type: 'EDIT_RATING',
                index: i
              })
            }
            editText={'Edit'}
            editInstruct={'If you want to revise your ratings click on the sliders or "Edit" buttons below:'}
          />
        }
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
