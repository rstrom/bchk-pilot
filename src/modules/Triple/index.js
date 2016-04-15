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
          color: type.string
        })
      )
    ),
    aspect_pairs: declare(type.array),
    tradeoff_range: declare(type.Array(type.number)),
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
        color: '$color_a_0'
      }, {
        text: '$aspect_a_1',
        rating: '$rating_a_1',
        color: '$color_a_1'
      }, {
        text: '$aspect_a_2',
        rating: '$rating_a_2',
        color: '$color_a_2'
      }
    ],
    aspect_pairs: [
      [0,1],
      [0,2],
      [1,0],
      [1,2],
      [2,0],
      [2,1]
    ],
    tradeoff_range: _.range(1,9),
    should_decrease: false,
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
    text_instruct_conditions: [false, true],
    text_view_examples: 'View Examples Again'
  }

  static simulate (props) {
    const {
      aspects,
      aspect_pairs,
      tradeoff_range,
      index
    } = props
    let { should_decrease } = props

    const gt92 = _.some(aspects, a => a.rating > 92)
    const lt8 = _.some(aspects, a => a.rating < 8)
    if (gt92 && lt8) {
      return aspect_pairs
        .map(([i,j]) => {
          return {
            [`triple_${index}_${String.fromCharCode(65 + i)}`]: identify(aspects[i].text),
            [`triple_${index}_${String.fromCharCode(65 + j)}`]: identify(aspects[j].text),
            [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_1`]: 0,
            [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_2`]: 0,
            [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_flag`]: 'edge',
            [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_t`]: Date.now(),
            [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}`]: 0
          }
        })
        .reduce((a, b) => { return { ...a, ...b }  }, {})
    } else if (gt92) {
      should_decrease = true
    } else if (lt8) {
      should_decrease = false
    }

    const signed_tradeoffs =
      should_decrease ?
        tradeoff_range.map(t => -t) :
        tradeoff_range

    return aspect_pairs
      .map(([i,j]) => {
        return {
          [`triple_${index}_${String.fromCharCode(65 + i)}`]: identify(aspects[i].text),
          [`triple_${index}_${String.fromCharCode(65 + j)}`]: identify(aspects[j].text),
          [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_1`]: _.sample(signed_tradeoffs),
          [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_2`]: _.sample(signed_tradeoffs),
          [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_flag`]: false,
          [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_t`]: Date.now(),
          [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}`]: Math.random() > 0.5 ? 1 : 2
        }
      })
      .reduce((a, b) => { return { ...a, ...b }  }, {})
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const {
      aspects,
      aspect_pairs,
      tradeoff_range,
      text_decreases,
      text_increases,
      push,
      index
    } = this.props

    let { should_decrease } = this.props
    const gt92 = _.some(aspects, a => a.rating > 92)
    const lt8 = _.some(aspects, a => a.rating < 8)
    if (gt92 && lt8) {
      push(
        aspect_pairs
          .map(([i,j]) => {
            return {
              [`triple_${index}_${String.fromCharCode(65 + i)}`]: identify(aspects[i].text),
              [`triple_${index}_${String.fromCharCode(65 + j)}`]: identify(aspects[j].text),
              [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_1`]: 0,
              [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_2`]: 0,
              [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_t`]: Date.now(),
              [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_flag`]: 'edge',
              [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}`]: 0
            }
          })
          .reduce((a, b) => { return { ...a, ...b }  }, {})
      )
    } else if (gt92) {
      should_decrease = true
    } else if (lt8) {
      should_decrease = false
    }

    const signed_tradeoffs =
      should_decrease ?
        tradeoff_range.map(t => -t) :
        tradeoff_range

    const increases_decreases =
      should_decrease ?
        text_decreases :
        text_increases

    this.setState({
      tradeoff: [
        _.sample(signed_tradeoffs),
        _.sample(signed_tradeoffs)
      ],
      prefs: {},
      response: {},
      aspect_pairs,
      signed_tradeoffs,
      increases_decreases,
      flag: false
    })
  }

  choose (option) {
    window.scrollTo(0, 0)

    const {
      signed_tradeoffs,
      tradeoff,
      aspect_pairs,
      flag,
      response
    } = this.state

    const {
      aspects,
      push,
      index
    } = this.props

    const [i, j] = aspect_pairs[0]

    const state = {
      aspect_pairs: aspect_pairs.slice(1),
      tradeoff: [
        _.sample(signed_tradeoffs),
        _.sample(signed_tradeoffs)
      ],
      flag: false,
      response: {
        ...response,
        [`triple_${index}_${String.fromCharCode(65 + i)}`]: identify(aspects[i].text),
        [`triple_${index}_${String.fromCharCode(65 + j)}`]: identify(aspects[j].text),
        [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_1`]: tradeoff[0],
        [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_2`]: tradeoff[1],
        [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_t`]: Date.now(),
        [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}_flag`]: flag,
        [`triple_${index}_${String.fromCharCode(65 + i)}_${String.fromCharCode(65 + j)}`]: option + 1
      }
    }

    if (!state.aspect_pairs.length > 0) {
      push(state.response)
    } else {
      this.setState(state)
      setTimeout(() => this.setState({ animating: false }), 300)
    }

    this.setState({
      animating: true
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
      aspect_pairs,
      animating,
      tradeoff
    } = this.state

    const [i, j] = aspect_pairs[0]

    return (
      <div>
        <div style={[styles.instructions]}>
          <Markdown
            source={text_instruct}
          />
          <Button
            text={text_view_examples}
            handler={() => {
              this.props.reinsert('Preamble', 0)
            }}
          />
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
                opacity: animating ? 0 : `${interpolated.val}`,
                marginLeft: animating ? 0 : (1 - interpolated.val) * -200,
                marginRight: animating ? 0 : (1 - interpolated.val) * 200
              }}
            >
              <div style={[styles.padding(1, 0.5, 0, 0), styles.column]}>
                <Scenario
                  heading={text_option_one}
                  aspects={[
                    {
                      text: aspects[i].text,
                      rating: aspects[i].rating,
                      color: aspects[i].color,
                      change: tradeoff[0],
                      deltaText: this.deltaText.bind(this)(tradeoff[0])
                    }, {
                      text: aspects[j].text,
                      rating: aspects[j].rating,
                      color: aspects[j].color,
                      change: 0,
                      deltaText: this.deltaText.bind(this)(0)
                    }
                  ]}
                  preferText={text_prefer_option}
                  handler={() => ::this.choose(0)}
                />
              </div>
              <div style={[styles.padding(1, 0, 0, 0.5), styles.column]}>
                <Scenario
                  heading={text_option_two}
                  aspects={[
                    {
                      text: aspects[i].text,
                      rating: aspects[i].rating,
                      color: aspects[i].color,
                      change: 0,
                      deltaText: this.deltaText.bind(this)(0)
                    }, {
                      text: aspects[j].text,
                      rating: aspects[j].rating,
                      color: aspects[j].color,
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
              key={i + j}
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
              key={i + j}
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
  }
}

export default App
