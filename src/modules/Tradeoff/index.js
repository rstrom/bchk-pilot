import React from 'react'
import Radium from 'radium'
import _ from 'lodash'
import { Motion, spring, presets } from 'react-motion'
import { declare, type } from 'packs'
import Markdown from 'react-remarkable'
import colorScheme from '../global/services/colorScheme'
import identify from '../global/services/stringHash'
import Scenario from '../global/components/Scenario'
import Button from '../global/components/Button'

@Radium
class App extends React.Component {
  static propTypes = {
    aspects: declare(
      type.Array(
        type.Object({
          text: type.string,
          rating: type.number,
          color: type.string,
          code: type.string
        })
      )
    ),
    triple_code: declare(type.string),
    tradeoff_range_left: declare(type.Array(type.number)),
    tradeoff_range_right: declare(type.Array(type.number)),
    should_decrease: declare(type.boolean),
    texts_deg_pref: declare(type.array),
    text_increases: declare(type.string),
    text_decreases: declare(type.string),
    text_no_change: declare(type.string),
    text_option_one: declare(type.string),
    text_option_two: declare(type.string),
    text_prefer_option: declare(type.string),
    text_instruct: declare(type.string),
    text_instruct_conditions: declare(type.Array(type.boolean)),
    text_view_examples: declare(type.string),
    text_idk: declare(type.string),
    text_why: declare(type.string),
    text_submit: declare(type.string)
  }

  static defaultProps = {
    aspects: [
      {
        text: '$aspect_a_0',
        rating: '$rating_a_0',
        color: '$color_a_0',
        code: 'a_0'
      }, {
        text: '$aspect_a_1',
        rating: '$rating_a_1',
        color: '$color_a_1',
        code: 'a_1'
      }
    ],
    triple_code: '-1',
    tradeoff_range_left: _.range(1,9),
    tradeoff_range_right: _.range(1,9),
    should_decrease: false,
    forced_tradeoff: [false, false],
    texts_deg_pref: [
      'slightly',
      'moderately',
      'strongly',
      'greatly'
    ],
    text_increases: 'increases',
    text_decreases: 'decreases',
    text_no_change: 'does not change',
    text_option_one: 'Option 1',
    text_option_two: 'Option 2',
    text_prefer_option: 'I prefer this option',
    text_idk: 'This decision does not make sense',
    text_why: 'Why?',
    text_submit: 'Submit',
    text_instruct: ['first condition true', 'second condition true'],
    text_instruct_conditions: [true, false],
    text_view_examples: 'View Instructions Again'
  }

