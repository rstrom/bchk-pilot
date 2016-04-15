import React from 'react'
import Radium from 'radium'
import { declare, type } from 'packs'
import Button from '../global/components/SimpleButton'
import Markdown from 'react-remarkable'
import Format from '../global/services/format'
import Slider from '../global/components/Slider'
import Scenario from '../global/components/Scenario'

const Intro = ({ text }) => (
  <Markdown
    source={text}
  />
)

const Rating = Radium(({ text, instruct, aspects }) => (
  <div>
    <Markdown
      source={text}
    />
    <div style={[styles.screen]}>
      <div style={[styles.panel, styles.padding(1)]}>
        <Markdown
          source={instruct}
        />
      </div>
      <br />
      <br />
      <div style={[styles.panel, styles.padding(1)]}>
        <div style={[styles.heading]}>
          <strong style={{float:'left'}}>
            {Format.capitalize(aspects[0].text)}
          </strong>
          {
            !isNaN(aspects[0].rating) &&
            <span style={{ float:'right', fontWeight: 'bold' }}>
              {Number(aspects[0].rating)}
            </span>
          }
        </div>
        <Slider
          color={aspects[0].color}
          position={aspects[0].rating}
          minPoint={'least you could possibly imagine'}
          maxPoint={'most you could possibly imagine'}
        />
      </div>
    </div>
  </div>
))

const Tradeoff = Radium(({ text, instruct, aspects, tradeoff }) => (
  <div>
    <Markdown
      source={text}
    />
    <div style={[styles.screen]}>
      <div style={[styles.panel, styles.padding(1)]}>
        <Markdown
          source={instruct}
        />
      </div>
      <br />
      <div style={[styles.row]}>
        <div style={[styles.padding(1, 0.5, 0, 0), styles.column]}>
          <Scenario
            heading={'Option 1'}
            aspects={[
              {
                text: aspects[0].text,
                rating: aspects[0].rating,
                color: aspects[0].color,
                change: tradeoff[0],
                deltaText: 'increases'
              }, {
                text: aspects[1].text,
                rating: aspects[1].rating,
                color: aspects[1].color,
                change: 0,
                deltaText: 'does not change'
              }
            ]}
            preferText={'I prefer this option'}
          />
        </div>
        <div style={[styles.padding(1, 0, 0, 0.5), styles.column]}>
          <Scenario
            heading={'Option 2'}
            aspects={[
              {
                text: aspects[0].text,
                rating: aspects[0].rating,
                color: aspects[0].color,
                change: 0,
                deltaText: 'does not change'
              }, {
                text: aspects[1].text,
                rating: aspects[1].rating,
                color: aspects[1].color,
                change: tradeoff[1],
                deltaText: 'increases'
              }
            ]}
            preferText={'I prefer this option'}
          />
        </div>
      </div>
      <div style={[styles.center]}>
        <label>
          <input
            type="checkbox"
          />
          {'This decision does not make sense'}
        </label>
      </div>
    </div>
  </div>
))

const Understand = ({ text }) => (
  <Markdown
    source={text}
  />
)

@Radium
class Consent extends React.Component {
  static propTypes = {
    personal_aspects: declare(type.Array(type.string)),
    policy_aspects: declare(type.Array(type.string)),
    intro_text: declare(type.string),
    personal_rating_text: declare(type.string),
    understand_text: declare(type.string),
    continue: declare(type.string),
    again: declare(type.string)
  }

  static defaultProps = {
    continue: 'Next',
    again: 'View Instructions Again'
  }

  static simulate (props) {
    return null
  }

  constructor (props) {
    super(props)
    this.state = { step: 0 }
  }

  render () {
    const { step } = this.state
    const { personal_aspects, policy_aspects } = this.props
    const personal_tradeoff = Math.random() > .5 ? [4,5] : [5,4]
    const policy_tradeoff = Math.random() > .5 ? [4,5] : [5,4]

    const screens = [
      <Intro text={this.props.intro_text} />,
      <Rating
        text={
          this.props.personal_rating_text
            .replace(/\[aspect1\]/g, Format.capitalize(personal_aspects[0].text))
            .replace(/\[rating1\]/g, personal_aspects[0].rating)
        }
        instruct={this.props.personal_rating_instruct}
        aspects={personal_aspects}
      />,
      <Tradeoff
        text={
          this.props.personal_tradeoff_text
            .replace(/\[aspect1\]/g, Format.capitalize(personal_aspects[0].text))
            .replace(/\[tradeoff1\]/g, personal_tradeoff[0])
            .replace(/\[aspect2\]/g, Format.capitalize(personal_aspects[1].text))
            .replace(/\[tradeoff2\]/g, personal_tradeoff[1])
        }
        instruct={this.props.personal_tradeoff_instruct}
        aspects={personal_aspects}
        tradeoff={personal_tradeoff}
      />,
      <Rating
        text={
          this.props.policy_rating_text
            .replace(/\[aspect1\]/g, Format.capitalize(policy_aspects[0].text))
            .replace(/\[rating1\]/g, policy_aspects[0].rating)
        }
        instruct={this.props.policy_rating_instruct}
        aspects={policy_aspects}
      />,
      <Tradeoff
        text={
          this.props.policy_tradeoff_text
            .replace(/\[aspect1\]/g, Format.capitalize(policy_aspects[0].text))
            .replace(/\[tradeoff1\]/g, policy_tradeoff[0])
            .replace(/\[aspect2\]/g, Format.capitalize(policy_aspects[1].text))
            .replace(/\[tradeoff2\]/g, policy_tradeoff[1])
        }
        instruct={this.props.policy_tradeoff_instruct}
        aspects={policy_aspects}
        tradeoff={policy_tradeoff}
      />,
      <Understand text={this.props.understand_text} />
    ]

    return (
      <div style={[styles.container]}>
        {
          screens[step]
        }
        {
          step === screens.length -1  && (
            <div style={[styles.row, styles.buttons]}>
              <Button
                text={this.props.again}
                handler={() => {
                    this.setState({ step: 0 })
                }}
              />
              <Button
                modStyle={{marginLeft: '1rem' }}
                text={'OK'}
                handler={() => {
                    this.props.push({})
                }}
              />
            </div>
          )
        }
        {
          step + 1 < screens.length &&
          <div style={[styles.row, styles.buttons]}>
            <Button
              text={this.props.continue}
              handler={() => {
                window.scrollTo(0, 0)
                this.setState({ step: step + 1 })
              }}
            />
          </div>
        }
      </div>
    )
  }
}

import gstyles from '../global/styles'
const styles = {
  ...gstyles,
  container: {
    fontSize: '1rem',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: 15,
    boxShadow: '2px 2px 4px #ddd',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 60,
    paddingTop: '1rem',
    paddingRight: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    background: '#fff'
  },
  screen: {
    pointerEvents: 'none',
    background: '#ddd',
    border: '0.25rem solid #000',
    ...gstyles.padding(2),
    ...gstyles.margin(1, 0, 2, 0)
  },
  buttons: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  center: {
    textAlign: 'center'
  },
  circle: {
    cursor: 'pointer'
  }
}

export default Consent
