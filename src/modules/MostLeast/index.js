import React, { PropTypes } from 'react'
import Radium from 'radium'
import { declare, type } from 'packs'
import Button from '../global/components/Button'
import identify from '../global/services/stringHash'
import ColorScheme from '../global/services/colorScheme'

@Radium
class MostLeast extends React.Component {
  static propTypes = {
    candidate: declare(type.string),
    aspects: declare(type.array),
    instructions_title:declare(type.string),
    instructions_text:declare(type.string),
    most_text:declare(type.string),
    least_text:declare(type.string),
    confirm_text:declare(type.string)
  }

  static defaultProps = {
    candidate: 'candidate_aspect_text',
    aspects: ['one', 'two', 'three', 'four'],
    instructions_title: 'Instructions',
    instructions_text: 'In the following list of aspects of your wellbeing, which aspects which aspect matches',
    most_text: 'the most',
    least_text: 'the least',
    confirm_text: 'Confirm'
  }

  static simulate (props) {
    const { candidate, aspects } = props
    return {
      [`most_${identify(candidate)}_${identify(aspects.join())}`]: identify(_.sample(aspects)),
      [`least_${identify(candidate)}_${identify(aspects.join())}`]: identify(_.sample(aspects))
    }
  }

  constructor (props) {
    super(props)
    this.state = { most: false }
  }

  componentWillMount () {
    console.log('mount')
  }

  choose (aspect) {
    const { candidate, aspects } = this.props
    if (this.state.most) {
      this.props.push({
        [`most_${identify(candidate)}_${identify(aspects.join())}`]: identify(this.state.most),
        [`least_${identify(candidate)}_${identify(aspects.join())}`]: identify(aspect)
      })
    } else {
      this.setState({ most: aspect, selected: null })
    }
  }

  render () { 
    const { candidate, aspects } = this.props
    const { most, selected } = this.state
    return (
      <div>
        <div style={[styles.panel]}>
          <p>
            <span>{this.props.instructions_text}&nbsp;</span>
            <em>{candidate}</em>
            {
              most ?
              <strong>&nbsp;{this.props.least_text}</strong> :
              <strong>&nbsp;{this.props.most_text}</strong>
            }
          </p>
          <ul>
          {
            aspects.map((aspect) => {
              return (
                <li
                  style={[
                    styles.item,
                    {
                      backgroundColor: selected === aspect ?
                      '#77f' :
                      '#fff'
                    }
                  ]}
                  key={aspect}
                  onClick={() => this.setState({ selected: aspect })}
                >
                  {aspect}
                </li>
              )
            })
          }
          </ul>
          <div style={[styles.clearfix]}>
          {
            selected &&
            <Button
              modStyle={{float:'right', marginTop: '1rem'}}
              text={this.props.confirm_text}
              handler={() => ::this.choose(selected)}
            />
          }
          </div>
        </div>
      </div>
    )}
}

const styles = {
  ...require('../global/styles'),
  item: {
    padding: 5,
    cursor: 'pointer'
  },
  clearfix: {
    overflow: 'hidden',
    padding: 5
  }
}

export default MostLeast