  static simulate (props) {
    const {
      aspects,
      tradeoff_range_left,
      tradeoff_range_right,
      triple_code
    } = props
    let { should_decrease } = props

    const gt92 = _.some(aspects, a => a.rating > 92)
    const lt8 = _.some(aspects, a => a.rating < 8)
    if (gt92 && lt8) {
      return {
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_1`]: 0,
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_2`]: 0,
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_flag`]: 'edge',
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_t`]: Date.now(),
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}`]: 0
      }
    } else if (gt92) {
      should_decrease = true
    } else if (lt8) {
      should_decrease = false
    }

    const signed_tradeoffs_left =
      should_decrease ?
        tradeoff_range_left.map(t => -t) :
        tradeoff_range_left

    const signed_tradeoffs_right =
      should_decrease ?
        tradeoff_range_right.map(t => -t) :
        tradeoff_range_right

    const tradeoff = [
      _.sample(signed_tradeoffs_left),
      _.sample(signed_tradeoffs_right)
    ]

    return {
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_1`]: tradeoff[0],
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_2`]: tradeoff[1],
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_flag`]: false,
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_t`]: Date.now(),
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}`]: Math.random() > 0.5 ? 1 : 2
    }
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const {
      aspects,
      tradeoff_range_left,
      tradeoff_range_right,
      text_decreases,
      text_increases,
      triple_code,
      push,
      index
    } = this.props

    let { should_decrease } = this.props
    const gt92 = _.some(aspects, a => a.rating > 92)
    const lt8 = _.some(aspects, a => a.rating < 8)
    if (gt92 && lt8) {
      push({
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_1`]: 0,
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_2`]: 0,
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_flag`]: 'edge',
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_t`]: Date.now(),
        [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}`]: 0
      })
    } else if (gt92) {
      should_decrease = true
    } else if (lt8) {
      should_decrease = false
    }

    const signed_tradeoffs_left =
      should_decrease ?
        tradeoff_range_left.map(t => -t) :
        tradeoff_range_left

    const signed_tradeoffs_right =
      should_decrease ?
        tradeoff_range_right.map(t => -t) :
        tradeoff_range_right

    const increases_decreases =
      should_decrease ?
        text_decreases :
        text_increases

    this.setState({
      tradeoff: [
        _.sample(signed_tradeoffs_left),
        _.sample(signed_tradeoffs_right)
      ],
      increases_decreases,
      flag: false
    })
  }

  choose (option) {
    const { tradeoff, flag } = this.state
    const { aspects, triple_code } = this.props

    const push = this.props.push({
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_1`]: tradeoff[0],
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_2`]: tradeoff[1],
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_flag`]: flag,
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}_t`]: Date.now(),
      [`triple${triple_code}_${aspects[0].code}_${aspects[1].code}`]: option + 1
    })

    this.setState({
      animating: true
    }, () => {
      setTimeout(push, 300)
    })
  }

  deltaText (delta) {
    if (!delta) {
      return this.props.text_no_change
    } else if (delta < 0) {
      return this.props.text_decreases
    } else {
      return this.props.text_increases
    }
  }

  render () {
    const {
      text_view_examples,
      text_idk,
      text_why,
      text_submit,
      text_prefer_option,
      text_option_one,
      text_option_two
    } = this.props

    const text_instruct = this.props.text_instruct
      .filter((t, i) => this.props.text_instruct_conditions[i])[0]

    const aspects = this.props.aspects
      .map(a => {
        return {
          ...a,
          rating: typeof a.rating === 'string' && a.rating.charAt(0) === '!' ?
            Math.round(Math.random() * 100) : a.rating,
          color: typeof a.color === 'string' &&  a.color.charAt(0) === '!' ?
            colorScheme.random() : a.color
        }
      })

    const {
      animating,
      tradeoff
    } = this.state

    return (
      <div>
        <div style={[styles.instructions]}>
          <Markdown
            source={text_instruct}
          />
          {
            // <Button
            //   text={text_view_examples}
            //   handler={() => {
            //     this.props.reinsert('Preamble', 0)
            //   }}
            // />
          }
        </div>
        <Motion
          defaultStyle={{val: 0}}
          style={{val: spring(1, presets.nowobble)}}
        >
        {
          (interpolated) => (
            <div
              style={{
                ...styles.row,
                alignItems: 'stretch',
                opacity: animating ? 0 : `${interpolated.val}`,
                marginLeft: animating ? 0 : (1 - interpolated.val) * -200,
                marginRight: animating ? 0 : (1 - interpolated.val) * 200
              }}
            >
              <div style={[styles.option, styles.padding(1, 0.5, 1, 0)]}>
                <Scenario
                  heading={text_option_one}
                  aspects={[
                    {
                      text: aspects[0].text,
                      rating: aspects[0].rating,
                      color: aspects[0].color,
                      change: tradeoff[0],
                      deltaText: this.deltaText.bind(this)(tradeoff[0])
                    }, {
                      text: aspects[1].text,
                      rating: aspects[1].rating,
                      color: aspects[1].color,
                      change: 0,
                      deltaText: this.deltaText.bind(this)(0)
                    }
                  ]}
                  preferText={text_prefer_option}
                  handler={() => ::this.choose(0)}
                />
              </div>
              <div style={[styles.option, styles.padding(1, 0, 1, 0.5)]}>
                <Scenario
                  heading={text_option_two}
                  aspects={[
                    {
                      text: aspects[0].text,
                      rating: aspects[0].rating,
                      color: aspects[0].color,
                      change: 0,
                      deltaText: this.deltaText.bind(this)(0)
                    }, {
                      text: aspects[1].text,
                      rating: aspects[1].rating,
                      color: aspects[1].color,
                      change: tradeoff[1],
                      deltaText: this.deltaText.bind(this)(tradeoff[1])
                    }
                  ]}
                  preferText={text_prefer_option}
                  handler={() => ::this.choose(1)}
                />
              </div>
            </div>
          )
        }
        </Motion>
        <div style={[styles.center]}>
          <label>
            <input
              type="checkbox"
              defaultValue={this.state.flag}
              onChange={() => {
                this.setState({
                  flag: !this.state.flag
                })
              }}
            />
            {text_idk}
          </label>
        </div>
        {
          this.state.flag &&
          <div style={[styles.center, styles.padding(1)]}>
            <label>
              {text_why}
            </label>
            <input
              type="text"
              style={[styles.margin(0, 0.5, 0, 0.5)]}
              onChange={(e) => {
                this.setState({
                  flag: e.target.value
                })
              }}
            />
            <button
              onClick={() => ::this.choose(99)}
            >
              {text_submit}
            </button>
          </div>
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
    ...gstyles.padding(1, 2, 1, 2)
  },
  center: {
    textAlign: 'center'
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    flexBasis: 0,
    msFlex: '1 0'
  }
}

export default App
